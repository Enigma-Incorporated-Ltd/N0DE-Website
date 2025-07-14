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
        return 'text-success';
      case 'plan_change':
        return 'text-primary';
      case 'support':
        return 'text-warning';
      case 'login':
        return 'text-secondary';
      case 'invoice':
        return 'text-info';
      default:
        return 'text-secondary';
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
    <div className="bg-dark border border-secondary rounded-3 p-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <h3 className="text-light h5 mb-3">Recent Activity</h3>
      <div className="d-flex flex-column gap-3">
        {activities.length === 0 ? (
          <div className="text-center py-4">
            <Icon name="Activity" size={48} className="text-light opacity-50 mx-auto mb-3" />
            <p className="text-light opacity-75">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="d-flex align-items-start">
              <div className={`d-flex align-items-center justify-content-center me-3 rounded-2 ${getActivityColor(activity.type)}`} style={{ width: '32px', height: '32px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <Icon name={getActivityIcon(activity.type)} size={16} />
              </div>
              <div className="flex-grow-1">
                <p className="text-light fw-medium mb-1" style={{ fontSize: '0.875rem' }}>{activity.title}</p>
                <p className="text-light opacity-75 mb-1" style={{ fontSize: '0.8rem' }}>{activity.description}</p>
                <p className="text-light opacity-50 mb-0" style={{ fontSize: '0.75rem' }}>{formatTimestamp(activity.timestamp)}</p>
              </div>
              {activity.amount !== undefined && (
                <div className="text-light fw-medium" style={{ fontSize: '0.875rem' }}>
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
