import React from 'react';
import Icon from '../../../components/AppIcon';

type Activity = {
  id: string | number;
  type: 'payment' | 'plan_change' | 'support' | 'login' | 'invoice' | string;
  title: string;
  description: string;
  timestamp: string | number | Date;
  amount?: number;
};

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'payment':
        return 'CreditCard';
      case 'plan_change':
        return 'ArrowUpDown';
      case 'support':
        return 'MessageCircle';
      case 'login':
        return 'LogIn';
      case 'invoice':
        return 'Receipt';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'payment':
        return 'text-success bg-success/10';
      case 'plan_change':
        return 'text-primary bg-primary/10';
      case 'support':
        return 'text-warning bg-warning/10';
      case 'login':
        return 'text-muted-foreground bg-muted';
      case 'invoice':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimestamp = (timestamp: string | number | Date): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatTimestamp(activity.timestamp)}</p>
              </div>
              {activity.amount !== undefined && (
                <div className="text-sm font-medium text-foreground">
                  ${activity.amount.toFixed(2)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
