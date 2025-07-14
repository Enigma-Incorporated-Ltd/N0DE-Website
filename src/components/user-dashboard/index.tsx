// UserDashboard.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import SubscriptionCard from './components/SubscriptionCard';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import UsageMetrics from './components/UsageMetrics';
import NotificationCenter from './components/NotificationCenter';
import Icon from '../../components/AppIcon';

// ------------------- Types -------------------

export interface Subscription {
  id: string;
  plan: string;
  status: string;
  price: number;
  nextBillingDate: string;
  lastFourDigits: string;
  startDate: string;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

export interface UsageMetric {
  id: string;
  name: string;
  icon: string;
  used: number;
  limit: number | 'unlimited';
  description: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscription: Subscription;
  activities: Activity[];
  usageMetrics: UsageMetric[];
  notifications: Notification[];
}

// ------------------- Component -------------------

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const mockUserData: User = {
    id: 'user_123',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    subscription: {
      id: 'sub_456',
      plan: 'PRO',
      status: 'active',
      price: 29.99,
      nextBillingDate: '2025-08-11T00:00:00Z',
      lastFourDigits: '4242',
      startDate: '2024-08-11T00:00:00Z',
    },
    activities: [
      {
        id: 'act_1',
        type: 'payment',
        title: 'Payment Successful',
        description: 'Monthly subscription payment processed',
        timestamp: '2025-07-10T14:30:00Z',
        amount: 29.99,
      },
      {
        id: 'act_2',
        type: 'plan_change',
        title: 'Plan Upgraded',
        description: 'Upgraded from LITE to PRO plan',
        timestamp: '2025-07-08T10:15:00Z',
      },
      {
        id: 'act_3',
        type: 'support',
        title: 'Support Ticket Created',
        description: 'Question about billing cycle',
        timestamp: '2025-07-05T16:45:00Z',
      },
      {
        id: 'act_4',
        type: 'login',
        title: 'Account Login',
        description: 'Logged in from Chrome on Windows',
        timestamp: '2025-07-11T08:20:00Z',
      },
      {
        id: 'act_5',
        type: 'invoice',
        title: 'Invoice Generated',
        description: 'July 2025 invoice available for download',
        timestamp: '2025-07-01T00:00:00Z',
        amount: 29.99,
      },
    ],
    usageMetrics: [
      {
        id: 'api_calls',
        name: 'API Calls',
        icon: 'Zap',
        used: 8750,
        limit: 10000,
        description: 'Monthly API request limit',
      },
      {
        id: 'storage',
        name: 'Storage',
        icon: 'HardDrive',
        used: 2.4,
        limit: 10,
        description: 'GB of file storage used',
      },
      {
        id: 'users',
        name: 'Team Members',
        icon: 'Users',
        used: 3,
        limit: 5,
        description: 'Active team member seats',
      },
      {
        id: 'projects',
        name: 'Projects',
        icon: 'Folder',
        used: 12,
        limit: 'unlimited',
        description: 'Active projects created',
      },
    ],
    notifications: [
      {
        id: 'notif_1',
        type: 'billing',
        title: 'Payment Due Soon',
        message: 'Your next payment of $29.99 is due in 3 days',
        timestamp: '2025-07-11T12:00:00Z',
        isRead: false,
      },
      {
        id: 'notif_2',
        type: 'feature',
        title: 'New Feature Available',
        message: 'Advanced analytics dashboard is now live',
        timestamp: '2025-07-10T09:30:00Z',
        isRead: false,
      },
      {
        id: 'notif_3',
        type: 'support',
        title: 'Support Ticket Updated',
        message: 'Your billing question has been answered',
        timestamp: '2025-07-09T14:15:00Z',
        isRead: true,
      },
      {
        id: 'notif_4',
        type: 'security',
        title: 'Security Alert',
        message: 'New login detected from Chrome on Windows',
        timestamp: '2025-07-11T08:20:00Z',
        isRead: true,
      },
      {
        id: 'notif_5',
        type: 'system',
        title: 'Maintenance Complete',
        message: 'Scheduled maintenance completed successfully',
        timestamp: '2025-07-08T02:00:00Z',
        isRead: true,
      },
    ],
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCurrentUser(mockUserData);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleChangePlan = () => navigate('/plan-selection');
  const handleUpdatePayment = () => navigate('/billing-management');
  const handleViewBilling = () => navigate('/billing-management');
  const handleContactSupport = () => navigate('/support-center');
  const handleDownloadInvoice = () => console.log('Downloading latest invoice...');
  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      console.log('Subscription cancelled');
    }
  };

  const handleMarkAsRead = (notificationId: string) => {
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            notifications: prev.notifications.map((notif) =>
              notif.id === notificationId ? { ...notif, isRead: true } : notif
            ),
          }
        : prev
    );
  };

  const handleMarkAllAsRead = () => {
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            notifications: prev.notifications.map((notif) => ({ ...notif, isRead: true })),
          }
        : prev
    );
  };

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark">
          <HeaderDashboard />
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                    <p className="text-light">Loading your dashboard...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (!currentUser) {
    return (
      <Wrapper>
        <div className="bg-dark">
          <HeaderDashboard />
          <div className="section-space-md-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="text-center">
                    <Icon name="AlertCircle" size={48} className="text-danger mx-auto mb-4" />
                    <p className="text-light fw-medium mb-2">Unable to load dashboard</p>
                    <p className="text-light">Please try refreshing the page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="bg-dark">
        <HeaderDashboard />
        
        {/* Dashboard Header Section */}
        <div className="section-space-md-y">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">Dashboard</span>
                  </div>
                  <h1 className="text-light mb-0" data-cue="fadeIn">
                    Welcome back, <span className="text-gradient-primary">{currentUser.name}</span>
                  </h1>
                  <p className="text-light mb-0" data-cue="fadeIn">
                    Here's an overview of your subscription and account activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="section-space-sm-y">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                <SubscriptionCard
                  subscription={currentUser.subscription}
                  onChangePlan={handleChangePlan}
                  onUpdatePayment={handleUpdatePayment}
                  onCancelSubscription={handleCancelSubscription}
                />
              </div>
              <div className="col-lg-4">
                <QuickActions
                  onViewBilling={handleViewBilling}
                  onContactSupport={handleContactSupport}
                  onDownloadInvoice={handleDownloadInvoice}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Usage Metrics Section */}
        <div className="section-space-sm-y">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <UsageMetrics
                  metrics={currentUser.usageMetrics}
                  planLimits={currentUser.usageMetrics.reduce((acc, metric) => {
                    acc[metric.id] = metric.limit;
                    return acc;
                  }, {} as Record<string, number | 'unlimited'>)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications and Activity Section */}
        <div className="section-space-sm-y">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6">
                <NotificationCenter
                  notifications={currentUser.notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                />
              </div>
              <div className="col-lg-6">
                <ActivityFeed activities={currentUser.activities} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserDashboard;
