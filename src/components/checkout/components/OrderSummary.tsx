import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ selectedPlan, isLoading }) => {
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
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>
      
      {/* Plan Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">{mockPlan.name} Plan</h3>
            <p className="text-sm text-muted-foreground capitalize">
              Billed {mockPlan.billingCycle}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-foreground">${mockPlan.price}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>
        </div>
        
        {/* Features */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground mb-2">Included features:</p>
          <ul className="space-y-1">
            {mockPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-muted-foreground">
                <Icon name="Check" size={14} className="text-success mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="text-foreground">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;