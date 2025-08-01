import React from 'react';
import Icon from '../../../components/AppIcon';

interface QuickActionsProps {
  onViewBilling: () => void;
  onContactSupport: () => void;
  onDownloadInvoice: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onViewBilling,
  onContactSupport,
  onDownloadInvoice
}) => {
  const actions = [
    {
      id: 'billing',
      title: 'View Billing',
      description: 'Manage payments and invoices',
      icon: 'Receipt',
      onClick: onViewBilling
    },
    {
      id: 'support',
      title: 'Contact Support',
      description: 'Get help with your account',
      icon: 'MessageCircle',
      onClick: onContactSupport
    },
    {
      id: 'invoice',
      title: 'Download Invoice',
      description: 'Get your latest invoice',
      icon: 'Download',
      onClick: onDownloadInvoice
    }
  ];

  return (
    <div className="bg-dark border border-secondary rounded-3 p-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <h3 className="text-light h5 mb-3">Quick Actions</h3>
      <div className="row g-3">
        {actions.map((action) => (
          <div key={action.id} className="col-12">
            <div
              onClick={action.onClick}
              className="p-3 border border-secondary rounded-2 position-relative"
              style={{ 
                cursor: 'pointer', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                transition: 'all 0.2s ease-in-out'
              }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') action.onClick();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex align-items-center justify-content-center me-3 rounded-2 bg-primary-gradient" style={{ width: '32px', height: '32px' }}>
                  <Icon name={action.icon} size={16} className="text-white" />
                </div>
                <h4 className="text-light fw-medium mb-0">{action.title}</h4>
              </div>
              <p className="text-light opacity-75 mb-0 fs-6">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
