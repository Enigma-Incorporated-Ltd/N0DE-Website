import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PolicyModal from './PolicyModal';
import AccountService from '../../../services/Account';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agreeToPrivacy: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState<{ isOpen: boolean; type: ModalType }>({ isOpen: false, type: 'terms' });
  const [successModal, setSuccessModal] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password.length < 6) {
      newErrors.confirmPassword = 'Password must be at least 6 characters';
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
    setErrors({});
    try {
      // Call backend registration API
      const response = await AccountService.register({
        email: formData.email,
        password: formData.password,
        applicationid: AccountService.applicationId,
        firstname: formData.firstName,
        lastname: formData.lastName
      });
      if (response.status === 'Success') {
        setSuccessModal(true);
      } else if (response.status === 'User Already Exists') {
        setErrors({ email: 'An account with this email already exists' });
      } else {
        setErrors({ submit: response.status || 'Registration failed. Please try again.' });
      }
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

  const handleSuccessModalClose = () => {
    setSuccessModal(false);
    navigate('/login');
  };



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
            <div className="row g-3">
              <div className="col-md-6">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={errors.firstName}
                  required
                  labelClassName="text-light"
                  className="form-control bg-dark bg-opacity-50 border-light border-opacity-10 text-light"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={errors.lastName}
                  required
                  labelClassName="text-light"
                  className="form-control bg-dark bg-opacity-50 border-light border-opacity-10 text-light"
                />
              </div>
            </div>

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

      {/* Success Modal */}
      {successModal && (
        <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center" style={{ 
          zIndex: 1050,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="bg-dark-gradient border border-light border-opacity-20 rounded-4 shadow-lg w-100 mh-80 d-flex flex-column" style={{ 
            maxWidth: '32rem',
            background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          }}>
            <div className="d-flex align-items-center justify-content-center p-4 border-bottom border-light border-opacity-20" style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
            }}>
              <div className="d-flex align-items-center">
                <div className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <h2 className="fs-5 fw-semibold text-light mb-0">Account Created Successfully!</h2>
              </div>
            </div>
            <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
              <div className="text-center">
                <div className="bg-success bg-opacity-10 border border-success border-opacity-20 rounded-3 p-4 mb-3">
                  <Icon name="CheckCircle" size={32} className="text-success mb-3" />
                  <p className="text-success fw-medium mb-0">Your account has been created successfully!</p>
                  <p className="text-light-50 mt-2 mb-0">You can now log in with your email and password.</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-top border-light border-opacity-20 d-flex justify-content-center" style={{
              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
            }}>
              <Button variant="primary" onClick={handleSuccessModalClose} className="btn btn-primary-gradient text-white border-0 rounded-pill px-5">
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;