import React from 'react';
import Icon from '../../../components/AppIcon';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
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

  const subtotal = mockPlan.price;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
      <h2 className="text-light fw-medium mb-4">Order Summary</h2>
      
      {/* Plan Details */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="text-light fw-medium mb-1">{mockPlan.name} Plan</h3>
            <p className="text-light text-opacity-75 small mb-0 text-capitalize">
              Billed {mockPlan.billingCycle}
            </p>
          </div>
          <div className="text-end">
            <p className="text-light fw-semibold mb-0">${mockPlan.price}</p>
            <p className="text-light text-opacity-75 small mb-0">per month</p>
          </div>
        </div>
        
        {/* Features */}
        <div className="pt-4 border-top border-light border-opacity-10">
          <p className="text-light fw-medium mb-3 small">Included features:</p>
          <ul className="list-unstyled mb-0">
            {mockPlan.features.map((feature, index) => (
              <li key={index} className="d-flex align-items-center mb-2 text-light text-opacity-75 small">
                <Icon name="Check" size={14} className="text-success me-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
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