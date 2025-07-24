import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { AccountService, type LoginCredentials } from '../../../services';
import { NodeService } from '../../../services/Node';
import { AuthContext } from '../../../context/AuthContext';

interface FormData {
  email: string;
  password: string;
}

interface UserPlan {
  planId: string;
  planStatus: string
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Add this
  const { planId } = location.state || {};
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login: contextLogin } = useContext(AuthContext);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await AccountService.login({
        email: formData.email,
        password: formData.password
      });

      //console.log('Login API result:', result); // Debugging

      // Normalize user object for navigation logic
      let userId = null;
      if (result.success && result.user && result.user.id) {
        userId = result.user.id;
      } else if (result.success && !result.user && (result as any).userid) {
        userId = (result as any).userid;
        result.user = {
          id: userId,
          email: (result as any).email
        };
      }
      // If login succeeded and we have a userId, update context and storage
      if (result.success && userId) {
        AccountService.storeAuthData(userId);
        contextLogin(userId); // Update AuthContext state
        const selectedPlan = location.state?.selectedPlan;
        const billingCycle = location.state?.billingCycle;
        // Defensive: Always treat as not admin if endpoint fails
        let isAdmin = false;
        try {
          isAdmin = await NodeService.getIsAdmin(userId);
        } catch (e) {
          isAdmin = false;
        }
        if (isAdmin) {
          navigate('/admin/user-management', {
            state: { userId }
          });
          return;
        }
        // Defensive: Always treat as no plan if endpoint fails
        let response = null;
        try {
          response = await NodeService.getUserPlanDetails(userId);
        } catch (e) {
          response = null;
        }
        // if no response, then user has no plan in database, so we need to redirect to plan selection
        if (!response) {
          // If coming from landing page after selecting plan, redirect to checkout
          if (planId) {
            navigate('/checkout', {
              state: {
                userId,
                planId,
                selectedPlan,
                billingCycle
              }
            });
            return;
          }
          // Otherwise, go to plan selection
          navigate('/plan-selection', {
            state: { userId }
          });
          return;
        }
        // Only retrieve after setting
        const dbplanId = parseInt(String(response.planId || '0'), 10);
        const normalizedPlanStatus = response.planStatus?.toLowerCase();
        // Defensive: Always check for valid navigation, even if planId is missing
        if (!planId && dbplanId && normalizedPlanStatus === 'active') {
          // ✅ Rule: No planId in location, DB has active plan
          navigate('/user-dashboard', {
            state: { userId, planId: dbplanId }
          });
        } else if (!planId && dbplanId && normalizedPlanStatus === 'cancelled') {
          // ✅ Rule: No planId in location, DB has cancelled plan
          navigate('/checkout', {
            state: { userId, planId, selectedPlan, billingCycle }
          });
        } else if (!planId && !dbplanId) {
          // ✅ Rule: No planId in location and no plan in DB
          navigate('/plan-selection', {
            state: { userId }
          });
        } else if (planId === dbplanId && normalizedPlanStatus === 'active') {
          // ✅ Rule: Matching planId and active
          navigate('/user-dashboard', {
            state: { userId, planId: dbplanId }
          });
        } else if (planId === dbplanId && normalizedPlanStatus === 'cancelled') {
          // ✅ Rule: Matching planId but cancelled
          navigate('/checkout', {
            state: { userId, planId, selectedPlan, billingCycle }
          });
        } else if (planId !== dbplanId) {
          // ✅ Rule: Different planId (change of plan)
          navigate('/checkout', {
            state: { userId, planId, selectedPlan, billingCycle }
          });
        } else {
          // Fallback: Always go to plan selection if logic fails
          navigate('/plan-selection', {
            state: { userId }
          });
        }
        return;
      }
      // If login succeeded but no user data, show error
      else if (result.success && !result.user) {
        setErrors({ general: 'Login succeeded but user data is missing. Please contact support.' });
      } else {
        setErrors({ general: result.message || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({
        general: 'Something went wrong. Please try again later.'
      });
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
          <p className="text-light text-opacity-75">
            Sign in to your N0de account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* General Error */}
          {errors.general && (
            <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger d-flex align-items-center mb-4" role="alert">
              <Icon name="AlertCircle" size={20} className="text-danger me-2 flex-shrink-0" />
              <small>{errors.general}</small>
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

          {/* Forgot Password Link */}
          <div className="text-end mb-6">
            <Link
              to="/forgot-password"
              className="text-light text-opacity-75 text-decoration-none hover:text-primary transition-colors small"
            >
              Forgot your password?
            </Link>
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

        {/* Sign Up Link */}
        <div className="text-center pt-4 border-top border-light border-opacity-10">
          <p className="text-light text-opacity-75 mb-0">
            Don't have an account?{' '}
            <Link
              to="/register"
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