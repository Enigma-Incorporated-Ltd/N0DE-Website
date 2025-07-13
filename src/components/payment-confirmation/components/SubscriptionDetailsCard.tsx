import React from 'react';
import Icon from '../../../components/AppIcon';

const SubscriptionDetailsCard = ({ subscription }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-subtle">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
        <Icon name="CreditCard" size={20} className="mr-2" />
        Subscription Details
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Plan</span>
          <div className="text-right">
            <div className="font-semibold text-foreground">{subscription.planName}</div>
            <div className="text-sm text-muted-foreground">{subscription.planDescription}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Billing Amount</span>
          <span className="font-semibold text-foreground">${subscription.amount}/month</span>
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Next Billing Date</span>
          <span className="font-semibold text-foreground">{subscription.nextBillingDate}</span>
        </div>
        
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">Status</span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
            <span className="font-semibold text-success">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetailsCard;