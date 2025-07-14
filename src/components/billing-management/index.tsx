import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentMethodCard from './components/PaymentMethodCard';
import BillingHistoryTable from './components/BillingHistoryTable';
import BillingAddressCard from './components/BillingAddressCard';
import BillingCycleCard from './components/BillingCycleCard';

const BillingManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
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



  useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading billing data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleUpdatePaymentMethod = () => {
    console.log('Update payment method');
    // In real app, this would open Stripe Elements modal
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log('Download invoice:', invoiceId);
    // In real app, this would download the PDF
  };

  const handleUpdateBillingAddress = (newAddress: typeof billingAddress) => {
    setBillingAddress(newAddress);
    console.log('Updated billing address:', newAddress);
  };

  const handleToggleAutoRenewal = (enabled: boolean) => {
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

  const handleContactSupport = () => {
    console.log('Contact support');
    // In real app, this would navigate to support or open chat
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'history', label: 'History', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

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
                    <p className="text-light">Loading billing information...</p>
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
        
        {/* Header Section */}
        <div className="section-space-sm-top" style={{ paddingBottom: '1rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="d-inline-flex align-items-center bg-dark-light rounded-pill px-4 py-2 mb-4" data-cue="fadeIn">
                  <Link 
                    to="/user-dashboard" 
                    className="text-light text-decoration-none d-flex align-items-center gap-2 px-3 py-1 rounded-pill transition-all"
                    style={{ 
                      transition: 'all 0.3s ease',
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Icon name="Home" size={14} />
                    <span className="fw-medium">Dashboard</span>
                  </Link>
                  <div className="d-flex align-items-center mx-2">
                    <Icon name="ChevronRight" size={16} className="text-light-50" />
                  </div>
                  <span className="text-gradient-primary fw-semibold d-flex align-items-center gap-2 px-3 py-1">
                    <Icon name="CreditCard" size={14} />
                    <span>Billing Management</span>
                  </span>
                </nav>
                
                <div className="mb-1">
                  <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-1" data-cue="fadeIn">
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">Billing Management</span>
                  </div>
                  <h1 className="text-light mb-0" data-cue="fadeIn">
                    <span className="text-gradient-primary">Payment & Billing</span>
                  </h1>
                  <p className="text-light mb-0" data-cue="fadeIn">
                    Manage your payment methods, view billing history, and update your subscription settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Tab Navigation */}
        <div style={{ paddingTop: '0.5rem', paddingBottom: '1rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center" data-cue="fadeIn">
                  <ul className="nav nav-pills bg-dark-light rounded-4 p-2" role="tablist">
                    {tabs.map((tab) => (
                      <li className="nav-item" key={tab.id}>
                        <button
                          className={`nav-link d-flex align-items-center gap-2 px-4 py-2 rounded-3 border-0 ${
                            activeTab === tab.id
                              ? 'active bg-primary-gradient text-white'
                              : 'text-light'
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                          type="button"
                        >
                          <Icon name={tab.icon} size={16} />
                          <span className="d-none d-sm-inline">{tab.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ paddingTop: '0.5rem', paddingBottom: '2rem' }}>
          <div className="container">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="row g-4 mb-4">
                  <div className="col-lg-6">
                    <PaymentMethodCard
                      paymentMethod={paymentMethod}
                      onUpdate={handleUpdatePaymentMethod}
                    />
                  </div>
                  <div className="col-lg-6">
                    <BillingCycleCard
                      billingInfo={billingInfo}
                      onToggleAutoRenewal={handleToggleAutoRenewal}
                      onChangePlan={handleChangePlan}
                    />
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <BillingAddressCard
                      address={billingAddress}
                      onUpdate={handleUpdateBillingAddress}
                    />
                  </div>
                </div>

                {/* Recent Invoices */}
                <div className="row g-4">
                  <div className="col-12">
                    <div className="card-gl-dark rounded-4 p-4" data-cue="fadeIn">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="text-light fw-semibold mb-0">Recent Invoices</h3>
                        <button
                          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                          onClick={() => setActiveTab('history')}
                        >
                          <span>View All</span>
                          <Icon name="ArrowRight" size={14} />
                        </button>
                      </div>
                      <div className="d-flex flex-column gap-3">
                        {invoices.slice(0, 3).map((invoice) => (
                          <div key={invoice.id} className="card-gl-light rounded-3 p-3 d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                              <div className="d-flex align-items-center justify-content-center bg-primary-gradient rounded-2" style={{ width: '32px', height: '32px' }}>
                                <Icon name="FileText" size={16} className="text-white" />
                              </div>
                              <div>
                                <div className="text-light fw-medium">{invoice.number}</div>
                                <div className="text-light-50 fs-14">{invoice.date}</div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                              <div className="text-light fw-medium">${invoice.amount}</div>
                              <button
                                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                                onClick={() => handleDownloadInvoice(invoice.id)}
                              >
                                <Icon name="Download" size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="tab-content">
                <div className="row">
                  <div className="col-12">
                    <BillingHistoryTable
                      invoices={invoices}
                      onDownload={handleDownloadInvoice}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="tab-content">
                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <BillingAddressCard
                      address={billingAddress}
                      onUpdate={handleUpdateBillingAddress}
                    />
                  </div>
                </div>
                
                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <div className="card-gl-dark rounded-4 p-4" data-cue="fadeIn">
                      <h3 className="text-light fw-semibold mb-4">Billing Preferences</h3>
                      
                      <div className="d-flex flex-column gap-3">
                        <div className="card-gl-light rounded-3 p-4 d-flex align-items-center justify-content-between">
                          <div>
                            <div className="text-light fw-medium mb-1">Email Notifications</div>
                            <div className="text-light-50 fs-14">Receive billing notifications via email</div>
                          </div>
                          <button className="btn btn-outline-primary btn-sm d-flex align-items-center">
                            <Icon name="ToggleRight" size={16} />
                          </button>
                        </div>
                        
                        <div className="card-gl-light rounded-3 p-4 d-flex align-items-center justify-content-between">
                          <div>
                            <div className="text-light fw-medium mb-1">Invoice Reminders</div>
                            <div className="text-light-50 fs-14">Get reminded before your next billing date</div>
                          </div>
                          <button className="btn btn-outline-primary btn-sm d-flex align-items-center">
                            <Icon name="ToggleRight" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-12">
                    <div className="card-gl-dark border-2 border-danger rounded-4 p-4" data-cue="fadeIn">
                      <h3 className="text-danger fw-semibold mb-2">Danger Zone</h3>
                      <p className="text-light-50 fs-14 mb-4">
                        Cancel your subscription. This action cannot be undone and you will lose access to all features.
                      </p>
                      <button className="btn btn-danger d-flex align-items-center gap-2">
                        <Icon name="Trash2" size={16} />
                        <span>Cancel Subscription</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BillingManagement;