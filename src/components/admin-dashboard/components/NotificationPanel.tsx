import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'payment_failed',
      title: 'Payment Failed',
      message: '3 payment failures in the last hour require attention',
      timestamp: '5 minutes ago',
      priority: 'high',
      count: 3,
      unread: true
    },
    {
      id: 2,
      type: 'cancellation',
      title: 'Subscription Cancellations',
      message: '2 users cancelled their subscriptions today',
      timestamp: '1 hour ago',
      priority: 'medium',
      count: 2,
      unread: true
    },
    {
      id: 3,
      type: 'support',
      title: 'High Priority Support Tickets',
      message: '5 urgent support tickets awaiting response',
      timestamp: '2 hours ago',
      priority: 'high',
      count: 5,
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update Available',
      message: 'New security update available for deployment',
      timestamp: '4 hours ago',
      priority: 'low',
      count: 1,
      unread: false
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment_failed': return 'CreditCard';
      case 'cancellation': return 'UserMinus';
      case 'support': return 'HelpCircle';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'muted';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-error text-error-foreground rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All Read
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border transition-smooth cursor-pointer ${
              notification.unread 
                ? 'border-primary/20 bg-primary/5' :'border-border hover:bg-muted/50'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-${getPriorityColor(notification.priority)}/10`}>
                <Icon 
                  name={getNotificationIcon(notification.type)} 
                  size={16} 
                  className={`text-${getPriorityColor(notification.priority)}`} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-medium ${notification.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    {notification.count > 1 && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${getPriorityColor(notification.priority)}/10 text-${getPriorityColor(notification.priority)}`}>
                        {notification.count}
                      </span>
                    )}
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                  
                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" fullWidth>
          View All Notifications
        </Button>
      </div>
    </div>
  );
};

export default NotificationPanel;