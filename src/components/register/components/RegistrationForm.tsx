import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox as BaseCheckbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PolicyModal from './PolicyModal';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  agreeToPrivacy?: string;
  submit?: string;
}

type ModalType = 'terms' | 'privacy';

// Remove the custom Checkbox component and use BaseCheckbox directly
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<{ isOpen: boolean; type: ModalType }>({ isOpen: false, type: 'terms' });
  const [showSuccess, setShowSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

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

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  const openModal = (type: ModalType) => {
    setShowModal({ isOpen: true, type });
  };

  const closeModal = () => {
    setShowModal({ isOpen: false, type: 'terms' });
  };

  if (showSuccess) {
    return (
      <div className="mx-auto" style={{ maxWidth: '450px' }}>
        <div className="bg-dark bg-opacity-50 border border-light border-opacity-10 rounded-4 shadow p-4 text-center backdrop-blur">
          <div className="d-flex align-items-center justify-content-center mx-auto mb-4 rounded-circle bg-success-gradient bg-opacity-20" style={{ width: '64px', height: '64px' }}>
            <Icon name="Mail" size={32} className="text-success-light" />
          </div>
          <h2 className="fs-3 fw-semibold text-light mb-2">
            Check Your Email
          </h2>
          <p className="text-light-50 mb-4">
            We've sent a confirmation link to <strong className="text-light">{formData.email}</strong>. 
            Please check your inbox and click the link to activate your account.
          </p>
          <div className="d-grid gap-2">
            <Button variant="primary" fullWidth onClick={() => navigate('/login')}>
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
      <div className="mx-auto" style={{ maxWidth: '450px' }}>
        <div className="bg-dark bg-opacity-50 border border-light border-opacity-10 rounded-4 shadow p-4 backdrop-blur">
          <div className="text-center mb-4">
            <h1 className="fs-3 fw-semibold text-light mb-2">
              Create Your Account
            </h1>
            <p className="text-light-50">
              Join the N0de gaming community today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              required
              labelClassName="text-light"
              className="form-control bg-dark bg-opacity-50 border-light border-opacity-10 text-light"
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
                labelClassName="text-light"
                className="form-control bg-dark bg-opacity-50 border-light border-opacity-10 text-light"
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
              labelClassName="text-light"
              className="form-control bg-dark bg-opacity-50 border-light border-opacity-10 text-light"
            />

            <div className="d-flex flex-column gap-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  required
                />
                <label className="form-check-label text-light" htmlFor="agreeToTerms">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => openModal('terms')}
                    className="btn btn-link text-primary p-0 text-decoration-none align-baseline"
                    style={{ fontSize: 'inherit' }}
                  >
                    Terms of Service
                  </button>
                  <span className="text-danger ms-1">*</span>
                </label>
                {errors.agreeToTerms && (
                  <div className="text-danger fs-7 mt-1">{errors.agreeToTerms}</div>
                )}
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
                  required
                />
                <label className="form-check-label text-light" htmlFor="agreeToPrivacy">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => openModal('privacy')}
                    className="btn btn-link text-primary p-0 text-decoration-none align-baseline"
                    style={{ fontSize: 'inherit' }}
                  >
                    Privacy Policy
                  </button>
                  <span className="text-danger ms-1">*</span>
                </label>
                {errors.agreeToPrivacy && (
                  <div className="text-danger fs-7 mt-1">{errors.agreeToPrivacy}</div>
                )}
              </div>
            </div>

            {errors.submit && (
              <div className="alert alert-danger">
                <p className="mb-0 fs-7">{errors.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              className="btn btn-primary-gradient text-white border-0 rounded-pill d-flex align-items-center justify-content-center py-3"
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>

      <PolicyModal
        isOpen={showModal.isOpen}
        type={showModal.type}
        onClose={closeModal}
      />
    </>
  );
};

export default RegistrationForm;