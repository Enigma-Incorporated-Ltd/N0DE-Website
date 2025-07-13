import React from 'react';
import Icon from '../../../components/AppIcon';

const AccountSetupInstructions = () => {
  const setupSteps = [
    {
      icon: 'User',
      title: 'Complete Your Profile',
      description: 'Add your personal information and preferences to get started'
    },
    {
      icon: 'Settings',
      title: 'Customize Your Experience',
      description: 'Configure your account settings and notification preferences'
    },
    {
      icon: 'Zap',
      title: 'Explore Features',
      description: 'Discover all the powerful tools available in your subscription plan'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Rocket" size={20} className="mr-2" />
        Get Started with Your Account
      </h3>
      
      <div className="space-y-4">
        {setupSteps.map((step, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name={step.icon} size={16} color="var(--color-primary)" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSetupInstructions;