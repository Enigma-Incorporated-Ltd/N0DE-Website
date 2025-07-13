import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

type Notification = {
  id: string;
  type: 'billing' | 'feature' | 'support' | 'security' | 'system' | string;
  title: string;
  message: string;
  timestamp: string | number;
  isRead: boolean;
};

type NotificationCenterProps = {
  notifications?: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
};

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const [filter, setFilter] = useState<string>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'billing':
        return 'CreditCard';
      case 'feature':
        return 'Sparkles';
      case 'support':
        return 'MessageCircle';
      case 'security':
        return 'Shield';
      case 'system':
        return 'Settings';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    const baseColor = isRead ? 'opacity-60' : '';
    switch (type) {
      case 'billing':
        return `text-warning ${baseColor}`;
      case 'feature':
        return `text-primary ${baseColor}`;
      case 'support':
        return `text-accent ${baseColor}`;
      case 'security':
        return `text-destructive ${baseColor}`;
      case 'system':
        return `text-muted-foreground ${baseColor}`;
      default:
        return `text-muted-foreground ${baseColor}`;
    }
  };

  const formatTimestamp = (timestamp: string | number) => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return '';
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filterOptions: string[] = ['all', 'unread', 'billing', 'feature', 'support', 'security', 'system'];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
          >
            Mark all read
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 text-xs rounded-full transition-smooth ${
              filter === filterType
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-smooth cursor-pointer ${
                notification.isRead ? 'bg-muted/30' : 'bg-primary/5 hover:bg-primary/10'
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center bg-muted ${getNotificationColor(
                  notification.type,
                  notification.isRead
                )}`}
              >
                <Icon name={getNotificationIcon(notification.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p
                    className={`text-sm font-medium ${
                      notification.isRead ? 'text-muted-foreground' : 'text-foreground'
                    }`}
                  >
                    {notification.title}
                  </p>
                  {!notification.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTimestamp(notification.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
