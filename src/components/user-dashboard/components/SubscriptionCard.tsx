import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type Subscription = {
  plan: 'LITE' | 'PRO' | 'MAX' | string;
  price: number;
  status: 'active' | 'cancelled' | 'past_due' | string;
  nextBillingDate: string;
  lastFourDigits: string;
};

type Props = {
  subscription: Subscription;
  onChangePlan: () => void;
  onUpdatePayment: () => void;
  onCancelSubscription: () => void;
};

const SubscriptionCard: React.FC<Props> = ({
  subscription,
  onChangePlan,
  onUpdatePayment,
  onCancelSubscription
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'cancelled':
        return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'past_due':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'LITE':
        return 'Zap';
      case 'PRO':
        return 'Star';
      case 'MAX':
        return 'Crown';
      default:
        return 'Package';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={getPlanIcon(subscription.plan)} size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{subscription.plan} Plan</h2>
            <p className="text-muted-foreground">${subscription.price}/month</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            subscription.status
          )}`}
        >
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Next Billing</span>
          </div>
          <p className="text-foreground font-medium">{formatDate(subscription.nextBillingDate)}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="CreditCard" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Payment Method</span>
          </div>
          <p className="text-foreground font-medium">•••• •••• •••• {subscription.lastFourDigits}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={onChangePlan}
          iconName="ArrowUpDown"
          iconPosition="left"
          className="flex-1"
        >
          Change Plan
        </Button>
        <Button
          variant="outline"
          onClick={onUpdatePayment}
          iconName="CreditCard"
          iconPosition="left"
          className="flex-1"
        >
          Update Payment
        </Button>
        <Button
          variant="destructive"
          onClick={onCancelSubscription}
          iconName="X"
          iconPosition="left"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
