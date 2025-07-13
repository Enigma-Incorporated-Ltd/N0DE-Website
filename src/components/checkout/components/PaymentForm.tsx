import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCardNumber = (value) => {
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

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const newErrors = {};

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

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate payment processing
      onSubmit(formData);
      setTimeout(() => {
        navigate('/payment-confirmation');
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Billing Information</h3>
        
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Select
          label="Country"
          placeholder="Select your country"
          options={countryOptions}
          value={formData.country}
          onChange={(value) => handleInputChange('country', value)}
          error={errors.country}
          required
        />
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Payment Information</h3>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-success font-medium">Secure</span>
          </div>
        </div>

        <Input
          label="Card Number"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
          error={errors.cardNumber}
          maxLength={19}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            type="text"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
            error={errors.expiryDate}
            maxLength={5}
            required
          />

          <Input
            label="CVV"
            type="text"
            placeholder="123"
            value={formData.cvv}
            onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
            error={errors.cvv}
            maxLength={4}
            required
          />
        </div>

        <Input
          label="Name on Card"
          type="text"
          placeholder="Enter name as shown on card"
          value={formData.nameOnCard}
          onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
          error={errors.nameOnCard}
          required
        />
      </div>

      {/* Security Notice */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lock" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Your payment is secure</p>
            <p className="text-xs text-muted-foreground mt-1">
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
        loading={isLoading}
        iconName="CreditCard"
        iconPosition="left"
        className="mt-8"
      >
        {isLoading ? 'Processing Payment...' : 'Complete Purchase'}
      </Button>

      {/* Payment Methods */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground mb-2">We accept</p>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Visa</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Mastercard</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">American Express</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;