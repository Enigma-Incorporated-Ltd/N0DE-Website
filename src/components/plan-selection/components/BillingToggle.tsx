import React from 'react';

const BillingToggle = ({ billingCycle, onToggle }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
        Monthly
      </span>
      
      <button
        onClick={onToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          ${billingCycle === 'annual' ? 'bg-primary' : 'bg-muted'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
            ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>
          Annual
        </span>
        <span className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
          Save up to 25%
        </span>
      </div>
    </div>
  );
};

export default BillingToggle;