import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: string;
  expYear: string;
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
  onUpdate: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ paymentMethod, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      onUpdate();
    }, 2000);
  };

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

  return (
    <div className="card-gl-dark rounded-4 p-4" data-cue="fadeIn">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="text-light fw-semibold mb-0">Payment Method</h3>
        <button
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
          onClick={handleUpdate}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <Icon name="Loader2" size={14} style={{ animation: 'spin 1s linear infinite' }} />
          ) : (
            <Icon name="Edit" size={14} />
          )}
          <span>Update</span>
        </button>
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

        <div className="d-flex align-items-center gap-2">
          <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
          <span className="text-success fw-medium fs-14">Active</span>
        </div>
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