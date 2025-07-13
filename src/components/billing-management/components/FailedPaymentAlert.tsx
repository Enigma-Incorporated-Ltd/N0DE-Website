import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FailedPaymentAlert = ({ failedPayment, onRetry, onContactSupport, onDismiss }) => {
  if (!failedPayment) return null;

  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-destructive">Payment Failed</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className="text-destructive hover:text-destructive"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="text-sm text-destructive mb-3">
            Your payment of <strong>${failedPayment.amount}</strong> for {failedPayment.plan} plan failed on {failedPayment.date}.
            {failedPayment.reason && (
              <div className="mt-1">
                <strong>Reason:</strong> {failedPayment.reason}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="destructive"
              size="sm"
              onClick={onRetry}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Retry Payment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onContactSupport}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Contact Support
            </Button>
          </div>

          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <div className="text-xs text-muted-foreground">
              <Icon name="Shield" size={12} className="inline mr-1" />
              Your account remains active for {failedPayment.gracePeriod} days. 
              Please update your payment method to avoid service interruption.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedPaymentAlert;