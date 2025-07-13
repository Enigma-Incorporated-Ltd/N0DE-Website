import React from 'react';
import Icon from '../../../components/AppIcon';

const SuccessHeader = ({ confirmationNumber }) => {
  return (
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-subtle">
        <Icon name="CheckCircle" size={40} color="white" />
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-muted-foreground mb-2">
        Your subscription has been activated
      </p>
      <p className="text-sm text-muted-foreground">
        Confirmation #: <span className="font-mono font-medium text-foreground">{confirmationNumber}</span>
      </p>
    </div>
  );
};

export default SuccessHeader;