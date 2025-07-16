import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import PlanCard from './components/PlanCard';
import BillingToggle from './components/BillingToggle';
import FeatureComparison from './components/FeatureComparison';
import TrustSignals from './components/TrustSignals';
import Breadcrumb from './components/Breadcrumb';

// Types
interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PlanFeature[];
  guarantee: string;
}

const PlanSelection = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const plans = [
    {
      id: 'lite',
      name: 'LITE',
      description: 'The Most Basic Plan',
      monthlyPrice: 18.99,
      annualPrice: 189.99,
      features: [
        { text: 'Basic Content Generation', included: true },
        { text: 'User-Friendly Interface', included: true },
        { text: 'Template Variety', included: true },
        { text: 'Content Exploration Tools', included: true },
        { text: 'Priority Customer Support', included: true }
      ],
      guarantee: ''
    },
    {
      id: 'pro',
      name: 'PRO',
      description: 'The Most Basic Plan',
      monthlyPrice: 99.99,
      annualPrice: 999.99,
      features: [
        { text: 'Basic Content Generation', included: true },
        { text: 'User-Friendly Interface', included: true },
        { text: 'Template Variety', included: true },
        { text: 'Content Exploration Tools', included: true },
        { text: 'Priority Customer Support', included: true }
      ],
      guarantee: ''
    },
    {
      id: 'max',
      name: 'MAX',
      description: 'Exclusive for small business',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: 'Basic Content Generation', included: true },
        { text: 'User-Friendly Interface', included: true },
        { text: 'Template Variety', included: true },
        { text: 'Content Exploration Tools', included: true },
        { text: 'Priority Customer Support', included: true }
      ],
      guarantee: ''
    }
  ];

  const handleBillingToggle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  };

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    
    // Get userId from localStorage or sessionStorage (assuming it's stored there)
    const currentUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
    const userId = currentUser.id || currentUser.userId || 'default-user-id';
    
    // Map plan ID to numeric planId for API
    const planIdMap: { [key: string]: number } = {
      'lite': 1,
      'pro': 2,
      'max': 3
    };
    const planId = planIdMap[plan.id] || 1;
    
    // Navigate to checkout with plan details, userId, and planId
    navigate('/checkout', { 
      state: { 
        selectedPlan: plan,
        billingCycle: billingCycle,
        userId: userId,
        planId: planId
      }
    });
  };

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />
        
        <main className="section-space-md-y">
          <div className="container">
            <Breadcrumb />
            
            {/* Hero Section */}
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

            {/* Billing Toggle */}
            <div className="d-flex justify-content-center mb-5">
              <BillingToggle 
                billingCycle={billingCycle} 
                onToggle={handleBillingToggle} 
              />
            </div>

            {/* Plan Cards */}
            <div className="row g-4 mb-5">
              {plans.map((plan, index) => (
                <div key={plan.id} className="col-lg-4 col-md-6">
                  <PlanCard
                    plan={plan}
                    isPopular={index === 1} // PRO plan is most popular
                    billingCycle={billingCycle}
                    onSelectPlan={handleSelectPlan}
                    isSelected={selectedPlan?.id === plan.id}
                  />
                </div>
              ))}
            </div>

            {/* Feature Comparison */}
            {/* <div className="section-space-sm-y">
              <FeatureComparison plans={plans} />
            </div> */}

            {/* Trust Signals */}
            <div className="section-space-sm-y">
              <TrustSignals />
            </div>

            {/* FAQ Section */}
            <div className="section-space-sm-y">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="text-center">
                    <h3 className="text-light fw-bold mb-3 h2">
                      Have Questions?
                    </h3>
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

        {/* Footer */}
        <footer className="bg-dark border-top border-secondary py-4">
          <div className="container">
            <div className="text-center">
              <p className="text-light mb-0 small">
                &copy; {new Date().getFullYear()} N0de. All rights reserved.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
                <a href="#" className="text-light small text-decoration-none">Privacy Policy</a>
                <a href="#" className="text-light small text-decoration-none">Terms of Service</a>
                <a href="#" className="text-light small text-decoration-none">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default PlanSelection;