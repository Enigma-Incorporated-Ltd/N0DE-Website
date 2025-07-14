import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import ProgressIndicator from './components/ProgressIndicator';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import Icon from '../../components/AppIcon';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  email: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

const Checkout = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Get selected plan from navigation state or use default
  useEffect(() => {
    const planFromState = location.state?.selectedPlan;
    if (planFromState) {
      setSelectedPlan(planFromState);
    } else {
      // Default plan if none selected
      setSelectedPlan({
        id: 'pro',
        name: 'PRO',
        price: 29.99,
        billingCycle: 'monthly',
        features: [
          'Up to 10 team members',
          'Advanced analytics',
          'Priority support',
          'Custom integrations',
          'Advanced security'
        ]
      });
    }
  }, [location.state]);

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    setIsLoading(true);
    setPaymentError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock payment validation
      if (paymentData.cardNumber.replace(/\s/g, '') === '4000000000000002') {
        throw new Error('Your card was declined. Please try a different payment method.');
      }
      
      // Success - navigation handled in PaymentForm component
      console.log('Payment successful:', paymentData);
      
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />
        
        {/* Checkout Header Section */}
        <div className="section-space-md-top pb-2">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">Checkout</span>
                  </div>
                  <h1 className="text-light mb-0" data-cue="fadeIn">
                    Complete Your <span className="text-gradient-primary">Purchase</span>
                  </h1>
                  <p className="text-light mb-0" data-cue="fadeIn">
                    Secure payment processing with instant access to your subscription
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="pt-0 pb-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-8 col-lg-6">
                <ProgressIndicator currentStep={2} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Error Message */}
        {paymentError && (
          <div className="pb-4">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-danger d-flex align-items-center mb-0" role="alert">
                    <Icon name="AlertCircle" size={20} className="me-2 flex-shrink-0" />
                    <span>{paymentError}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="section-space-sm-y">
          <div className="container">
            <div className="row g-4">
              {/* Payment Form - Left side on desktop */}
              <div className="col-12 col-lg-8">
                <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                  <h2 className="text-light mb-4">Payment Information</h2>
                  <PaymentForm 
                    onSubmit={handlePaymentSubmit}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Order Summary - Right sidebar */}
              <div className="col-12 col-lg-4">
                <div className="position-sticky" style={{ top: '6rem' }}>
                  <OrderSummary 
                    selectedPlan={selectedPlan}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="section-space-sm-y">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6">
                  <div className="row g-4 text-center">
                    <div className="col-12 col-md-4">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '3rem', height: '3rem' }}>
                          <Icon name="Shield" size={24} className="text-success" />
                        </div>
                        <h3 className="text-light fw-medium mb-2">Secure Payment</h3>
                        <p className="text-light text-opacity-75 mb-0">
                          Your payment information is encrypted and secure
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-4">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '3rem', height: '3rem' }}>
                          <Icon name="Zap" size={24} className="text-primary" />
                        </div>
                        <h3 className="text-light fw-medium mb-2">Instant Access</h3>
                        <p className="text-light text-opacity-75 mb-0">
                          Get immediate access to your subscription features
                        </p>
                      </div>
                    </div>
                    
                    <div className="col-12 col-md-4">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '3rem', height: '3rem' }}>
                          <Icon name="Headphones" size={24} className="text-warning" />
                        </div>
                        <h3 className="text-light fw-medium mb-2">24/7 Support</h3>
                        <p className="text-light text-opacity-75 mb-0">
                          Our support team is here to help you anytime
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Checkout;