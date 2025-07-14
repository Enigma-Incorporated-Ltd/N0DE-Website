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
    <div className="w-100 mx-auto" style={{ maxWidth: '64rem' }}>
      <div className="text-center mb-8" data-cue="fadeIn">
        <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-4">
          <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
          <span className="d-block fw-medium text-light fs-20">Security First</span>
        </div>
        <h2 className="text-light mb-2">
          Your Security is Our Priority
        </h2>
        <p className="text-light text-opacity-75">
          We use industry-standard security measures to protect your account
        </p>
      </div>

      <div className="row g-4 mb-8" data-cues="fadeIn">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="bg-dark-gradient rounded-5 p-6 text-center h-100">
              <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '4rem', height: '4rem' }}>
                <Icon name={feature.icon} size={28} className="text-light" />
              </div>
              <h3 className="fw-medium text-light mb-3 h5">
                {feature.title}
              </h3>
              <p className="text-light text-opacity-75 mb-0">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="d-flex flex-wrap justify-content-center gap-6 pt-6 border-top border-light border-opacity-10" data-cue="fadeIn">
        <div className="d-flex align-items-center">
          <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
            <Icon name="Shield" size={18} className="text-light" />
          </div>
          <span className="text-light text-opacity-75">SOC 2 Compliant</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
            <Icon name="Lock" size={18} className="text-light" />
          </div>
          <span className="text-light text-opacity-75">GDPR Ready</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="bg-primary-gradient rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '2.5rem', height: '2.5rem' }}>
            <Icon name="CheckCircle" size={18} className="text-light" />
          </div>
          <span className="text-light text-opacity-75">
            <span className="fw-medium">99.9</span>
            <span className="small">% Uptime</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;