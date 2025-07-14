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
    <div className="w-100 mx-auto" style={{ maxWidth: '28rem' }}>
      <div className="bg-dark-gradient rounded-5 p-6" data-cue="fadeIn">
        <div className="text-center mb-8">
          <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
            <Icon name="HelpCircle" size={28} className="text-light" />
          </div>
          <h3 className="h4 fw-semibold text-light mb-2">
            Need Assistance?
          </h3>
          <p className="text-light text-opacity-75">
            We're here to help you get back into your account
          </p>
        </div>

        <div className="d-grid gap-4 mb-8">
          {helpOptions.map((option, index) => (
            <div
              key={index}
              className="bg-dark rounded-4 p-4 hover:bg-opacity-50 transition-all"
              style={{ transition: 'all 0.3s ease' }}
            >
              <div className="d-flex align-items-start">
                <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-4 flex-shrink-0" style={{ width: '3rem', height: '3rem' }}>
                  <Icon name={option.icon} size={20} className="text-light" />
                </div>
                <div className="flex-fill">
                  <h4 className="fw-medium text-light mb-2">
                    {option.title}
                  </h4>
                  <p className="text-light text-opacity-75 mb-4">
                    {option.description}
                  </p>
                  <Button
                    variant="outline"
                    className="btn-outline-light text-light border-light border-opacity-10 rounded-pill py-2 hover:bg-primary-gradient hover:border-0"
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
        <div className="text-center pt-4 border-top border-light border-opacity-10">
          <p className="text-light text-opacity-75 mb-2">
            Emergency access issues?
          </p>
          <a
            href="mailto:support@n0de.gg"
            className="text-gradient-primary text-decoration-none fw-medium"
          >
            support@n0de.gg
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;