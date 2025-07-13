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
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            onClick={action.onClick}
            className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') action.onClick();
            }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={action.icon} size={16} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground">{action.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
