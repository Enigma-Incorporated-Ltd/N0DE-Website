import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HelpSection = () => {
  const helpOptions = [
    {
      icon: 'HelpCircle',
      title: 'Need Help?',
      description: 'Get assistance with your account',
      action: 'Contact Support',
      link: '/support-center'
    },
    {
      icon: 'Book',
      title: 'Getting Started',
      description: 'Learn how to use SubscriptionFlow',
      action: 'View Guide',
      link: '/support-center'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: 'Start Chat',
      link: '/support-center'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="text-center mb-6">
          <Icon name="HelpCircle" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Need Assistance?
          </h3>
          <p className="text-sm text-muted-foreground">
            We're here to help you get back into your account
          </p>
        </div>

        <div className="space-y-4">
          {helpOptions.map((option, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={option.icon} size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {option.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {option.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link to={option.link}>
                      {option.action}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground mb-2">
            Emergency access issues?
          </p>
          <a
            href="mailto:support@subscriptionflow.com"
            className="text-xs text-primary hover:text-primary/80 transition-smooth"
          >
            support@subscriptionflow.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;