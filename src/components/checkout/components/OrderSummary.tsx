import React from 'react';
import Icon from '../../../components/AppIcon';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: PlanFeature[] | string[];
}

interface OrderSummaryProps {
  selectedPlan: Plan | null;
  isLoading: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedPlan, isLoading }) => {
  const mockPlan = selectedPlan || {
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
  };

  // Add null checks and default values for price calculations
  const priceValue = typeof mockPlan.price === 'number' ? mockPlan.price : 0;
  const subtotal = priceValue;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  // Helper function to render features
  const renderFeature = (feature: PlanFeature | string, index: number) => {
    const isObject = typeof feature === 'object';
    const featureText = isObject ? feature.text : feature;
    const isIncluded = isObject ? feature.included : true;

    return (
      <li key={index} className="d-flex align-items-center mb-2 text-light text-opacity-75 small">
        <Icon 
          name={isIncluded ? "Check" : "X"} 
          size={14} 
          className={`me-2 flex-shrink-0 ${isIncluded ? 'text-success' : 'text-secondary'}`} 
        />
        <span className={isIncluded ? 'text-light text-opacity-75' : 'text-secondary'}>
          {featureText}
        </span>
      </li>
    );
  };

  return (
    <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
      <h2 className="text-light fw-medium mb-4">Order Summary</h2>
      
      {/* Plan Details */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="text-light fw-medium mb-1">{mockPlan.name || 'Plan'} Plan</h3>
            <p className="text-light text-opacity-75 small mb-0 text-capitalize">
              Billed {mockPlan.billingCycle || 'monthly'}
            </p>
          </div>
          <div className="text-end">
            <p className="text-light fw-semibold mb-0">${priceValue.toFixed(2)}</p>
            <p className="text-light text-opacity-75 small mb-0">per month</p>
          </div>
        </div>
        
        {/* Features */}
        <div className="pt-4 border-top border-light border-opacity-10">
          <p className="text-light fw-medium mb-3 small">Included features:</p>
          <ul className="list-unstyled mb-0">
            {(mockPlan.features || []).map((feature, index) => renderFeature(feature, index))}
          </ul>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="pt-4 border-top border-light border-opacity-10">
        <div className="d-flex justify-content-between mb-2 small">
          <span className="text-light text-opacity-75">Subtotal</span>
          <span className="text-light">${subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-3 small">
          <span className="text-light text-opacity-75">Tax (8%)</span>
          <span className="text-light">${tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between pt-2 border-top border-light border-opacity-10">
          <span className="text-light fw-semibold">Total</span>
          <span className="text-light fw-semibold">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-4 pt-4 border-top border-light border-opacity-10">
        <div className="d-flex align-items-center justify-content-center">
          <Icon name="Shield" size={16} className="text-success me-2" />
          <span className="text-light text-opacity-75 small">Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;