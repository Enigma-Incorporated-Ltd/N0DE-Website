import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BillingCycleCard = ({ billingInfo, onToggleAutoRenewal, onChangePlan }) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleAutoRenewal = async () => {
    setIsToggling(true);
    // Simulate API call
    setTimeout(() => {
      setIsToggling(false);
      onToggleAutoRenewal(!billingInfo.autoRenewal);
    }, 1500);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Billing Cycle</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onChangePlan}
          iconName="ArrowUpDown"
          iconPosition="left"
        >
          Change Plan
        </Button>
      </div>

      <div className="space-y-4">
        {/* Current Plan */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <div className="font-medium text-foreground">{billingInfo.currentPlan}</div>
              <div className="text-sm text-muted-foreground">{billingInfo.planDescription}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-foreground">${billingInfo.monthlyAmount}</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
        </div>

        {/* Next Billing Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={20} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium text-foreground">Next Billing Date</div>
              <div className="text-sm text-muted-foreground">{formatDate(billingInfo.nextBillingDate)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium text-foreground">${billingInfo.nextAmount}</div>
            <div className="text-xs text-muted-foreground">Amount due</div>
          </div>
        </div>

        {/* Auto Renewal Toggle */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="RotateCcw" size={20} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium text-foreground">Auto-Renewal</div>
              <div className="text-sm text-muted-foreground">
                {billingInfo.autoRenewal ? 'Automatically renew subscription' : 'Manual renewal required'}
              </div>
            </div>
          </div>
          <Button
            variant={billingInfo.autoRenewal ? "default" : "outline"}
            size="sm"
            onClick={handleToggleAutoRenewal}
            loading={isToggling}
            iconName={billingInfo.autoRenewal ? "ToggleRight" : "ToggleLeft"}
            iconPosition="left"
          >
            {billingInfo.autoRenewal ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Billing Cycle Information */}
        <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-accent mt-0.5" />
            <div className="text-sm text-accent">
              <div className="font-medium mb-1">Billing Cycle Information</div>
              <div>
                Your subscription renews on the {new Date(billingInfo.nextBillingDate).getDate()}
                {new Date(billingInfo.nextBillingDate).getDate() === 1 ? 'st' : 
                  new Date(billingInfo.nextBillingDate).getDate() === 2 ? 'nd' : 
                  new Date(billingInfo.nextBillingDate).getDate() === 3 ? 'rd' : 'th'} of each month.
                You can cancel anytime before your next billing date.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingCycleCard;