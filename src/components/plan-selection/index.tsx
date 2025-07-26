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

const PlanSelection = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [disabledPlanId, setDisabledPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        // const response = await NodeService.getAllPlans();

     const plansData = await NodeService.getAllPlans();

if (!Array.isArray(plansData)) {
  throw new Error('Invalid response format');
}

      const transformedPlans: Plan[] = plansData.map((apiPlan: any) => ({
        id: apiPlan.id.toString(),
        name: apiPlan.name,
        description: `${apiPlan.name} Plan`,
        monthlyPrice: apiPlan.monthlyPrice,
        annualPrice: apiPlan.annualPrice ?? apiPlan.yearlyPrice ?? 0,
        features: apiPlan.features?.map((feature: string) => ({
          text: feature,
          included: true,
        })) || [],
        guarantee: apiPlan.guarantee ?? '',
        isPopular: !!apiPlan.isPopular,
      }));

      setPlans(transformedPlans);
      setError(null);

    const userIdRaw = AccountService.getCurrentUserId();
    const userId = userIdRaw || '';
    const response = await NodeService.getUserPlanDetails(userId);
    if (response?.planStatus?.toLowerCase() === 'active') {
      setDisabledPlanId(response?.planId?.toString() || null);
    } else {
      setDisabledPlanId(null);
    }
    //console.log("Disabled Plan ID", response?.planId);
    //console.log("All Plans", transformedPlans.map(p => p.id));

    }  catch (err: any) {
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
              <div className="row g-4 mb-5">
                {plans.map((plan) => (
                  <div key={plan.id} className="col-lg-4 col-md-6">
                    <PlanCard
          plan={plan}
          isPopular={plan.isPopular}
          billingCycle={billingCycle}
          onSelectPlan={handleSelectPlan}
          isSelected={
            selectedPlan
              ? selectedPlan.id === plan.id
              : plan.isPopular // Select popular plan by default
          }
          disabled={!!(disabledPlanId && disabledPlanId === plan.id)}
        />
                  </div>
                ))}
              </div>
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
                        onClick={() => window.open('mailto:sales@n0de.gg', '_blank')}
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
    </Wrapper>
  );
};

export default PlanSelection;