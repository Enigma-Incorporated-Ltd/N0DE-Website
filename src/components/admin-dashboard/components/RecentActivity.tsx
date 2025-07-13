import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'signup',
      user: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      action: 'New user registration',
      plan: 'PRO',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'upgrade',
      user: 'Michael Chen',
      email: 'michael.chen@email.com',
      action: 'Upgraded to MAX plan',
      plan: 'MAX',
      timestamp: '15 minutes ago',
      icon: 'ArrowUp',
      color: 'primary'
    },
    {
      id: 3,
      type: 'cancellation',
      user: 'Emma Davis',
      email: 'emma.davis@email.com',
      action: 'Subscription cancelled',
      plan: 'LITE',
      timestamp: '1 hour ago',
      icon: 'UserMinus',
      color: 'error'
    },
    {
      id: 4,
      type: 'payment_failed',
      user: 'David Wilson',
      email: 'david.wilson@email.com',
      action: 'Payment failed - retry scheduled',
      plan: 'PRO',
      timestamp: '2 hours ago',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 5,
      type: 'support',
      user: 'Lisa Anderson',
      email: 'lisa.anderson@email.com',
      action: 'Support ticket submitted',
      plan: 'MAX',
      timestamp: '3 hours ago',
      icon: 'HelpCircle',
      color: 'secondary'
    }
  ];

  const getPlanBadgeColor = (plan) => {
    switch (plan) {
      case 'LITE': return 'bg-secondary/10 text-secondary';
      case 'PRO': return 'bg-primary/10 text-primary';
      case 'MAX': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <div className={`p-2 rounded-full bg-${activity.color}/10`}>
              <Icon name={activity.icon} size={16} className={`text-${activity.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {activity.user}
                </p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPlanBadgeColor(activity.plan)}`}>
                  {activity.plan}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.email}</p>
            </div>
            
            <div className="text-xs text-muted-foreground whitespace-nowrap">
              {activity.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;