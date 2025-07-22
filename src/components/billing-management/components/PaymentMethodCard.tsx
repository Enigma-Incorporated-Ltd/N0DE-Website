import React from 'react';
import Icon from '../../../components/AppIcon';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
  metadata?: {
    isDefault?: string | boolean;
  };
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ paymentMethod }) => {
  const getCardIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  // Check if this payment method is the default one
  const isDefault = paymentMethod.metadata?.isDefault === true || paymentMethod.metadata?.isDefault === 'true';

  return (
    <div className="card-gl-dark rounded-4 p-4" data-cue="fadeIn">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="text-light fw-semibold mb-0">Payment Method</h3>
      </div>

      <div className="d-flex align-items-center gap-4">
        <div className="d-flex align-items-center justify-content-center bg-primary-gradient rounded-2" style={{ width: '48px', height: '32px' }}>
          <Icon name={getCardIcon(paymentMethod.brand)} size={20} className="text-white" />
        </div>
        
        <div className="flex-fill">
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="text-light fw-medium">
              •••• •••• •••• {paymentMethod.last4}
            </span>
            <span className="badge bg-secondary text-uppercase fs-12">
              {paymentMethod.brand}
            </span>
          </div>
          <div className="text-light-50 fs-14">
            Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
          </div>
        </div>

        {isDefault && (
          <div className="d-flex align-items-center gap-2">
            <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
            <span className="text-success fw-medium fs-14">Active</span>
          </div>
        )}
      </div>

      <div className="card-gl-light rounded-3 p-3 mt-4">
        <div className="d-flex align-items-center gap-2 text-light-50 fs-14">
          <Icon name="Shield" size={16} />
          <span>Secured by Stripe • Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;