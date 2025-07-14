import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

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
    const opacityClass = isRead ? 'opacity-50' : '';
    switch (type) {
      case 'billing':
        return `text-warning ${opacityClass}`;
      case 'feature':
        return `text-primary ${opacityClass}`;
      case 'support':
        return `text-info ${opacityClass}`;
      case 'security':
        return `text-danger ${opacityClass}`;
      case 'system':
        return `text-secondary ${opacityClass}`;
      default:
        return `text-secondary ${opacityClass}`;
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
    <div className="bg-dark border border-secondary rounded-3 p-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <h3 className="text-light h5 mb-0 me-2">Notifications</h3>
          {unreadCount > 0 && (
            <span className="badge bg-primary rounded-pill fs-6">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="btn btn-outline-light btn-sm d-flex align-items-center"
          >
            <Icon name="CheckCheck" size={14} className="me-1" />
            Mark all read
          </button>
        )}
      </div>

      <div className="d-flex flex-wrap gap-2 mb-3">
        {filterOptions.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`btn btn-sm rounded-pill ${
              filter === filterType
                ? 'btn-primary'
                : 'btn-outline-secondary'
            }`}
            style={{ fontSize: '0.75rem' }}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      <div className="position-relative" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-4">
            <Icon name="Bell" size={48} className="text-light opacity-50 mx-auto mb-3" />
            <p className="text-light opacity-75">No notifications</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`d-flex align-items-start p-3 rounded-2 ${
                  notification.isRead ? 'bg-secondary bg-opacity-10' : 'bg-primary bg-opacity-10'
                }`}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
                onClick={() => onMarkAsRead(notification.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = notification.isRead 
                    ? 'rgba(108, 117, 125, 0.1)' 
                    : 'rgba(13, 110, 253, 0.1)';
                }}
              >
                <div
                  className={`d-flex align-items-center justify-content-center me-3 rounded-2 ${getNotificationColor(
                    notification.type,
                    notification.isRead
                  )}`}
                  style={{ 
                    width: '32px', 
                    height: '32px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Icon name={getNotificationIcon(notification.type)} size={16} />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center mb-1">
                    <p
                      className={`mb-0 fw-medium ${
                        notification.isRead ? 'text-light opacity-50' : 'text-light'
                      }`}
                      style={{ fontSize: '0.875rem' }}
                    >
                      {notification.title}
                    </p>
                    {!notification.isRead && <div className="bg-primary rounded-circle ms-2" style={{ width: '8px', height: '8px' }} />}
                  </div>
                  <p className="text-light opacity-75 mb-1" style={{ fontSize: '0.8rem' }}>{notification.message}</p>
                  <p className="text-light opacity-50 mb-0" style={{ fontSize: '0.75rem' }}>
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
