import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlanCard = ({ plan, isPopular, billingCycle, onSelectPlan, isSelected }) => {
  const getPrice = () => {
    return billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = () => {
    if (billingCycle === 'annual') {
      const monthlyCost = plan.monthlyPrice * 12;
      const annualCost = plan.annualPrice;
      const savings = monthlyCost - annualCost;
      return Math.round((savings / monthlyCost) * 100);
    }
    return 0;
  };

  return (
    <div className={`
      relative bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-elevated
      ${isPopular ? 'border-primary shadow-subtle scale-105' : 'border-border'}
      ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
    `}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      {billingCycle === 'annual' && getSavings() > 0 && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
            Save {getSavings()}%
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">${getPrice()}</span>
          <span className="text-muted-foreground ml-1">
            /{billingCycle === 'annual' ? 'year' : 'month'}
          </span>
        </div>
        {billingCycle === 'annual' && (
          <p className="text-sm text-muted-foreground">
            ${(plan.annualPrice / 12).toFixed(2)} per month, billed annually
          </p>
        )}
        <p className="text-muted-foreground mt-2">{plan.description}</p>
      </div>

      <div className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon 
              name={feature.included ? "Check" : "X"} 
              size={16} 
              className={feature.included ? "text-success mt-0.5" : "text-muted-foreground mt-0.5"} 
            />
            <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant={isPopular ? "default" : "outline"}
        fullWidth
        onClick={() => onSelectPlan(plan)}
        className="relative"
      >
        {isSelected && (
          <Icon name="Check" size={16} className="mr-2" />
        )}
        Select {plan.name}
      </Button>

      {plan.guarantee && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          {plan.guarantee}
        </p>
      )}
    </div>
  );
};

export default PlanCard;