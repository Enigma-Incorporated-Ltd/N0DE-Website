import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

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
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful password reset request
      setIsSubmitted(true);
      
    } catch (error) {
      setErrors({
        general: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (in real app, show notification)
      console.log('Password reset email sent again');
      
    } catch (error) {
      setErrors({
        general: 'Failed to resend email. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Success state after email submission
  if (isSubmitted) {
    return (
      <div className="w-100 mx-auto" style={{ maxWidth: '28rem' }}>
        <div className="bg-dark-gradient rounded-5 p-6 p-sm-8" data-cue="fadeIn">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
              <Icon name="Mail" size={28} className="text-success" />
            </div>
            <h1 className="h3 fw-semibold text-light mb-2">
              Check Your Email
            </h1>
            <p className="text-light text-opacity-75">
              We've sent a password reset link to <span className="text-light fw-medium">{formData.email}</span>
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-dark rounded-4 p-4 mb-6">
            <h3 className="h5 text-light mb-3">Next Steps:</h3>
            <ul className="text-light text-opacity-75 mb-0 ps-3">
              <li className="mb-2">Check your inbox for an email from N0de</li>
              <li className="mb-2">Click the reset link in the email</li>
              <li className="mb-2">Create your new password</li>
              <li>Sign in with your new password</li>
            </ul>
          </div>

          {/* Resend Button */}
          <div className="d-grid mb-6">
            <Button
              type="button"
              variant="outline"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              onClick={handleResendEmail}
              className="btn-outline-light text-light border-light border-opacity-10 rounded-pill py-3 hover:bg-primary-gradient hover:border-0 d-flex align-items-center justify-content-center"
            >
              {isLoading ? 'Resending...' : 'Resend Email'}
            </Button>
          </div>

          {/* Additional Help */}
          <div className="text-center">
            <p className="text-light text-opacity-75 mb-4">
              Didn't receive the email? Check your spam folder or{' '}
              <Link
                to="/support-center"
                className="text-gradient-primary text-decoration-none fw-medium"
              >
                contact support
              </Link>
            </p>
          </div>

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

        {/* Divider */}
        <div className="position-relative my-6">
          <hr className="border-light border-opacity-10" />
          <span className="position-absolute top-50 start-50 translate-middle bg-dark px-4 text-light text-opacity-75 small">
            Or
          </span>
        </div>

        {/* Alternative Actions */}
        <div className="d-grid gap-3 mb-6">
          <Button
            variant="outline"
            fullWidth
            iconName="HelpCircle"
            iconPosition="left"
            disabled={isLoading}
            className="btn-outline-light text-light border-light border-opacity-10 rounded-pill py-3 hover:bg-primary-gradient hover:border-0 d-flex align-items-center justify-content-center"
            asChild
          >
            <Link to="/support-center">
              Contact Support
            </Link>
          </Button>
        </div>

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