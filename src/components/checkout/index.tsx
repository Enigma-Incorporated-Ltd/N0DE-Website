import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import ProgressIndicator from './components/ProgressIndicator';
import OrderSummary from './components/OrderSummary';
import CheckoutForm from './components/CheckoutForm';
import AddressForm, { AddressData } from './components/AddressForm';
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
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
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
  const [isTrial, setIsTrial] = useState<boolean>(false);
  const [setupIntentId, setSetupIntentId] = useState<string>('');
  const [trialDays, setTrialDays] = useState<number | undefined>(undefined);
  const [amountAfterTrial, setAmountAfterTrial] = useState<number | undefined>(undefined);
  const [trialBillingCycle, setTrialBillingCycle] = useState<string | undefined>(undefined);
  const [trialPlanName, setTrialPlanName] = useState<string | undefined>(undefined);
  const [paymentError] = useState<string | null>(null);
  const [paymentIntentError, setPaymentIntentError] = useState<string | null>(null);
  const [showPriceIdModal, setShowPriceIdModal] = useState<boolean>(false);
  const [stripePublicKey, setStripePublicKey] = useState<string>('');

  // Fetch Stripe public key on mount
  useEffect(() => {
    const fetchPublicKey = async () => {
      try {
        const key = await NodeService.getStripePublicKey();
        setStripePublicKey(key);
      } catch (error) {
        console.error('Error fetching Stripe public key:', error);
      }
    };
    fetchPublicKey();
  }, []);

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
  const [taxInfo, setTaxInfo] = useState<{ hasTax: boolean; taxRate: number; taxAmount: number; country?: string } | null>(null);
  const [isCheckingTax, setIsCheckingTax] = useState<boolean>(false);
  const [billingAddress, setBillingAddress] = useState<AddressData | null>(null);
  const [isCreatingPaymentIntent, setIsCreatingPaymentIntent] = useState<boolean>(false);

  // Check tax for the selected country and postal code
  const checkTaxForAddress = async (country: string, address?: Partial<AddressData>, forceRecreate = false) => {
    if (!orderSummaryPlan || !country || !address?.postalCode) return;

    try {
      setIsCheckingTax(true);
      const taxResult = await NodeService.checkTax(
        country,
        orderSummaryPlan.price,
        'gbp',
        address?.postalCode,
        address?.city,
        address?.state,
        priceId
      );

      setTaxInfo({
        hasTax: taxResult.hasTax,
        taxRate: taxResult.taxRate,
        taxAmount: taxResult.taxAmount,
        country: taxResult.country
      });

      // Create payment intent after tax calculation
      // If forceRecreate is true or we don't have a client secret yet
      if (forceRecreate || !clientSecret) {
        // Clear existing client secret if recreating
        if (forceRecreate && clientSecret) {
          setClientSecret(null);
          setUserProfileId('');
          setCustomerId('');
          setSubscriptionId('');
        }

        await createPaymentIntentWithAddress({
          country,
          postalCode: address.postalCode
        });
      }
    } catch (err) {
      console.error('Error checking tax:', err);
      // Set no tax if check fails
      setTaxInfo({
        hasTax: false,
        taxRate: 0,
        taxAmount: 0,
        country: country
      });
    } finally {
      setIsCheckingTax(false);
    }
  };

  // Handle country change from location fields
  const handleCountryChange = (country: string, address: Partial<AddressData>, isCountryChange = false) => {
    if (country && address.postalCode) {
      // Force recreate payment intent when country changes
      checkTaxForAddress(country, address, isCountryChange || !!clientSecret);
    }
  };

  // Create payment intent after tax calculation
  const createPaymentIntentWithAddress = async (address: AddressData) => {
    if (!priceId || !userEmail) return;

    try {
      setIsCreatingPaymentIntent(true);
      setPaymentIntentError(null);

      const init = await NodeService.createPaymentIntent(
        priceId,
        userEmail,
        userId,
        planId,
        billingCycle,
        {
          country: address.country,
          postalCode: address.postalCode
        }
      );
      setClientSecret(init.clientSecret);
      if (init.userProfileId) setUserProfileId(init.userProfileId);
      if (init.customerId) setCustomerId(init.customerId);
      if (init.subscriptionId) setSubscriptionId(init.subscriptionId);
      if (init.isTrial !== undefined) setIsTrial(init.isTrial);
      if (init.setupIntentId) setSetupIntentId(init.setupIntentId);
      if (init.trialDays !== undefined) setTrialDays(init.trialDays);
      if (init.amountAfterTrial !== undefined) setAmountAfterTrial(init.amountAfterTrial);
      if (init.billingCycle) setTrialBillingCycle(init.billingCycle);
      if (init.planName) setTrialPlanName(init.planName);
      setBillingAddress(address); // Store address for payment confirmation
    } catch (err: any) {
      setPaymentIntentError(err?.message || 'Failed to create payment intent');
    } finally {
      setIsCreatingPaymentIntent(false);
    }
  };

  const handleAddressSubmit = (address: AddressData) => {
    // This is called when user explicitly clicks "Continue to Payment"
    // By this time, payment intent should already be created automatically
    if (!clientSecret) {
      createPaymentIntentWithAddress(address);
    }
  };
  const createPlan = async () => {
    if (!planId || !userId) return;
    // no-op
    setPlanError(null);
    try {
      const response = await NodeService.createPlan(userId, planId, billingCycle);
      setUserEmail(response.email || response.Email || '');
      const receivedPriceId = response.priceId || response.PriceId || '';
      setPriceId(receivedPriceId);

      // Check if PriceId is empty or null
      if (!receivedPriceId) {
        setShowPriceIdModal(true);
        return;
      }
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
    () => stripePublicKey ? loadStripe(stripePublicKey) : null,
    [stripePublicKey]
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

  const handlePriceIdModalOk = () => {
    setShowPriceIdModal(false);
    navigate('/plan-selection', { state: { userId } });
  };

  // Show loading only if we don't have the required initial data
  const showLoading = !stripePublicKey || !priceId || !userEmail;

  if (showLoading) {
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
      {/* Single page checkout with location fields and payment form */}
      {priceId && userEmail && (
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
                          onClick={() => setPaymentIntentError(null)}
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
                    {/* Location fields (Country and Zipcode) */}
                    <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm mb-4">
                      <h2 className="text-light mb-3">Billing Location</h2>
                      <p className="text-light text-opacity-75 small mb-4">
                        Enter your country and postal code for accurate tax calculation
                      </p>
                      <AddressForm
                        onSubmit={handleAddressSubmit}
                        isLoading={isCreatingPaymentIntent}
                        onCountryChange={handleCountryChange}
                        hideSubmitButton={true}
                      />
                    </div>

                    {/* Payment form - shown only when we have clientSecret */}
                    {clientSecret && stripePromise ? (
                      <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                        <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                          <h2 className="text-light mb-4">Payment Information</h2>
                          <CheckoutForm
                            invoiceData={invoiceData}
                            intentMeta={{
                              clientSecret,
                              userProfileId,
                              customerId,
                              subscriptionId,
                              isTrial,
                              setupIntentId,
                              trialDays,
                              amountAfterTrial,
                              billingCycle: trialBillingCycle,
                              planName: trialPlanName
                            }}
                            planId={planId}
                            billingAddress={billingAddress ? {
                              country: billingAddress.country,
                              postalCode: billingAddress.postalCode
                            } : undefined}
                          />
                        </div>
                      </Elements>
                    ) : (
                      <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                        <div className="text-center py-4">
                          {isCreatingPaymentIntent ? (
                            <>
                              <div className="spinner-border text-primary mb-3" role="status" style={{ width: '2rem', height: '2rem' }}>
                                <span className="visually-hidden">Loading...</span>
                              </div>
                              <p className="text-light mb-0">Preparing payment form...</p>
                            </>
                          ) : (
                            <>
                              <Icon name="CreditCard" size={48} className="text-light text-opacity-25 mb-3" />
                              <p className="text-light text-opacity-75 mb-0">
                                Enter your country and postal code above to continue
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-12 col-lg-4">
                    <div className="position-sticky" style={{ top: '6rem' }}>
                      <OrderSummary
                        selectedPlan={orderSummaryPlan}
                        taxInfo={taxInfo}
                        isCheckingTax={isCheckingTax}
                        trialInfo={{
                          isTrial,
                          trialDays,
                          amountAfterTrial,
                          billingCycle: trialBillingCycle
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust signals */}
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
      )}

      {/* PriceId Modal */}
      {showPriceIdModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border border-light border-opacity-10">
              <div className="modal-header border-bottom border-light border-opacity-10">
                <h5 className="modal-title text-light">
                  <Icon name="AlertCircle" size={20} className="me-2 text-warning" />
                  Plan Not Ready
                </h5>
              </div>
              <div className="modal-body">
                <p className="text-light mb-0">
                  This plan is not ready for checkout. Please select a different plan or try again later.
                </p>
              </div>
              <div className="modal-footer border-top border-light border-opacity-10">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handlePriceIdModalOk}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;