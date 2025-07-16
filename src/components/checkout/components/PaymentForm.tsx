import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface FormData {
  fullName: string;
  email: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  clientSecret: string | null;
  isCreatingPaymentIntent: boolean;
  onCreatePaymentIntent: (customerData: FormData) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, isLoading, clientSecret, isCreatingPaymentIntent, onCreatePaymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState<Partial<FormData & { card: string }>>({});
  const [cardError, setCardError] = useState<string | null>(null);

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'in', label: 'India' },
    { value: 'jp', label: 'Japan' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    // Remove card validation since we're using Stripe Elements
    // Card validation is handled by Stripe

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setCardError(null);
      
      try {
        // Process the payment directly since payment intent is already created
        if (!stripe || !elements || !clientSecret) {
          setCardError('Payment system is not ready. Please wait a moment and try again.');
          return;
        }
        
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
          setCardError('Card information is required');
          return;
        }

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
            },
          },
        });

        if (error) {
          setCardError(error.message || 'Payment failed. Please try again.');
        } else if (paymentIntent.status === 'succeeded') {
          onSubmit(formData);
          setTimeout(() => {
            navigate('/payment-confirmation');
          }, 1000);
        }
      } catch (error) {
        console.error('Payment error:', error);
        setCardError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Billing Information */}
      <div className="mb-5">
        <h3 className="text-light fw-medium mb-4">Billing Information</h3>
        
        <div className="mb-3">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={errors.fullName}
            required
          />
        </div>

        <div className="mb-3">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
        </div>

        <div className="mb-3">
          <Select
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            value={formData.country}
            onChange={(value) => handleInputChange('country', String(value))}
            error={errors.country}
            required
          />
        </div>

        <div className="mb-3">
          <Input
            label="Address"
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={errors.address}
            required
          />
        </div>

        <div className="row g-3">
          <div className="col-6">
            <Input
              label="City"
              type="text"
              placeholder="Enter your city"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              error={errors.city}
              required
            />
          </div>
          <div className="col-6">
            <Input
              label="State"
              type="text"
              placeholder="Enter your state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              error={errors.state}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <Input
            label="ZIP Code"
            type="text"
            placeholder="Enter your ZIP code"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            error={errors.zipCode}
            required
          />
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-5">
        <div className="d-flex align-items-center mb-4">
          <h3 className="text-light fw-medium me-2">Payment Information</h3>
          <div className="d-flex align-items-center">
            <Icon name="Shield" size={16} className="text-success me-1" />
            <span className="text-success fw-medium small">Secure</span>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label text-light">Card Details</label>
          <div className="bg-dark border border-light border-opacity-10 rounded-3 p-3">
            <div className="mb-3">
              <label className="form-label text-light small mb-2">Card Number</label>
              <div className="bg-dark border border-light border-opacity-10 rounded p-2">
                <CardNumberElement 
                  options={{ 
                    style: { 
                      base: { 
                        fontSize: '16px',
                        color: '#ffffff',
                        backgroundColor: 'transparent',
                        '::placeholder': {
                          color: '#6c757d'
                        }
                      } 
                    } 
                  }} 
                />
              </div>
            </div>
            
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label text-light small mb-2">Expiry Date</label>
                <div className="bg-dark border border-light border-opacity-10 rounded p-2">
                  <CardExpiryElement 
                    options={{ 
                      style: { 
                        base: { 
                          fontSize: '16px',
                          color: '#ffffff',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#6c757d'
                          }
                        } 
                      } 
                    }} 
                  />
                </div>
              </div>
              
              <div className="col-6">
                <label className="form-label text-light small mb-2">CVC</label>
                <div className="bg-dark border border-light border-opacity-10 rounded p-2">
                  <CardCvcElement 
                    options={{ 
                      style: { 
                        base: { 
                          fontSize: '16px',
                          color: '#ffffff',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#6c757d'
                          }
                        } 
                      } 
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
          {cardError && <div className="text-danger mt-2 small">{cardError}</div>}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-dark border border-light border-opacity-10 rounded-4 p-4 mb-5">
        <div className="d-flex align-items-start">
          <Icon name="Lock" size={20} className="text-primary me-3 flex-shrink-0" />
          <div>
            <p className="text-light fw-medium mb-1">Your payment is secure</p>
            <p className="text-light text-opacity-75 small mb-0">
              We use industry-standard encryption to protect your payment information. 
              Your card details are processed securely by Stripe and never stored on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading || isCreatingPaymentIntent}
        iconName="CreditCard"
        iconPosition="left"
        className="mb-4 d-flex align-items-center justify-content-center"
        disabled={!clientSecret || isCreatingPaymentIntent}
      >
        {isCreatingPaymentIntent ? 'Initializing Payment...' : isLoading ? 'Processing Payment...' : 'Complete Purchase'}
      </Button>

      {/* Payment Methods */}
      <div className="text-center pt-3">
        <p className="text-light text-opacity-75 small mb-2">We accept</p>
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="d-flex align-items-center">
            <Icon name="CreditCard" size={16} className="text-light text-opacity-75 me-1" />
            <span className="text-light text-opacity-75 small">Visa</span>
          </div>
          <div className="d-flex align-items-center">
            <Icon name="CreditCard" size={16} className="text-light text-opacity-75 me-1" />
            <span className="text-light text-opacity-75 small">Mastercard</span>
          </div>
          <div className="d-flex align-items-center">
            <Icon name="CreditCard" size={16} className="text-light text-opacity-75 me-1" />
            <span className="text-light text-opacity-75 small">American Express</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;