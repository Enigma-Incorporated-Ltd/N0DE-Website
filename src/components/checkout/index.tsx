import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import ProgressIndicator from './components/ProgressIndicator';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import Icon from '../../components/AppIcon';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { NodeService } from '../../services/Node';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
  tax?: number;
}

const Checkout = () => {
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isCreatingPaymentIntent, setIsCreatingPaymentIntent] = useState(false);
  const [paymentIntentError, setPaymentIntentError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [planId, setPlanId] = useState<number>(0);
  const [planDetails, setPlanDetails] = useState<any | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userEmail, setUserEmail] = useState<string>('');
  const [priceId, setPriceId] = useState<string>('');
  const [userProfileId, setUserProfileId] = useState<string>('');

  useEffect(() => {
    const planFromState = location.state?.selectedPlan;
    const userIdFromState = location.state?.userId;
    const planIdFromState = location.state?.planId;
    const billingCycleFromState = location.state?.billingCycle;
    if (planFromState) setSelectedPlan(planFromState);
    if (userIdFromState) setUserId(userIdFromState);
    else {
      const urlParams = new URLSearchParams(window.location.search);
      const urlUserId = urlParams.get('userId');
      if (urlUserId) setUserId(urlUserId);
    }
    if (planIdFromState) setPlanId(planIdFromState);
    else {
      const urlParams = new URLSearchParams(window.location.search);
      const urlPlanId = urlParams.get('planId');
      if (urlPlanId) setPlanId(parseInt(urlPlanId));
    }
    if (billingCycleFromState) setBillingCycle(billingCycleFromState);
  }, [location.state]);

  useEffect(() => {
    if (planId) fetchPlanDetails();
  }, [planId]);

  useEffect(() => {
    if (planId && userId) createPlan();
  }, [planId, userId]);

  const createPlan = async () => {
    if (!planId || !userId) return;
    setIsLoading(true);
    setPlanError(null);
    try {
      const response = await NodeService.createPlan(userId, planId, billingCycle);
      setUserEmail(response.email || '');
      setPriceId(response.priceId || '');
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : 'Failed to create plan');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlanDetails = async () => {
    if (!planId) return;
    setIsLoading(true);
    setPlanError(null);
    try {
      const plan = await NodeService.getPlanById(planId);
      setPlanDetails(plan);
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : 'Failed to fetch plan details');
    } finally {
      setIsLoading(false);
    }
  };

  const orderSummaryPlan = planDetails
    ? {
        id: planDetails.id?.toString() || '',
        name: planDetails.name || planDetails.PlanTitle || '',
        price: billingCycle === 'yearly'
          ? planDetails.yearlyPrice || planDetails.AmountPerYear || 0
          : planDetails.monthlyPrice || planDetails.AmountPerMonth || 0,
        billingCycle,
        features: planDetails.Features || planDetails.features || [],
        tax: planDetails.tax ?? planDetails.Tax ?? 0
      }
    : selectedPlan;

  const createPaymentIntent = useCallback(async (customerData: { fullName: string; country: string; address: string; city: string; state: string; zipCode: string }): Promise<{ clientSecret: string | null; userProfileId: string | null; customerId: string | null; newSubscriptionId: string | null ; oldSubscriptionId: string | null}> => {
    if (!orderSummaryPlan) {
      throw new Error('Plan details are not available. Please try refreshing the page.');
    }
    setIsCreatingPaymentIntent(true);
    setPaymentError('');
    setPaymentIntentError(null);
    setClientSecret(null);
    try {
      const subtotal = orderSummaryPlan.price;
      const taxPercent = typeof orderSummaryPlan.tax === 'number' ? orderSummaryPlan.tax : 8;
      const taxRate = taxPercent / 100;
      const taxAmount = subtotal * taxRate;
      const totalPrice = subtotal + taxAmount;
      const amountInCents = Math.round(totalPrice * 100);
      const requestBody = {
        userId: userId,
        planId: planId,
        amount: amountInCents,
        currency: 'usd',
        planName: orderSummaryPlan.name || 'PRO Plan',
        billingCycle: billingCycle,
        customerName: customerData.fullName,
        customerEmail: userEmail || '',
        customerAddress: customerData.address,
        customerCity: customerData.city,
        customerState: customerData.state,
        customerZipCode: customerData.zipCode,
        customerCountry: customerData.country,
        priceId: priceId
      };
      const data = await NodeService.createPaymentIntent(requestBody);
      if (!data.clientSecret) {
        throw new Error('Payment system is not ready. Please try again.');
      }
      setClientSecret(data.clientSecret);
      setUserProfileId(data.userProfileId || '');
      await new Promise(resolve => setTimeout(resolve, 100));
      return {
        clientSecret: data.clientSecret,
        userProfileId: data.userProfileId || null,
        customerId: data.customerId || null,
        newSubscriptionId: data.newSubscriptionId || null,
        oldSubscriptionId: data.oldSubscriptionId || null
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'There is a server error. Unable to initiate payment.';
      setPaymentIntentError(errorMessage);
      return {
        clientSecret: null,
        userProfileId: null,
        customerId: null,
        newSubscriptionId: null,
        oldSubscriptionId: null
      };
    } finally {
      setIsCreatingPaymentIntent(false);
    }
  }, [orderSummaryPlan, billingCycle, userEmail, priceId]);

  const handlePaymentSubmit = async () => {
    setIsLoading(true);
    setPaymentError('');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const stripePromise = React.useMemo(
    () => loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY),
    []
  );

  return (
    <Elements stripe={stripePromise}>
      <Wrapper>
        <div className="bg-dark">
          <HeaderDashboard />
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
          <div className="pt-0 pb-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                  <ProgressIndicator currentStep={2} />
                </div>
              </div>
            </div>
          </div>
          {(paymentError || paymentIntentError || planError) && (
            <div className="pb-4">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger d-flex align-items-center justify-content-between mb-0" role="alert" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}>
                      <div className="d-flex align-items-center">
                        <Icon name="AlertCircle" size={20} className="me-2 flex-shrink-0 text-white" />
                        <span className="text-white fw-medium">{paymentError || paymentIntentError || planError}</span>
                      </div>
                      <button 
                        type="button" 
                        className="btn-close btn-close-white" 
                        aria-label="Close"
                        style={{ filter: 'invert(1)' }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row g-4">
                <div className="col-12 col-lg-8">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                    <h2 className="text-light mb-4">Payment Information</h2>
                    <PaymentForm 
                      onSubmit={handlePaymentSubmit}
                      isLoading={isLoading}
                      clientSecret={clientSecret}
                      isCreatingPaymentIntent={isCreatingPaymentIntent}
                      onCreatePaymentIntent={createPaymentIntent}
                      userEmail={userEmail}
                      planId={planId}
                      userProfileId={userProfileId}
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="position-sticky" style={{ top: '6rem' }}>
                    <OrderSummary 
                      selectedPlan={orderSummaryPlan}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </Elements>
  );
};

export default Checkout;