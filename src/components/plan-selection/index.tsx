import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PlanCard from './components/PlanCard';
import BillingToggle from './components/BillingToggle';
import FeatureComparison from './components/FeatureComparison';
import TrustSignals from './components/TrustSignals';
import Breadcrumb from './components/Breadcrumb';

const PlanSelection = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'lite',
      name: 'LITE',
      description: 'Perfect for small businesses getting started',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        { text: 'Up to 1,000 monthly transactions', included: true },
        { text: 'Basic analytics dashboard', included: true },
        { text: 'Email support', included: true },
        { text: '5 user accounts', included: true },
        { text: '10GB storage space', included: true },
        { text: 'Priority support', included: false },
        { text: 'Custom integrations', included: false },
        { text: 'Advanced reporting', included: false }
      ],
      guarantee: '30-day money-back guarantee'
    },
    {
      id: 'pro',
      name: 'PRO',
      description: 'Ideal for growing businesses with advanced needs',
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        { text: 'Up to 10,000 monthly transactions', included: true },
        { text: 'Advanced analytics & reporting', included: true },
        { text: 'Priority email & chat support', included: true },
        { text: '25 user accounts', included: true },
        { text: '100GB storage space', included: true },
        { text: 'Custom integrations (5 included)', included: true },
        { text: 'API access', included: true },
        { text: 'White-label options', included: false }
      ],
      guarantee: '30-day money-back guarantee'
    },
    {
      id: 'max',
      name: 'MAX',
      description: 'Enterprise solution for large-scale operations',
      monthlyPrice: 199,
      annualPrice: 1990,
      features: [
        { text: 'Unlimited monthly transactions', included: true },
        { text: 'Enterprise analytics suite', included: true },
        { text: '24/7 dedicated support', included: true },
        { text: 'Unlimited user accounts', included: true },
        { text: '1TB storage space', included: true },
        { text: 'Unlimited custom integrations', included: true },
        { text: 'Full API access', included: true },
        { text: 'Complete white-label solution', included: true }
      ],
      guarantee: '30-day money-back guarantee'
    }
  ];

  const handleBillingToggle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    // Navigate to checkout with plan details
    navigate('/checkout', { 
      state: { 
        selectedPlan: plan,
        billingCycle: billingCycle
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Breadcrumb />
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the subscription plan that best fits your business needs. 
            Upgrade or downgrade anytime with no hidden fees.
          </p>
        </div>

        {/* Billing Toggle */}
        <BillingToggle 
          billingCycle={billingCycle} 
          onToggle={handleBillingToggle} 
        />

        {/* Plan Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isPopular={index === 1} // PRO plan is most popular
              billingCycle={billingCycle}
              onSelectPlan={handleSelectPlan}
              isSelected={selectedPlan?.id === plan.id}
            />
          ))}
        </div>

        {/* Feature Comparison */}
        <FeatureComparison plans={plans} />

        {/* Trust Signals */}
        <TrustSignals />

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Have Questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Our support team is here to help you choose the right plan for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/support-center')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Contact Support
            </button>
            <button
              onClick={() => window.open('mailto:sales@subscriptionflow.com', '_blank')}
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Talk to Sales
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} SubscriptionFlow. All rights reserved.</p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlanSelection;