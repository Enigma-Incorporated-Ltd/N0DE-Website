import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { AccountService } from '../../../services';
import { NodeService } from '../../../services/Node';
import { AuthContext } from '../../../context/AuthContext';
import Captcha from '../../ui/Captcha';
import MicrosoftLoginButton from './MicrosoftLoginButton';

interface FormData {
  email: string;
  password: string;
  captchaAnswer: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
  captchaAnswer?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Add this
  const { planId, billingCycle, selectedPlan } = location.state || {};
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    captchaAnswer: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login: contextLogin, updateUserData } = useContext(AuthContext);
  //const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const isEmailNotVerified = !!errors.general && (
    errors.general.toLowerCase().includes('not verified') ||
    errors.general.toLowerCase().includes('verify your email') ||
    errors.general.toLowerCase().includes('verification')
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (resendStatus) {
      setResendStatus(null);
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleResendVerification = async () => {
    if (!formData.email) {
      setErrors(prev => ({
        ...prev,
        email: 'Please enter your email address to resend verification.'
      }));
      return;
    }

    setIsResending(true);
    setResendStatus(null);

    try {
      const response = await AccountService.resendVerification(formData.email.trim());
      if (
        response &&
        (response.status === 'Success' ||
          response.success === true ||
          (typeof response.status === 'string' && response.status.toLowerCase().includes('success')) ||
          (response.status !== 'Failed' && response.success !== false))
      ) {
        // Clear red error so only green success alert is displayed
        setErrors(prev => {
          const { general, ...rest } = prev;
          return rest;
        });
        setResendStatus({
          type: 'success',
          message: response.message || 'Verification email sent successfully. Please check your inbox.'
        });
      } else {
        setResendStatus({
          type: 'error',
          message: response.message || response.status || 'Failed to resend verification email.'
        });
      }
    } catch (err: any) {
      setResendStatus({
        type: 'error',
        message: err?.message || 'Failed to resend verification email. Please try again.'
      });
    } finally {
      setIsResending(false);
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if(!isCaptchaValid) {
      newErrors.captchaAnswer = 'Please solve the security check correctly.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostLoginNavigation = (userId: string, planId: any, dbplanId: number, normalizedPlanStatus: string | undefined, selectedPlan: any, billingCycle: any, response: any) => {
    if (!response) {
      if (planId) {
        navigate('/checkout', { state: { userId, planId, selectedPlan, billingCycle } });
      } else {
        navigate('/plan-selection', { state: { userId } });
      }
      return;
    }
    if (!planId && dbplanId && normalizedPlanStatus === 'active') {
      navigate('/user-dashboard', { state: { userId, planId: dbplanId } });
    } else if (!planId && dbplanId && normalizedPlanStatus !== 'active') {
      navigate('/plan-selection', { state: { userId } });
    } else if (!planId && !dbplanId) {
      navigate('/plan-selection', { state: { userId } });
    } else if (planId === dbplanId && normalizedPlanStatus === 'active') {
      navigate('/user-dashboard', { state: { userId, planId: dbplanId } });
    } else if (planId === dbplanId && normalizedPlanStatus === 'cancelled') {
      navigate('/checkout', { state: { userId, planId, selectedPlan, billingCycle } });
    } else if (planId !== dbplanId) {
      navigate('/checkout', { state: { userId, planId, selectedPlan, billingCycle } });
    } else {
      navigate('/plan-selection', { state: { userId } });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setResendStatus(null);

    try {
      const result = await AccountService.login({
        email: formData.email,
        password: formData.password
      });

      let userId = result.user?.id || (result.success && (result as any).userid) || null;
      if (userId && !result.user) {
        result.user = { id: userId, email: (result as any).email };
      }

      if (result.success && userId) {
        // Store full user data in React state (no localStorage)
        updateUserData({
          id: userId,
          email: result.user?.email || formData.email,
          token: result.token || '',
          refreshToken: result.refreshToken || '',
          isRootUser: result.isRootUser || false,
        });
        contextLogin(userId);

        // Check admin
        let isAdmin = false;
        try { isAdmin = await NodeService.getIsAdmin(userId); } catch { /* ignore */ }
        if (isAdmin) {
          navigate('/admin/user-management', { state: { userId } });
          return;
        }

        // Get plan details
        let response = null;
        try { 
          response = await NodeService.getUserPlanDetails(userId);
          console.log('✅ User plan response:', response);
        } catch (error) { 
          console.error('❌ Failed to get user plan:', error);
        }

        // Confirm payment with backend before proceeding to other APIs
        const planSubscriptionId = response?.subscriptionId || response?.userplan?.subscriptionId;
        const planUserProfileId = response?.userProfileId || response?.userplan?.userProfileId;
        if (planSubscriptionId && planUserProfileId) {
          try {
            await NodeService.confirmPayment(planSubscriptionId, planUserProfileId, userId);
          } catch (confirmError) {
            console.error('❌ Failed to confirm payment on login:', confirmError);
          }
        }

        const selectedPlan = location.state?.selectedPlan;
        const billingCycle = location.state?.billingCycle;
        const planId = location.state?.planId;
        
        // Handle both direct planId and nested userplan.planId
        const dbplanId = parseInt(String(response?.planId || response?.userplan?.planId || '0'), 10);
        const normalizedPlanStatus = (response?.planStatus || response?.userplan?.planStatus || '').toLowerCase();
        
        console.log('🔍 Navigation params:', {
          planId: planId,
          dbplanId: dbplanId,
          planStatus: normalizedPlanStatus,
          hasResponse: !!response,
          responseKeys: response ? Object.keys(response) : []
        });

        handlePostLoginNavigation(userId, planId, dbplanId, normalizedPlanStatus, selectedPlan, billingCycle, response);
        return;
      }

      // Handle login with no user data
      if (result.success && !result.user) {
        setErrors({ general: 'Login succeeded but user data is missing. Please contact support.' });
      } else {
        setErrors({ general: result.message || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="w-100 mx-auto" style={{ maxWidth: '28rem' }}>
      <div className="bg-dark-gradient rounded-5 p-6 p-sm-8" data-cue="fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
            <Icon name="LogIn" size={28} color="white" />
          </div>
          <h1 className="h3 fw-semibold text-light mb-2">
            Welcome Back
          </h1>
          <p className="text-light text-opacity-75 mb-0">Loadout synced — Resume your campaign.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* General Error */}
          {errors.general && (
            <div 
              className="alert alert-danger  text-white d-flex align-items-center mb-4" 
              role="alert"
              style={{ 
                backgroundColor: 'rgba(244, 2, 2, 0.45)', 
                borderColor:  'rgb(249, 246, 246)' 
              }}
            >
              <Icon name="AlertCircle" size={20} className="text-white me-2 flex-shrink-0" />
              <small>{errors.general}</small>
            </div>
          )}

          {/* Resend Status Alert */}
          {resendStatus && (
            <div 
              className={`alert text-white d-flex align-items-center mb-4 ${resendStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`}
              role="alert"
              style={{ 
                backgroundColor: resendStatus.type === 'success' ? 'rgba(25, 135, 84, 0.45)' : 'rgba(244, 2, 2, 0.45)', 
                borderColor: resendStatus.type === 'success' ? 'rgb(40, 167, 69)' : 'rgb(249, 246, 246)' 
              }}
            >
              <Icon 
                name={resendStatus.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                size={20} 
                className="text-white me-2 flex-shrink-0" 
              />
              <small>{resendStatus.message}</small>
            </div>
          )}

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            disabled={isLoading}
            className="bg-dark border-light border-opacity-10 text-light mb-4"
            labelClassName="text-light"
          />
       
        

        {/* Password Input */}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            disabled={isLoading}
            className="bg-dark border-light border-opacity-10 text-light mb-4"
            labelClassName="text-light"
          />
         {/* Captcha Input */}
          <div className="mb-4">
          <Captcha
          value={formData.captchaAnswer}
          onChange={(value) => setFormData(prev => ({ ...prev, captchaAnswer: value }))}
          onValidationChange={setIsCaptchaValid}
          error={errors.captchaAnswer}
          disabled={isLoading}
          label="Security Check"/>
          </div>
          {/* Action Links: Resend Verification (on left when not verified error) & Forgot Password (on right) */}
          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              {isEmailNotVerified && (
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResending || isLoading}
                  className="text-light text-opacity-75 text-decoration-none hover:text-primary transition-colors fs-14 bg-transparent border-0 p-0 d-inline-flex align-items-center"
                  style={{ font: 'inherit', fontSize: '14px' }}
                >
                  {isResending ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                      Resending...
                    </>
                  ) : (
                    'Resend Email Verification'
                  )}
                </button>
              )}
            </div>
            <div className="text-end ms-auto">
              <Link
                to="/forgot-password" state={{ planId, billingCycle, selectedPlan }}
                className="text-light text-opacity-75 text-decoration-none hover:text-primary transition-colors fs-14"
                style={{ fontSize: '14px' }}
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid mb-6">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              className="btn-primary-gradient text-white fs-14 border-0 rounded-pill py-3 d-flex align-items-center justify-content-center"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
        </form>

        {/* Divider */}
        <div className="position-relative my-6">
          <hr className="border-light border-opacity-10" />
          <span
            className="position-absolute top-50 start-50 translate-middle bg-dark-gradient px-3 text-light text-opacity-75 small"
            style={{ backgroundColor: '#1a1d29' }}
          >
            Or continue with
          </span>
        </div>

        {/* Microsoft Login Button */}
        <div className="mb-6">
          <MicrosoftLoginButton
            onSuccess={contextLogin}
            onError={(error) => setErrors({ general: error })}
            disabled={isLoading}
          />
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-top border-light border-opacity-10">
          <p className="text-light text-opacity-75 mb-0">
            Don't have an account?{' '}
            <Link
              to="/register" state={{ planId, billingCycle, selectedPlan }}
              className="text-gradient-primary text-decoration-none fw-medium"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
