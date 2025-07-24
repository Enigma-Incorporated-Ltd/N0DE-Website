import React from 'react';

interface BillingToggleProps {
  billingCycle: string;
  onToggle: () => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ billingCycle, onToggle }) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
      <button
        className={`btn px-4 py-2 fw-medium ${
          billingCycle === 'monthly' 
            ? 'btn-primary' 
            : 'btn-outline-light'
        }`}
        onClick={billingCycle === 'yearly' ? onToggle : undefined}
        style={{ 
          borderRadius: '25px',
          fontSize: '14px'
        }}
      >
        Billed Monthly →
      </button>
      
      <button
        className={`btn px-4 py-2 fw-medium ${
          billingCycle === 'yearly' 
            ? 'btn-primary' 
            : 'btn-outline-light'
        }`}
        onClick={billingCycle === 'monthly' ? onToggle : undefined}
        style={{ 
          borderRadius: '25px',
          fontSize: '14px'
        }}
      >
        Billed Yearly →
      </button>
    </div>
  );
};

export default BillingToggle;