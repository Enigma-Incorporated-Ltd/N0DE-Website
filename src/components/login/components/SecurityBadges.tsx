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
    <div className="w-100 mx-auto mt-5" style={{ maxWidth: '64rem' }}>
      <div className="text-center mb-4">
        <h2 className="h5 fw-semibold text-dark mb-2">
          Your Security is Our Priority
        </h2>
        <p className="small text-muted">
          We use industry-standard security measures to protect your account
        </p>
      </div>

      <div className="row g-4 mb-5">
        {securityFeatures.map((feature, index) => (
          <div key={index} className="col-12 col-md-4">
            <div className="card h-100 border-1 shadow-sm text-center">
              <div className="card-body p-4">
                <div className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '3rem', height: '3rem' }}>
                  <Icon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="fw-medium text-dark mb-2 h6">
                  {feature.title}
                </h3>
                <p className="small text-muted mb-0">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="d-flex flex-wrap justify-content-center gap-4 pt-4 border-top">
        <div className="d-flex align-items-center">
          <Icon name="Shield" size={16} className="text-primary me-2" />
          <span className="small text-muted">SOC 2 Compliant</span>
        </div>
        <div className="d-flex align-items-center">
          <Icon name="Lock" size={16} className="text-primary me-2" />
          <span className="small text-muted">GDPR Ready</span>
        </div>
        <div className="d-flex align-items-center">
          <Icon name="CheckCircle" size={16} className="text-primary me-2" />
          <span className="small text-muted">99.9% Uptime</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;