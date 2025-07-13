import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import SubscriptionChart from './components/SubscriptionChart';
import NotificationPanel from './components/NotificationPanel';
import SearchBar from './components/SearchBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Mock refresh functionality
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const metricsData = [
    {
      title: 'Total Subscribers',
      value: '2,450',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$36,750',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'accent'
    },
    {
      title: 'Churn Rate',
      value: '2.1%',
      change: '-0.3%',
      changeType: 'positive',
      icon: 'TrendingDown',
      color: 'warning'
    },
    {
      title: 'Payment Success Rate',
      value: '97.8%',
      change: '+1.2%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SubscriptionFlow</title>
        <meta name="description" content="Comprehensive subscription and user management dashboard for administrators" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-64 pt-16">
          <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's what's happening with your subscriptions.
                </p>
                <div className="flex items-center space-x-2 mt-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Last updated: {currentTime.toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  loading={refreshing}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh
                </Button>
                <Button variant="default" iconName="Download" iconPosition="left">
                  Export Report
                </Button>
              </div>
            </div>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Admin</span>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground font-medium">Dashboard</span>
            </nav>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  color={metric.color}
                />
              ))}
            </div>

            {/* Search Bar */}
            <SearchBar />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Charts and Analytics */}
              <div className="xl:col-span-2 space-y-6">
                <SubscriptionChart />
                <QuickActions />
              </div>

              {/* Right Column - Activity and Notifications */}
              <div className="space-y-6">
                <NotificationPanel />
                <RecentActivity />
              </div>
            </div>

            {/* System Status Footer */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-subtle">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-foreground">System Status: Operational</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    All services running normally
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Server" size={16} />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={16} />
                    <span>Response: 120ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;