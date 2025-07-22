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
  isProcessing: boolean;
  isDefault: boolean;
  selected: boolean;
  onSelect: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  paymentMethod,
  isProcessing,
  isDefault,
  selected,
  onSelect,
}) => {
  const getCardIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
      case 'mastercard':
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  // Dynamic background color for card brand
  const getBrandBgStyle = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return { background: 'linear-gradient(90deg, #1a2980 0%, #26d0ce 100%)' };
      case 'mastercard':
        return { background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)' };
      case 'amex':
        return { background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' };
      default:
        return { background: 'linear-gradient(90deg, #434343 0%, #262626 100%)' };
    }
  };

  return (
    <div
      className={`card-gl-dark rounded-4 p-4 position-relative transition-all d-flex align-items-center ${selected ? 'border border-primary shadow' : isDefault ? 'border border-success' : 'border border-transparent'}`}
      data-cue="fadeIn"
      style={{ cursor: isProcessing ? 'wait' : 'pointer', minHeight: 80 }}
      onClick={() => !isProcessing && onSelect()}
    >
      <div className="form-check me-3">
        <input
          type="radio"
          className="form-check-input bg-dark border-light-50"
          name="defaultPaymentMethod"
          id={`pm-radio-${paymentMethod.id}`}
          checked={selected}
          onChange={onSelect}
          disabled={isProcessing}
          style={{ width: '1.2em', height: '1.2em' }}
          onClick={e => e.stopPropagation()}
        />
      </div>
      <div className="d-flex align-items-center justify-content-center rounded-2" style={{ width: '48px', height: '32px', ...getBrandBgStyle(paymentMethod.brand) }}>
        <Icon name={getCardIcon(paymentMethod.brand)} size={20} className="text-white" />
      </div>
      <div className="flex-fill ms-3">
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="text-light fw-medium">
            •••• •••• •••• {paymentMethod.last4}
          </span>
          <span className="badge text-uppercase fs-12" style={{
            color: '#fff',
            background: (() => {
              switch (paymentMethod.brand?.toLowerCase()) {
                case 'visa':
                  return 'linear-gradient(90deg, #1a2980 0%, #26d0ce 100%)';
                case 'mastercard':
                  return 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)';
                case 'amex':
                  return 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)';
                default:
                  return 'linear-gradient(90deg, #434343 0%, #262626 100%)';
              }
            })(),
            border: 'none',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            padding: '0.25em 0.75em',
            fontWeight: 600,
            letterSpacing: '1px',
          }}>
            {paymentMethod.brand}
          </span>
        </div>
        <div className="text-light-50 fs-14">
          Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
        </div>
      </div>
      <div className="ms-auto">
        {isDefault && (
          <span className="badge bg-success text-light fs-14 px-3 py-2">Default</span>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodCard;