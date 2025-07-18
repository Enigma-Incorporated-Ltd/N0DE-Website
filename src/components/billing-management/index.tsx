import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentMethodCard from './components/PaymentMethodCard';
import BillingAddressCard from './components/BillingAddressCard';
import BillingCycleCard from './components/BillingCycleCard';

const BillingManagement = () => {
  const navigate = useNavigate();
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
    navigate('/plan-selection');
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
        <div className="section-space-md-top" style={{ paddingBottom: '1rem' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <nav className="d-inline-flex align-items-center bg-dark-light rounded-pill px-4 py-2 mb-4 mt-4" data-cue="fadeIn" aria-label="Breadcrumb">
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
        {/* <div style={{ paddingTop: '0.5rem', paddingBottom: '1rem' }}>
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
        </div> */}

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
               
              </div>
            )}
            
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default BillingManagement;