import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for testing
  const mockCredentials = {
    user: { email: 'user@subscriptionflow.com', password: 'user123' },
    admin: { email: 'admin@subscriptionflow.com', password: 'admin123' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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

  const handleSubmit = async (e) => {
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
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="LogIn" size={24} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your SubscriptionFlow account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Error */}
          {errors.general && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{errors.general}</p>
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
          <div className="text-right">
            <Link
              to="/register"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Options */}
        <div className="space-y-3">
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
        <div className="text-center mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-primary hover:text-primary/80 font-medium transition-smooth"
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