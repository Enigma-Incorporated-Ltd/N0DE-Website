import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    user: { email: 'user@subscriptionflow.com', password: 'user123' },
    admin: { email: 'admin@subscriptionflow.com', password: 'admin123' }
  };

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const isValidUser = formData.email === mockCredentials.user.email && 
                         formData.password === mockCredentials.user.password;
      const isValidAdmin = formData.email === mockCredentials.admin.email && 
                          formData.password === mockCredentials.admin.password;
      
      if (isValidUser) {
        // Redirect to user dashboard
        navigate('/user-dashboard');
      } else if (isValidAdmin) {
        // Redirect to admin dashboard
        navigate('/admin-dashboard');
      } else {
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
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
      <div className="card shadow-lg border-0">
        <div className="card-body p-4 p-sm-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="bg-primary rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '3rem', height: '3rem' }}>
              <Icon name="LogIn" size={24} color="white" />
            </div>
            <h1 className="h3 fw-semibold text-dark mb-2">
              Welcome Back
            </h1>
            <p className="text-muted">
              Sign in to your SubscriptionFlow account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* General Error */}
            {errors.general && (
              <div className="alert alert-danger d-flex align-items-center mb-3" role="alert">
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
            />

            {/* Forgot Password Link */}
            <div className="text-end mb-4">
              <Link
                to="/register"
                className="text-primary text-decoration-none small"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <div className="d-grid mb-4">
              <Button
                type="submit"
                variant="default"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>
          </form>

          {/* Divider */}
          <div className="position-relative my-4">
            <hr className="border-secondary" />
            <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
              Or continue with
            </span>
          </div>

          {/* Social Login Options */}
          <div className="d-grid gap-2 mb-4">
            <Button
              variant="outline"
              fullWidth
              iconName="Mail"
              iconPosition="left"
              disabled={isLoading}
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Github"
              iconPosition="left"
              disabled={isLoading}
            >
              Continue with GitHub
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-3 border-top">
            <p className="small text-muted mb-0">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary text-decoration-none fw-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;