import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { NodeService } from '../../../services/Node';
import { AccountService } from '../../../services';

interface FormData {
  fullName: string;
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
  onCreatePaymentIntent: (customerData: FormData) => Promise<{
    clientSecret: string | null;
    userProfileId: string | null;
    customerId: string | null;
    newSubscriptionId: string | null;
    oldSubscriptionId: string | null;
  }>;
  userEmail?: string;
  planId?: number;
  userProfileId?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ isLoading, isCreatingPaymentIntent, onCreatePaymentIntent, userEmail, userProfileId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    country: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData & { card: string }>>({});
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Fetch and pre-fill user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userProfileId) return;
      
      setIsLoadingUserData(true);
      try {
        const userId = AccountService.getCurrentUserId();
        if (!userId) return;

        const userDetails = await NodeService.getUserDetails(userId);
        if (userDetails) {
          setFormData(prev => ({
            ...prev,
            fullName: `${userDetails.firstName || ''} ${userDetails.lastName || ''}`.trim(),
            country: userDetails.country || 'us',
            address: userDetails.address || '',
            city: userDetails.city || '',
            state: userDetails.state || '',
            zipCode: userDetails.zipCode || ''
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [userProfileId]);

  const handleCardNumberChange = (event: any) => {
    setCardComplete(prev => ({ ...prev, cardNumber: event.complete }));
  };

  const handleCardExpiryChange = (event: any) => {
    setCardComplete(prev => ({ ...prev, cardExpiry: event.complete }));
  };

  const handleCardCvcChange = (event: any) => {
    setCardComplete(prev => ({ ...prev, cardCvc: event.complete }));
  };

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

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (formData.zipCode.trim().length < 5) {
      newErrors.zipCode = 'ZIP code must be at least 5 characters';
    } else if (!/^\d+$/.test(formData.zipCode.trim())) {
      newErrors.zipCode = 'ZIP code must contain only numbers';
    }

    // Remove card validation since we're using Stripe Elements
    // Card validation is handled by Stripe

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPaymentInvoiceEntry = async (paymentId: string, userProfileIdToUse: string, userId:string, customerId:string, subscriptionId:string, oldSubscriptionId:string) => {
    // Use passed userProfileId if available, otherwise throw error
    const finalUserProfileId = userProfileIdToUse;
    
    if (!finalUserProfileId) {
      console.error('UserProfileId is missing');
      throw new Error('UserProfileId is required for invoice creation');
    }

    try {
      const result = await NodeService.createPaymentInvoice(paymentId, finalUserProfileId, userId, customerId, subscriptionId, oldSubscriptionId);
      
      if (!result || !result.id) {
        console.error('Payment invoice API response missing id:', result);
        throw new Error('Invalid response from payment invoice API');
      }

      return {
        id: result.id,
        userProfileId: result.userProfileId,
        customerId:result.customerId,
        newSubscriptionId:result.newSubscriptionId,
        oldSubscriptionId:result.oldSubscriptionId
      };
    } catch (error) {
      console.error('Error creating payment invoice entry:', error);
      throw error; // Re-throw to be handled by the calling function
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setCardError(null);
      setIsProcessingPayment(true);
      
      try {
        const paymentIntentResult = await onCreatePaymentIntent(formData);
        let effectiveClientSecret = paymentIntentResult?.clientSecret;
        let effectiveUserProfileId = paymentIntentResult?.userProfileId;
        let effectiveCustomerId = paymentIntentResult?.customerId;
        let effectiveSubscriptionId = paymentIntentResult?.newSubscriptionId;
        let effectiveOldSubscriptionId = paymentIntentResult?.oldSubscriptionId;
        let effectiveUserId = AccountService.getCurrentUserId();
      
        if (!effectiveClientSecret) {
          setCardError('Failed to initiate payment. Please try again.');
          setIsProcessingPayment(false);
          return;
        }
        
        // Validate Stripe and elements
        if (!stripe || !elements || !effectiveClientSecret) {
          setCardError('Payment system is not ready. Please wait a moment and try again.');
          setIsProcessingPayment(false);
          return;
        }
        
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
          setCardError('Card information is required');
          setIsProcessingPayment(false);
          return;
        }

        // Process payment with Stripe
        const { paymentIntent, error } = await stripe.confirmCardPayment(effectiveClientSecret, {
          payment_method: {
            card: cardNumberElement,
            billing_details: {
              name: formData.fullName,
              email: userEmail || '',
            },
          },
        });

        if (error) {
          setCardError(error.message || 'Payment failed. Please try again.');
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
          try {
            // Use the local effectiveUserProfileId, not the prop
            const invoiceData = await createPaymentInvoiceEntry(
              paymentIntent.id ?? '',
              effectiveUserProfileId ?? '',
              effectiveUserId ?? '',
              effectiveCustomerId ?? '',
              effectiveSubscriptionId ?? '',
              effectiveOldSubscriptionId ?? ''
            );
            
            if (invoiceData?.id) {
              // Navigate to payment confirmation
              navigate('/payment-confirmation', {
                state: {
                  id: invoiceData.id,
                  userProfileId: invoiceData.userProfileId
                }
              });
            } else {
              setCardError('Payment succeeded but failed to create invoice. Please contact support.');
            }
          } catch (error) {
            console.error('Error during invoice creation:', error);
            setCardError('Payment succeeded but failed to create invoice. Please contact support.');
          }
        } else if (paymentIntent && paymentIntent.status === 'requires_payment_method') {
          setCardError('Payment failed. Please check your card details and try again.');
        } else {
          setCardError('Payment is being processed. Please wait...');
        }
      } catch (error) {
        console.error('Payment error:', error);
        setCardError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Billing Address Section */}
      <div className="mb-5">
        <h3 className="text-light fw-medium mb-4">Billing address</h3>
        
        <div className="mb-3">
          <Input
            label="Name"
            type="text"
            placeholder="Name"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            error={errors.fullName}
            required
          />
        </div>

        <div className="mb-3">
          <Select
            label="Country"
            placeholder="United States"
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
            placeholder="Address"
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
            onChange={(e) => {
              // Only allow numeric input
              const value = e.target.value.replace(/[^0-9]/g, '');
              handleInputChange('zipCode', value);
            }}
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
              <div className="position-relative">
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
                    onChange={handleCardNumberChange}
                  />
                </div>
                <div className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center gap-1 pe-3">
                  <div className="bg-primary rounded-1 d-flex align-items-center justify-content-center me-1" style={{ width: '24px', height: '16px' }}>
                    <span className="text-white fw-bold" style={{ fontSize: '8px' }}>VISA</span>
                  </div>
                  <div className="bg-warning rounded-1 d-flex align-items-center justify-content-center me-1" style={{ width: '24px', height: '16px' }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="bg-danger rounded-circle me-1" style={{ width: '8px', height: '8px' }}></div>
                      <div className="bg-warning rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                    </div>
                  </div>
                  <div className="bg-info rounded-1 d-flex align-items-center justify-content-center me-1" style={{ width: '24px', height: '16px' }}>
                    <span className="text-white fw-bold" style={{ fontSize: '6px' }}>AMEX</span>
                  </div>
                  <div className="bg-success rounded-1 d-flex align-items-center justify-content-center me-1" style={{ width: '24px', height: '16px' }}>
                    <span className="text-white fw-bold" style={{ fontSize: '6px' }}>DISC</span>
                  </div>
                  <div className="bg-secondary rounded-1 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '16px' }}>
                    <span className="text-white fw-bold" style={{ fontSize: '6px' }}>CARD</span>
                  </div>
                </div>
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
                    onChange={handleCardExpiryChange}
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
                    onChange={handleCardCvcChange}
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
        loading={isLoading || isCreatingPaymentIntent || isProcessingPayment}
        iconName="CreditCard"
        iconPosition="left"
        className="mb-4 d-flex align-items-center justify-content-center"
        disabled={isCreatingPaymentIntent || isProcessingPayment || !cardComplete.cardNumber || !cardComplete.cardExpiry || !cardComplete.cardCvc}
      >
        {isCreatingPaymentIntent ? 'Initializing Payment...' : isLoading ? 'Processing Payment...' : isProcessingPayment ? 'Processing Payment...' : 'Complete Purchase'}
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