import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface FailedPayment {
  amount: string;
  plan: string;
  date: string;
  reason: string;
  gracePeriod: string;
}

interface FailedPaymentAlertProps {
  failedPayment: FailedPayment | null;
  onRetry: () => void;
  onContactSupport: () => void;
  onDismiss: () => void;
}

const FailedPaymentAlert: React.FC<FailedPaymentAlertProps> = ({ failedPayment, onRetry, onContactSupport, onDismiss }) => {
  if (!failedPayment) return null;

  return (
    <div className="alert alert-danger bg-danger-subtle border-danger rounded-4 p-4 mb-4" data-cue="fadeIn">
      <div className="d-flex align-items-start gap-3">
        <Icon name="AlertTriangle" size={20} className="text-danger" style={{ marginTop: '2px' }} />
        <div className="flex-fill">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h4 className="text-danger fw-medium mb-0">Payment Failed</h4>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={onDismiss}
              style={{ padding: '4px 8px' }}
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="text-danger fs-14 mb-3">
            Your payment of <strong>${failedPayment.amount}</strong> for {failedPayment.plan} plan failed on {failedPayment.date}.
            {failedPayment.reason && (
              <div className="mt-1">
                <strong>Reason:</strong> {failedPayment.reason}
              </div>
            )}
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <button
              className="btn btn-danger btn-sm d-flex align-items-center gap-2"
              onClick={onRetry}
            >
              <Icon name="RefreshCw" size={14} />
              <span>Retry Payment</span>
            </button>
            <button
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
              onClick={onContactSupport}
            >
              <Icon name="MessageCircle" size={14} />
              <span>Contact Support</span>
            </button>
          </div>

          <div className="card-gl-light rounded-3 p-3">
            <div className="text-light-50 fs-12 d-flex align-items-center gap-2">
              <Icon name="Shield" size={12} />
              <span>
                Your account remains active for {failedPayment.gracePeriod} days. 
                Please update your payment method to avoid service interruption.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedPaymentAlert;