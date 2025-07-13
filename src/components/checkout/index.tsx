import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutHeader from './components/CheckoutHeader';
import ProgressIndicator from './components/ProgressIndicator';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import Icon from '../../components/AppIcon';

const Checkout = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState(null);
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

  const handlePaymentSubmit = async (paymentData) => {
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
      setPaymentError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CheckoutHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <ProgressIndicator currentStep={2} />
        
        {/* Error Message */}
        {paymentError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-600">{paymentError}</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form - Left side on desktop, top on mobile */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Purchase</h1>
              <PaymentForm 
                onSubmit={handlePaymentSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Order Summary - Right sidebar on desktop, top on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <OrderSummary 
                selectedPlan={selectedPlan}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Secure Payment</h3>
              <p className="text-sm text-gray-600">
                Your payment information is encrypted and secure
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Instant Access</h3>
              <p className="text-sm text-gray-600">
                Get immediate access to your subscription features
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Icon name="Headphones" size={24} className="text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">24/7 Support</h3>
              <p className="text-sm text-gray-600">
                Our support team is here to help you anytime
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;