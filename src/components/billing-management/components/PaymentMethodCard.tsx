import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodCard = ({ paymentMethod, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      onUpdate();
    }, 2000);
  };

  const getCardIcon = (brand) => {
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
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Payment Method</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpdate}
          loading={isUpdating}
          iconName="Edit"
          iconPosition="left"
        >
          Update
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
          <Icon name={getCardIcon(paymentMethod.brand)} size={20} className="text-muted-foreground" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-foreground font-medium">
              •••• •••• •••• {paymentMethod.last4}
            </span>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded uppercase">
              {paymentMethod.brand}
            </span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Expires {paymentMethod.expMonth}/{paymentMethod.expYear}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-sm text-success font-medium">Active</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Secured by Stripe • Your payment information is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;