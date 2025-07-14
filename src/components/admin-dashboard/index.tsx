import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import MetricsCard from './components/MetricsCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import SubscriptionChart from './components/SubscriptionChart';
import NotificationPanel from './components/NotificationPanel';
import SearchBar from './components/SearchBar';
import Icon from '../AppIcon';

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
        <title>Admin Dashboard - N0de</title>
        <meta name="description" content="Comprehensive subscription and user management dashboard for administrators" />
      </Helmet>

      {/* Dashboard Header Section */}
      <div className="section-space-md-top pb-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mb-3">
                <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                  <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                  <span className="d-block fw-medium text-light fs-20">Admin Dashboard</span>
                </div>
                <h1 className="text-light mb-2" data-cue="fadeIn">
                  Welcome back, <span className="text-gradient-primary">Admin</span>
                </h1>
                <p className="text-light text-opacity-75 mb-0" data-cue="fadeIn">
                  Here's what's happening with your subscriptions and users
                </p>
                <div className="d-flex align-items-center mt-2">
                  <Icon name="Clock" size={16} className="text-light text-opacity-50 me-2" />
                  <span className="text-light text-opacity-50 small">
                    Last updated: {currentTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pb-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end">
                <button 
                  className="btn btn-outline-light d-flex align-items-center justify-content-center"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <Icon 
                    name="RefreshCw" 
                    size={16} 
                    className={`me-2 ${refreshing ? 'spinner-border spinner-border-sm' : ''}`}
                  />
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </button>
                <button className="btn btn-primary d-flex align-items-center justify-content-center">
                  <Icon name="Download" size={16} className="me-2" />
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="section-space-sm-y">
        <div className="container">
          <div className="row g-4">
            {metricsData.map((metric, index) => (
              <div key={index} className="col-sm-6 col-xl-3">
                <MetricsCard
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeType={metric.changeType}
                  icon={metric.icon}
                  color={metric.color}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="section-space-sm-y">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="section-space-sm-y">
        <div className="container">
          <div className="row g-4">
            {/* Left Column - Charts and Analytics */}
            <div className="col-xl-8">
              <div className="row g-4">
                <div className="col-12">
                  <SubscriptionChart />
                </div>
                <div className="col-12">
                  <QuickActions />
                </div>
              </div>
            </div>

            {/* Right Column - Activity and Notifications */}
            <div className="col-xl-4">
              <div className="row g-4">
                <div className="col-12">
                  <NotificationPanel />
                </div>
                <div className="col-12">
                  <RecentActivity />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="section-space-sm-y">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-4 shadow-sm">
                <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-lg-between">
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
                    <div className="d-flex align-items-center">
                      <div className="bg-success rounded-circle me-2" style={{ width: '8px', height: '8px', animation: 'pulse 2s infinite' }}></div>
                      <span className="text-light fw-medium small">System Status: Operational</span>
                    </div>
                    <div className="text-light text-opacity-75 small">
                      All services running normally
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center gap-4 mt-3 mt-lg-0">
                    <div className="d-flex align-items-center text-light text-opacity-50 small">
                      <Icon name="Server" size={16} className="me-1" />
                      <span>99.9% Uptime</span>
                    </div>
                    <div className="d-flex align-items-center text-light text-opacity-50 small">
                      <Icon name="Zap" size={16} className="me-1" />
                      <span>Response: 120ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;