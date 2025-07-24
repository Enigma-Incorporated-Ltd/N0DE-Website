import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      title: 'User & Plan Management',
      description: 'View and manage all users and plans',
      icon: 'Users',
      href: '/admin/user-management',
      color: 'primary'
    },
    {
      title: 'Transaction Reports',
      description: 'Download payment reports',
      icon: 'FileText',
      action: 'download',
      color: 'accent'
    },
    {
      title: 'System Settings',
      description: 'Configure application settings',
      icon: 'Settings',
      action: 'settings',
      color: 'secondary'
    },
    {
      title: 'Export Data',
      description: 'Export user and subscription data',
      icon: 'Download',
      action: 'export',
      color: 'warning'
    }
  ];

  const handleAction = (actionType?: string) => {
    switch (actionType) {
      case 'download':
        // Mock download functionality
        console.log('Downloading transaction reports...');
        break;
      case 'settings': console.log('Opening system settings...');
        break;
      case 'export':
        console.log('Exporting data...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <div key={index} className="group">
            {action.href ? (
              <Link
                to={action.href}
                className="flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth"
              >
                <div className={`p-3 rounded-lg bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-smooth`}>
                  <Icon name={action.icon} size={20} className={`text-${action.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
              </Link>
            ) : (
              <button
                onClick={() => handleAction(action.action)}
                className="w-full flex items-center space-x-4 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-smooth text-left"
              >
                <div className={`p-3 rounded-lg bg-${action.color}/10 group-hover:bg-${action.color}/20 transition-smooth`}>
                  <Icon name={action.icon} size={20} className={`text-${action.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                    {action.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;