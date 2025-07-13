import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Multi-factor authentication available'
    },
    {
      icon: 'CheckCircle',
      title: 'Trusted Platform',
      description: 'Used by thousands of businesses worldwide'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Your Security is Our Priority
        </h2>
        <p className="text-sm text-muted-foreground">
          We use industry-standard security measures to protect your account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {securityFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-subtle transition-smooth"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name={feature.icon} size={24} className="text-accent" />
            </div>
            <h3 className="font-medium text-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-8 mt-8 pt-8 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-accent" />
          <span>SOC 2 Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Lock" size={16} className="text-accent" />
          <span>GDPR Ready</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="CheckCircle" size={16} className="text-accent" />
          <span>99.9% Uptime</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;