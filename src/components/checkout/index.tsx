import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import ProgressIndicator from './components/ProgressIndicator';
import OrderSummary from './components/OrderSummary';
import CheckoutForm from './components/CheckoutForm';
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [planId, setPlanId] = useState<number>(0);
  const [planDetails, setPlanDetails] = useState<any | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userEmail, setUserEmail] = useState<string>('');
  const [priceId, setPriceId] = useState<string>('');
  const [userProfileId, setUserProfileId] = useState<string>('');
  const [customerId, setCustomerId] = useState<string>('');
  const [subscriptionId, setSubscriptionId] = useState<string>('');
  const [paymentError] = useState<string | null>(null);
  const [paymentIntentError, setPaymentIntentError] = useState<string | null>(null);
  
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
  useEffect(() => {
    // Create payment intent when we have both priceId and userEmail ready
    const maybeCreateIntent = async () => {
      if (!priceId || !userEmail) return;
      try {
        const init = await NodeService.createPaymentIntent(priceId, userEmail, userId, planId, billingCycle);
        setClientSecret(init.clientSecret);
        if (init.userProfileId) setUserProfileId(init.userProfileId);
        if (init.customerId) setCustomerId(init.customerId);
        if (init.subscriptionId) setSubscriptionId(init.subscriptionId);
        setIsLoading(false);
      } catch (err: any) {
        setPaymentIntentError(err?.message || 'Failed to create payment intent');
        setIsLoading(false);
      }
    };
    maybeCreateIntent();
  }, [priceId, userEmail]);
  const createPlan = async () => {
    if (!planId || !userId) return;
    // no-op
    setPlanError(null);
    try {
      const response = await NodeService.createPlan(userId, planId, billingCycle);
      setUserEmail(response.email || response.Email || '');
      setPriceId(response.priceId || response.PriceId || '');
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : 'Failed to create plan');
    } finally {
      // no-op
    }
  };

  const fetchPlanDetails = async () => {
    if (!planId) return;
    // no-op
    setPlanError(null);
    try {
      const plan = await NodeService.getPlanById(planId);
      setPlanDetails(plan);
    } catch (error) {
      setPlanError(error instanceof Error ? error.message : 'Failed to fetch plan details');
    } finally {
      // no-op
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
        features: Array.isArray(planDetails.Features || planDetails.features) 
          ? (planDetails.Features || planDetails.features).map((feature: any) => {
              if (typeof feature === 'string') {
                return feature;
              } else if (typeof feature === 'object') {
                return feature.text || feature.description || feature.Description || '';
              }
              return '';
            })
          : [],
        tax: planDetails.tax ?? planDetails.Tax ?? 0
      }
    : selectedPlan;

  // Create invoice data for payment confirmation
  const invoiceData = userProfileId ? {
    id: userProfileId,
    userProfileId: userProfileId
  } : undefined;

  
  const stripePromise = React.useMemo(
    () => loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_51JuxZZFgwLmZ9rINpimrajyz5U0fIsF597j8pugb6yCRI2Od9BQ9YtZh18oD2d89sCDIejlibgqJzNqWdHYVePgw00PwEhnjVF'),
    []
  );

  const appearance = React.useMemo(() => ({
    theme: 'night' as const,
    variables: {
      colorPrimary: '#7c5cff',
      colorBackground: '#141824',
      colorText: '#ffffff',
      colorTextSecondary: 'rgba(255,255,255,0.7)',
      colorDanger: '#dc3545',
      borderRadius: '12px',
      spacingUnit: '6px',
      fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'
    },
    rules: {
      '.Input': {
        backgroundColor: '#0f1320',
        color: '#ffffff',
        border: '1px solid rgba(255,255,255,0.1)'
      },
      '.Input:focus': {
        border: '1px solid #7c5cff'
      },
      '.Label': {
        color: 'rgba(255,255,255,0.7)'
      },
      '.Tab, .AccordionItem': {
        backgroundColor: '#0f1320',
        color: '#ffffff'
      }
    }
  }), []);

  if (isLoading) {
    return (
      <Wrapper>
        <div className="bg-dark position-relative" style={{ minHeight: '100vh' }}>
          <div style={{ borderBottom: 'none', boxShadow: 'none' }}>
            <HeaderDashboard />
          </div>
          <div className="d-flex align-items-center justify-content-center" style={{ 
            height: 'calc(100vh - 80px)',
            marginTop: '80px'
          }}>
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '4rem', height: '4rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-light mb-0">Initializing your checkout...</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <>
    {clientSecret && stripePromise && (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <Wrapper>
        <div className="bg-dark position-relative">
          <div style={{ borderBottom: 'none', boxShadow: 'none' }}>
            <HeaderDashboard />
          </div>
          <div className="pt-5 pb-2" style={{ marginTop: '80px' }}>
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
                    <CheckoutForm 
                      invoiceData={invoiceData}
                      intentMeta={{
                        clientSecret,
                        userProfileId,
                        customerId,
                        subscriptionId
                      }}
                      planId={planId}
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
  )}
  </>
  );
};

export default Checkout;