import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AccountService from '../../../services/Account';

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState<'request' | 'verify' | 'success'>('request');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyError, setVerifyError] = useState('');

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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const response = await AccountService.forgotPassword(formData.email, AccountService.applicationId);
      if (response.status === 'Success') {
        setStep('verify');
      } else {
        setErrors({ general: response.status || 'Failed to send reset email.' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setVerifyError('');
    if (newPassword.length < 6) {
      setVerifyError('Password must be at least 6 characters.');
      setIsLoading(false);
      return;
    }
    try {
      const verifyRes = await AccountService.verifyCode(code);
      if (verifyRes.status === 'Success') {
        const updateRes = await AccountService.forgotPasswordUpdate(code, newPassword);
        if (updateRes.status === 'Success') {
          setStep('success');
          setTimeout(() => navigate('/login'), 2500);
        } else {
          setVerifyError(updateRes.status || 'Failed to update password.');
        }
      } else {
        setVerifyError(verifyRes.status || 'Invalid verification code.');
      }
    } catch (error) {
      setVerifyError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Success state after email submission
  if (step === 'verify') {
    return (
      <div className="w-100 mx-auto" style={{ maxWidth: '28rem' }}>
        <div className="bg-dark-gradient rounded-5 p-6 p-sm-8" data-cue="fadeIn">
          <div className="text-center mb-8">
            <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
              <Icon name="Key" size={28} color="white" />
            </div>
            <h1 className="h3 fw-semibold text-light mb-2">Reset Password</h1>
            <p className="text-light text-opacity-75">Enter the code sent to your email and your new password.</p>
          </div>
          <form onSubmit={handleVerifyAndReset}>
            {verifyError && (
              <div className="alert alert-danger bg-danger bg-opacity-10 border-danger text-danger d-flex align-items-center mb-4" role="alert">
                <Icon name="AlertCircle" size={20} className="text-danger me-2 flex-shrink-0" />
                <small>{verifyError}</small>
              </div>
            )}
            <Input
              label="Verification Code"
              type="text"
              name="code"
              placeholder="Enter the code from your email"
              value={code}
              onChange={e => setCode(e.target.value)}
              required
              disabled={isLoading}
              className="bg-dark border-light border-opacity-10 text-light mb-4"
              labelClassName="text-light"
            />
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
              className="bg-dark border-light border-opacity-10 text-light mb-4"
              labelClassName="text-light"
            />
            <div className="d-grid mb-6">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
                className="btn-primary-gradient text-white fs-14 border-0 rounded-pill py-3 d-flex align-items-center justify-content-center"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="w-100 mx-auto" style={{ maxWidth: '28rem' }}>
        <div className="bg-dark-gradient rounded-5 p-6 p-sm-8" data-cue="fadeIn">
          <div className="text-center mb-8">
            <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
              <Icon name="CheckCircle" size={28} className="text-success" />
            </div>
            <h1 className="h3 fw-semibold text-light mb-2">Password Reset Successful</h1>
            <p className="text-light text-opacity-75">Your password has been updated. Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="w-100 mx-auto" style={{ maxWidth: '28rem' }}>
      <div className="bg-dark-gradient rounded-5 p-6 p-sm-8" data-cue="fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
            <Icon name="Key" size={28} color="white" />
          </div>
          <h1 className="h3 fw-semibold text-light mb-2">
            Forgot Password?
          </h1>
          <p className="text-light text-opacity-75">
            Enter your email address and we'll send you a link to reset your password
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
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            disabled={isLoading}
            className="bg-dark border-light border-opacity-10 text-light mb-6"
            labelClassName="text-light"
          />

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
              {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </Button>
          </div>
        </form>

        {/* Back to Login */}
        <div className="text-center pt-4 border-top border-light border-opacity-10">
          <p className="text-light text-opacity-75 mb-0">
            Remember your password?{' '}
            <Link
              to="/login"
              className="text-gradient-primary text-decoration-none fw-medium"
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 