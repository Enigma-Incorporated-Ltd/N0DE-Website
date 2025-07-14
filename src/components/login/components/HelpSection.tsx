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
      description: 'Learn how to use N0de',
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
    <div className="w-100 mx-auto mt-4" style={{ maxWidth: '28rem' }}>
      <div className="bg-light rounded-3 p-4">
        <div className="text-center mb-4">
          <Icon name="HelpCircle" size={32} className="text-primary mb-3" />
          <h3 className="h5 fw-semibold text-dark mb-2">
            Need Assistance?
          </h3>
          <p className="small text-muted">
            We're here to help you get back into your account
          </p>
        </div>

        <div className="d-grid gap-3 mb-4">
          {helpOptions.map((option, index) => (
            <div
              key={index}
              className="card border-1 shadow-sm"
              style={{ transition: 'box-shadow 0.3s ease' }}
            >
              <div className="card-body p-3">
                <div className="d-flex align-items-start">
                  <div className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '2rem', height: '2rem' }}>
                    <Icon name={option.icon} size={16} className="text-primary" />
                  </div>
                  <div className="flex-fill">
                    <h4 className="fw-medium text-dark small mb-1">
                      {option.title}
                    </h4>
                    <p className="text-muted mb-3" style={{ fontSize: '0.75rem' }}>
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
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="text-center pt-3 border-top">
          <p className="text-muted mb-2" style={{ fontSize: '0.75rem' }}>
            Emergency access issues?
          </p>
          <a
            href="mailto:support@n0de.gg"
            className="text-primary text-decoration-none"
            style={{ fontSize: '0.75rem' }}
          >
            support@n0de.gg
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;