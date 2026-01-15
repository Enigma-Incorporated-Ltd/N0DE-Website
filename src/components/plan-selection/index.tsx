import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import PlanCard from './components/PlanCard';
import BillingToggle from './components/BillingToggle';
import TrustSignals from './components/TrustSignals';
import Breadcrumb from './components/Breadcrumb';
import { NodeService } from '../../services';
import AccountService from '../../services/Account';
import type { Plan } from './components/PlanCard';
import Icon from '../../components/AppIcon';
import FooterOne from '../../layouts/footers/FooterOne';

const PlanSelection = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [disabledPlanId, setDisabledPlanId] = useState<string | null>(null);
  const [hasActivePlan, setHasActivePlan] = useState<boolean>(false);
  const [upgradingPlanId, setUpgradingPlanId] = useState<string | null>(null);
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        
        // First, fetch all available plans
        const plansData = await NodeService.getAllPlans();

        if (!Array.isArray(plansData)) {
          throw new Error('Invalid response format');
        }

        const transformedPlans: Plan[] = plansData.map((apiPlan: any) => {
          // Map annual price from various possible field names
          const annualPrice = apiPlan.annualPrice ?? apiPlan.yearlyPrice ?? apiPlan.AmountPerYear ?? apiPlan.amountPerYear ?? 0;
          
          // Debug log to verify yearly price mapping
          if (annualPrice === 0 && (apiPlan.yearlyPrice || apiPlan.AmountPerYear || apiPlan.amountPerYear)) {
            console.log(`Plan ${apiPlan.name}: yearly price fields:`, {
              annualPrice: apiPlan.annualPrice,
              yearlyPrice: apiPlan.yearlyPrice,
              AmountPerYear: apiPlan.AmountPerYear,
              amountPerYear: apiPlan.amountPerYear,
              mapped: annualPrice
            });
          }
          
          return {
          id: apiPlan.id.toString(),
          name: apiPlan.name,
          description: `${apiPlan.name} Plan`,
          monthlyPrice: apiPlan.monthlyPrice,
          annualPrice: annualPrice,
          features: apiPlan.features?.map((feature: any) => {
            // Handle different feature formats
            if (typeof feature === 'string') {
              return {
                text: feature,
                included: true,
              };
            } else if (typeof feature === 'object') {
              return {
                text: feature.text || feature.description || feature.Description || '',
                included: true,
              };
            }
            return {
              text: '',
              included: true,
            };
          }) || [],
          guarantee: apiPlan.guarantee ?? '',
          isPopular: !!apiPlan.isPopular,
          active: apiPlan.isActive !== undefined ? apiPlan.isActive : true,
          trialPeriodDays: apiPlan.trialPeriodDays ?? apiPlan.trialPeriod ?? undefined,
          };
        });

       // Show all active plans except the one with ID 21
const activePlans = transformedPlans.filter(plan => 
  plan.active !== false && plan.id !== '21'
);

        setPlans(activePlans);
        setError(null);

        // Then, try to get user plan details to check if they have an active plan
        const userIdRaw = AccountService.getCurrentUserId();
        const userId = userIdRaw || '';
        
        try {
          const response = await NodeService.getUserPlanDetails(userId);
          if (response?.planStatus?.toLowerCase() === 'active') {
            setDisabledPlanId(response?.planId?.toString() || null);
            setHasActivePlan(true);
          } else {
            setDisabledPlanId(null);
            setHasActivePlan(false);
          }
        } catch (userPlanError: any) {
          // If user plan details API returns "No plan details found for user" or any error,
          // we still show all plans but don't disable any
          console.log('User plan details not found or error:', userPlanError.message);
          setDisabledPlanId(null);
          setHasActivePlan(false);
        }

      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
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
              <div className="d-flex justify-content-center mb-3">
                <Icon 
                  name="Loader2" 
                  size={48} 
                  className="text-primary-gradient" 
                  style={{ 
                    animation: 'spin 1s linear infinite',
                    width: '48px',
                    height: '48px'
                  }} 
                />
              </div>
              <p className="text-light mb-0">Loading your plans...</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  const handleBillingToggle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  
    const userId = AccountService.getCurrentUserId();
 

      
    // Navigate to checkout with plan details, userId, and planId
    navigate('/checkout', { 
      state: { 
        selectedPlan: plan,
        billingCycle: billingCycle,
        userId: userId,
        planId: plan.id
      }
    });
  };

  const handleUpgrade = async (plan: Plan) => {
    try {
      setUpgradeMessage(null);
      setUpgradingPlanId(plan.id);
      const userId = AccountService.getCurrentUserId() || '';
      await NodeService.upgradeSubscription(userId, parseInt(plan.id, 10), billingCycle);
      // Optionally refresh plans or show success toast
      setDisabledPlanId(plan.id);
      setUpgradeMessage(`Subscription updated to ${plan.name} plan`);
      setShowUpgradeModal(true);
    } catch (err: any) {
      console.error('Upgrade failed:', err);
    }
    finally {
      setUpgradingPlanId(null);
    }
  };

   
  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />

        <main className="section-space-md-y" style={{ marginTop: '40px' }}>
          <div className="container">
            <Breadcrumb />

            <div className="text-center mb-5">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="mb-3">
                    <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                      <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                      <span className="d-block fw-medium text-light fs-20">Subscription Prices</span>
                    </div>
                    <h1 className="text-light mb-4 display-4 fw-bold" data-cue="fadeIn">
                      Choose your level
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mb-5">
              <BillingToggle
                billingCycle={billingCycle}
                onToggle={handleBillingToggle}
              />
            </div>

            {/* Loading / Error Handling */}
            {loading ? (
              <div className="section-space-md-y">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="text-center">
                        <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                        <p className="text-light">Loading your plans...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : error ? (
              <div className="text-center text-danger">Error: {error}</div>
            ) : (
              <>
              {/* Success Modal - styled like user dashboard modals */}
              {showUpgradeModal && (
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
                        <h2 className="fs-5 fw-semibold text-light mb-0">Success</h2>
                      </div>
                      <button type="button" className="btn-close btn-close-white ms-auto" aria-label="Close" onClick={() => setShowUpgradeModal(false)}></button>
                    </div>
                    <div className="flex-grow-1 overflow-auto p-4" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                      <div className="text-center">
                        <div className="bg-success bg-opacity-10 border border-success border-opacity-20 rounded-3 p-4 mb-3">
                          <Icon name="CheckCircle" size={32} className="text-success mb-3" />
                          <p className="text-success fw-medium mb-0">{upgradeMessage}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-top border-light border-opacity-20 d-flex justify-content-end gap-2" style={{
                      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 100%)'
                    }}>
                      <button type="button" className="btn btn-outline-light px-4" onClick={() => setShowUpgradeModal(false)}>Close</button>
                      <button type="button" className="btn btn-primary px-4" onClick={() => navigate('/user-dashboard')}>Access Dashboard</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="row g-4 mb-5">
                {plans.map((plan) => (
                  <div key={plan.id} className="col-lg-4 col-md-6">
                    <PlanCard
          plan={plan}
          isPopular={plan.isPopular}
          billingCycle={billingCycle}
          onSelectPlan={handleSelectPlan}
          onUpgrade={handleUpgrade}
          isSelected={
            selectedPlan
              ? selectedPlan.id === plan.id
              : plan.isPopular // Select popular plan by default
          }
          disabled={!!(disabledPlanId && disabledPlanId === plan.id)}
          hasActivePlan={hasActivePlan}
          loading={hasActivePlan && upgradingPlanId === plan.id}
        />
                  </div>
                ))}
              </div>
              </>
            )}

            <div className="section-space-sm-y">
              <TrustSignals />
            </div>

            <div className="section-space-sm-y">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="text-center">
                    <h3 className="text-light fw-bold mb-3 h2">Have Questions?</h3>
                    <p className="text-light mb-4">
                      Our support team is here to help you choose the right plan for your business.
                    </p>
                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                      <button
                        onClick={() => navigate('/support-center')}
                        className="btn btn-primary px-4 py-2 fw-medium"
                      >
                        Contact Support
                      </button>
                      <button
                        onClick={() => navigate('/contact')}
                        className="btn btn-outline-light px-4 py-2 fw-medium"
                      >
                        Talk to Sales
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        
      </div>
      <FooterOne />
    </Wrapper>
  );
};

export default PlanSelection;