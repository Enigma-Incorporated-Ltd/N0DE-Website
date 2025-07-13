import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PolicyModal from './PolicyModal';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState({ isOpen: false, type: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check for duplicate email (mock validation)
      if (formData.email === 'test@example.com') {
        setErrors({ email: 'An account with this email already exists' });
        setIsLoading(false);
        return;
      }
      
      setShowSuccess(true);
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (type) => {
    setShowModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setShowModal({ isOpen: false, type: '' });
  };

  if (showSuccess) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-subtle p-8 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Mail" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Check Your Email
          </h2>
          <p className="text-muted-foreground mb-6">
            We've sent a confirmation link to <strong>{formData.email}</strong>. 
            Please check your inbox and click the link to activate your account.
          </p>
          <div className="space-y-3">
            <Button variant="default" fullWidth onClick={() => navigate('/login')}>
              Go to Sign In
            </Button>
            <Button variant="ghost" fullWidth onClick={() => setShowSuccess(false)}>
              Try Different Email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card border border-border rounded-lg shadow-subtle p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-foreground mb-2">
              Create Your Account
            </h1>
            <p className="text-muted-foreground">
              Join thousands of users managing their subscriptions with ease
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
            />

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                required
              />
              <PasswordStrengthIndicator password={formData.password} />
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
            />

            <div className="space-y-4">
              <Checkbox
                label={
                  <span className="text-sm">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => openModal('terms')}
                      className="text-primary hover:underline font-medium"
                    >
                      Terms of Service
                    </button>
                  </span>
                }
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                error={errors.agreeToTerms}
                required
              />

              <Checkbox
                label={
                  <span className="text-sm">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => openModal('privacy')}
                      className="text-primary hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                  </span>
                }
                checked={formData.agreeToPrivacy}
                onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                error={errors.agreeToPrivacy}
                required
              />
            </div>

            {errors.submit && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <p className="text-error text-sm">{errors.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Secured with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>

      <PolicyModal
        isOpen={showModal.isOpen}
        onClose={closeModal}
        type={showModal.type}
      />
    </>
  );
};

export default RegistrationForm;