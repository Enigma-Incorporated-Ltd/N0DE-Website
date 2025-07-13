import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustReinforcement = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure Payment',
      description: 'Your payment information is protected with bank-level security'
    },
    {
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Our customer support team is available whenever you need help'
    },
    {
      icon: 'RefreshCw',
      title: 'Easy Management',
      description: 'Cancel or modify your subscription anytime from your dashboard'
    }
  ];

  return (
    <div className="bg-success/5 border border-success/20 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        You're in Good Hands
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name={feature.icon} size={20} color="var(--color-success)" />
            </div>
            <h4 className="font-medium text-foreground mb-1">{feature.title}</h4>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustReinforcement;