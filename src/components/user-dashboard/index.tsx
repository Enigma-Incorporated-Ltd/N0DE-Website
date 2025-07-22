// UserDashboard.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import SubscriptionCard from './components/SubscriptionCard';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import AccountService from '../../services/Account';
import NodeService from '../../services/Node';

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
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<user | null>(null);
  
    const fetchUserData = async () => {
      try {
        const currentUser = AccountService.getCurrentUser();
console.log("Current user:", currentUser);

const userId = currentUser?.id;

        //const response = await NodeService.getUserDetails(userId);
          const response = await NodeService.getUserDetails('AFB7F2BC-5D88-468F-8B3D-5874855ADF85');
  console.log("Raw response from getUserPlanDetails:", response);
  if (!response || !response) throw new Error('Invalid user plan data');
        setUser(response);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);
  

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
        
        // Get userId from navigation state (passed from login) or from storage
        const userIdFromState = location.state?.userId;
        const userIdFromStorage = AccountService.getCurrentUserId();
        const userId = userIdFromState || userIdFromStorage;
        console.log('UserDashboard: userId from navigation state:', userIdFromState, 'from storage:', userIdFromStorage, 'final userId:', userId);
        
        // Update mock data with real userId if available
        const userData = userId 
          ? { ...mockUserData, id: userId }
          : mockUserData;
        
        setCurrentUser(userData);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [location.state]);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!currentUser) return;
      setInvoiceLoading(true);
      try {
        const invoices = await NodeService.getUserInvoiceHistory(currentUser.id);
        setLatestInvoices((invoices || []).slice(0, 4));
      } catch {
        setLatestInvoices([]);
      }
      setInvoiceLoading(false);
    };
    fetchInvoices();
  }, [currentUser]);

  const handleChangePlan = () => navigate('/plan-selection');
  const handleUpdatePayment = () => {
    if (currentUser) {
      navigate('/billing-management', { state: { userId: currentUser.id } });
    }
  };
  const handleViewBilling = () => navigate('/billing-management');
  const handleContactSupport = () => {
    if (currentUser) {
      // Always use currentUser.id (which now has the real userId from login)
      const userId = currentUser.id;
      console.log('UserDashboard: Navigating to support center with userId:', userId);
      navigate('/support-center', {
        state: {
          userId
        }
      });
    } else {
      console.error('UserDashboard: No currentUser available for support navigation');
    }
  };

 
  const handleDownloadInvoice = () => {
    if (currentUser) {
      // Always use currentUser.id (which now has the real userId from login)
      const userId = currentUser.id;
      console.log('UserDashboard: Navigating to invoice with userId:', userId);
      navigate('/invoice', {
        state: {
          userId
        }
      });
    } else {
      console.error('UserDashboard: No currentUser available for invoice navigation');
    }
  };
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

  const handleShowInvoiceDetails = () => {
    if (currentUser) {
      navigate('/invoice', { state: { userId: currentUser.id } });
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark min-vh-100 user-dashboard-dark" style={{ backgroundColor: '#0a0a0a' }}>
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
        <div className="bg-dark min-vh-100 user-dashboard-dark" style={{ backgroundColor: '#0a0a0a' }}>
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
      <div className="bg-dark min-vh-100 user-dashboard-dark d-flex flex-column" style={{ backgroundColor: '#0a0a0a' }}>
        <HeaderDashboard />
        
        {/* Dashboard Header Section */}
        <div className="section-space-md-top pb-2">
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
        <div className="pt-0 pb-4 flex-grow-1">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-8">
                <SubscriptionCard
                  subscription={currentUser.subscription}
                  onChangePlan={handleChangePlan}
                  onUpdatePayment={handleUpdatePayment}
                 // onCancelSubscription={handleCancelSubscription}
                />
              </div>
              <div className="col-lg-4">
                <QuickActions
                  // onViewBilling={handleViewBilling}
                  onContactSupport={handleContactSupport}
                  onDownloadInvoice={handleDownloadInvoice}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Usage Metrics Section */}
        {/* <div className="section-space-sm-y">
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
        </div> */}

        {/* Notifications and Activity Section */}
        {/* <div className="section-space-sm-y">
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
        </div> */}

        {/* Latest Invoices Section */}
        <div className="container mb-4">
          <div className="row">
            <div className="col-12">
              <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4">
                <div className="d-flex align-items-center mb-3">
                  <Icon name="CreditCard" size={18} className="text-primary me-2" />
                  <span className="fw-medium text-light fs-16">Latest Invoices</span>
                </div>
                {invoiceLoading ? (
                  <div className="text-light-50">Loading invoices...</div>
                ) : latestInvoices.length === 0 ? (
                  <div className="text-light-50">No invoices found.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-dark table-striped table-hover mb-0">
                      <thead>
                        <tr>
                          <th className="text-light fw-medium">Invoice Number</th>
                          <th className="text-light fw-medium">Date</th>
                          <th className="text-light fw-medium">Plan</th>
                          <th className="text-light fw-medium">Amount</th>
                          <th className="text-light fw-medium">Status</th>
                          <th className="text-light fw-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestInvoices.map((inv, idx) => (
                          <tr key={inv.invoiceNumber || idx}>
                            <td>{inv.invoiceNumber || inv.number || '-'}</td>
                            <td>{inv.invoiceDate ? inv.invoiceDate.split('\r\n')[0] : '-'}</td>
                            <td>{inv.planName || inv.plan || '-'}</td>
                            <td>${inv.amount ? inv.amount.toFixed(2) : '-'}</td>
                            <td>{inv.invoiceStatus || inv.status || '-'}</td>
                            <td>
                              <button
                                className="btn btn-outline-primary btn-sm"
                                onClick={handleShowInvoiceDetails}
                              >
                                Show Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/*
        <footer className="bg-dark border-top border-secondary py-4 mt-auto">
          <div className="container">
            <div className="text-center">
              <p className="text-light mb-0 small">
                &copy; {new Date().getFullYear()} N0de. All rights reserved.
              </p>
              <div className="d-flex align-items-center justify-content-center gap-4 mt-3">
                <a href="#" className="text-light small text-decoration-none">Privacy Policy</a>
                <a href="#" className="text-light small text-decoration-none">Terms of Service</a>
                <a href="#" className="text-light small text-decoration-none">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
        */}
      </div>
    </Wrapper>
  );
};

export default UserDashboard;
