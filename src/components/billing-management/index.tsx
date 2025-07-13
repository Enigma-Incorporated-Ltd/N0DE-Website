import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentMethodCard from './components/PaymentMethodCard';
import BillingHistoryTable from './components/BillingHistoryTable';
import BillingAddressCard from './components/BillingAddressCard';
import BillingCycleCard from './components/BillingCycleCard';
import FailedPaymentAlert from './components/FailedPaymentAlert';

const BillingManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [paymentMethod, setPaymentMethod] = useState({
    id: 'pm_1234567890',
    brand: 'visa',
    last4: '4242',
    expMonth: '12',
    expYear: '2025'
  });

  const [billingAddress, setBillingAddress] = useState({
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

  const [billingInfo, setBillingInfo] = useState({
    currentPlan: 'PRO Plan',
    planDescription: 'Advanced features with priority support',
    monthlyAmount: '29.99',
    nextBillingDate: '2025-08-11',
    nextAmount: '29.99',
    autoRenewal: true
  });

  const [invoices, setInvoices] = useState([
    {
      id: 'inv_001',
      number: 'INV-2025-001',
      date: 'Jul 11, 2025',
      time: '2:23 PM',
      period: 'Jul 11 - Aug 11, 2025',
      plan: 'PRO Plan',
      amount: '29.99',
      status: 'paid'
    },
    {
      id: 'inv_002',
      number: 'INV-2025-002',
      date: 'Jun 11, 2025',
      time: '2:23 PM',
      period: 'Jun 11 - Jul 11, 2025',
      plan: 'PRO Plan',
      amount: '29.99',
      status: 'paid'
    },
    {
      id: 'inv_003',
      number: 'INV-2025-003',
      date: 'May 11, 2025',
      time: '2:23 PM',
      period: 'May 11 - Jun 11, 2025',
      plan: 'LITE Plan',
      amount: '9.99',
      status: 'failed'
    }
  ]);

  const [failedPayment, setFailedPayment] = useState({
    amount: '29.99',
    plan: 'PRO',
    date: 'Jul 11, 2025',
    reason: 'Insufficient funds',
    gracePeriod: '7'
  });

  const handleUpdatePaymentMethod = () => {
    console.log('Update payment method');
    // In real app, this would open Stripe Elements modal
  };

  const handleDownloadInvoice = (invoiceId) => {
    console.log('Download invoice:', invoiceId);
    // In real app, this would download the PDF
  };

  const handleUpdateBillingAddress = (newAddress) => {
    setBillingAddress(newAddress);
    console.log('Updated billing address:', newAddress);
  };

  const handleToggleAutoRenewal = (enabled) => {
    setBillingInfo(prev => ({
      ...prev,
      autoRenewal: enabled
    }));
    console.log('Auto-renewal toggled:', enabled);
  };

  const handleChangePlan = () => {
    console.log('Change plan clicked');
    // In real app, this would navigate to plan selection
  };

  const handleRetryPayment = () => {
    console.log('Retry payment');
    setFailedPayment(null);
  };

  const handleContactSupport = () => {
    console.log('Contact support');
    // In real app, this would navigate to support or open chat
  };

  const handleDismissAlert = () => {
    setFailedPayment(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'history', label: 'History', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/user-dashboard" className="text-muted-foreground hover:text-foreground transition-smooth">
              Dashboard
            </Link>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Billing</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Billing Management</h1>
          <p className="text-muted-foreground">
            Manage your payment methods, view billing history, and update your subscription settings.
          </p>
        </div>

        {/* Failed Payment Alert */}
        <FailedPaymentAlert
          failedPayment={failedPayment}
          onRetry={handleRetryPayment}
          onContactSupport={handleContactSupport}
          onDismiss={handleDismissAlert}
        />

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth
                  ${activeTab === tab.id
                    ? 'bg-card text-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar Navigation - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth
                      ${activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Payment Method & Billing Cycle */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PaymentMethodCard
                    paymentMethod={paymentMethod}
                    onUpdate={handleUpdatePaymentMethod}
                  />
                  <BillingCycleCard
                    billingInfo={billingInfo}
                    onToggleAutoRenewal={handleToggleAutoRenewal}
                    onChangePlan={handleChangePlan}
                  />
                </div>

                {/* Billing Address */}
                <BillingAddressCard
                  address={billingAddress}
                  onUpdate={handleUpdateBillingAddress}
                />

                {/* Recent Invoices */}
                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Recent Invoices</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab('history')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {invoices.slice(0, 3).map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="FileText" size={16} className="text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium text-foreground">{invoice.number}</div>
                            <div className="text-xs text-muted-foreground">{invoice.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-foreground">${invoice.amount}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            iconName="Download"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <BillingHistoryTable
                invoices={invoices}
                onDownload={handleDownloadInvoice}
              />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <BillingAddressCard
                  address={billingAddress}
                  onUpdate={handleUpdateBillingAddress}
                />
                
                <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Billing Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive billing notifications via email</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="ToggleRight" size={16} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">Invoice Reminders</div>
                        <div className="text-sm text-muted-foreground">Get reminded before your next billing date</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="ToggleRight" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-destructive mb-4">
                    Cancel your subscription. This action cannot be undone and you will lose access to all features.
                  </p>
                  <Button variant="destructive" iconName="Trash2" iconPosition="left">
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingManagement;