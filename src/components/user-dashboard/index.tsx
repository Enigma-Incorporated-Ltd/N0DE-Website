// UserDashboard.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import SubscriptionCard from './components/SubscriptionCard';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import AccountService from '../../services/Account';
import { currencyConfig } from '../../services/Account';
import NodeService from '../../services/Node';
import FooterOne from '../../layouts/footers/FooterOne';

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
}

// ------------------- Component -------------------

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [invoiceLoading,setInvoiceLoading] = useState(true);
  const [latestInvoices, setLatestInvoices] = useState<any[]>([]);
  const hasInitialized = useRef(false); // Prevent multiple calls in React Strict Mode
    
    const fetchUserData = async () => {
      try {
        const userId = AccountService.getCurrentUserId();
        if (!userId) {
          throw new Error('User ID not found in session storage.');
        }
        const response = await NodeService.getUserDetails(userId);
        if (!response) throw new Error('Invalid user data');
        setUser(response);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };


  


  useEffect(() => {
    if (hasInitialized.current) return; // Prevent multiple calls in React Strict Mode
    hasInitialized.current = true;
    
    const loadUserData = async () => {
      try {
        // Get userId from navigation state (passed from login) or from storage
        const userIdFromState = location.state?.userId;
        const userIdFromStorage = AccountService.getCurrentUserId();
        const userId = userIdFromState || userIdFromStorage;
        console.log('UserDashboard: userId from navigation state:', userIdFromState, 'from storage:', userIdFromStorage, 'final userId:', userId);
        
        if (!userId) {
          throw new Error('User ID not found');
        }
        
        setUserId(userId);
        
        // Fetch real user data
        await fetchUserData();
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
      if (!userId) return;
      setInvoiceLoading(true);
      try {
        const invoices = await NodeService.getUserInvoiceHistory(userId);
        setLatestInvoices((invoices || []).slice(0, 4));
      } catch {
        setLatestInvoices([]);
      }
      setInvoiceLoading(false);
    };
    fetchInvoices();
  }, [userId]);

  const handleChangePlan = () => navigate('/plan-selection');
  const handleUpdatePayment = () => {
    if (userId) {
      navigate('/billing-management', { state: { userId } });
    }
  };
  const handleContactSupport = () => {
    if (userId) {
      console.log('UserDashboard: Navigating to support center with userId:', userId);
      navigate('/support-center', {
        state: {
          userId
        }
      });
    } else {
      console.error('UserDashboard: No userId available for support navigation');
    }
  };

 
  const handleDownloadInvoice = () => {
    if (userId) {
      console.log('UserDashboard: Navigating to invoice with userId:', userId);
      navigate('/invoice', {
        state: {
          userId
        }
      });
    } else {
      console.error('UserDashboard: No userId available for invoice navigation');
    }
  };

  // Function to convert name to camel case
  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
 
  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark position-relative" style={{ minHeight: '100vh' }}>
          <div style={{ borderBottom: 'none', boxShadow: 'none' }}>
            <HeaderDashboard />
          </div>
          <div className="d-flex align-items-center justify-content-center" style={{ 
            height: 'calc(100vh - 80px)',
            marginTop: '80px'
          }}>
            <div className="text-center">
              <div className="d-flex justify-content-center mb-3">
                <Icon 
                  name="Loader2" 
                  size={48} 
                  className="text-primary-gradient" 
                  style={{ 
                    animation: 'spin 1s linear infinite',
                    width: '48px',
                    height: '48px'
                  }} 
                />
              </div>
              <p className="text-light mb-0">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (!userId) {
    return (
      <Wrapper>
        <div className="bg-dark position-relative" style={{ minHeight: '100vh' }}>
          <div style={{ borderBottom: 'none', boxShadow: 'none' }}>
            <HeaderDashboard />
          </div>
          <div className="d-flex align-items-center justify-content-center" style={{ 
            height: 'calc(100vh - 80px)',
            marginTop: '80px'
          }}>
            <div className="text-center">
              <div className="d-flex justify-content-center mb-3">
                <Icon 
                  name="Loader2" 
                  size={48} 
                  className="text-primary-gradient" 
                  style={{ 
                    animation: 'spin 1s linear infinite',
                    width: '48px',
                    height: '48px'
                  }} 
                />
              </div>
              <p className="text-light mb-0">Loading your dashboard...</p>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="bg-dark position-relative" style={{ minHeight: '100vh' }}>
        <div style={{ borderBottom: 'none', boxShadow: 'none' }}>
          <HeaderDashboard />
        </div>
        
        {/* Dashboard Header Section */}
        <div className="section-space-md-top pb-2" style={{ marginTop: '30px' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center flex-wrap row-gap-2 column-gap-4 mb-2" data-cue="fadeIn">
                    <div className="flex-shrink-0 d-inline-block w-20 h-2px bg-primary-gradient"></div>
                    <span className="d-block fw-medium text-light fs-20">Dashboard</span>
                  </div>
                  <h1 className="text-light mb-0" data-cue="fadeIn">
                    Welcome back, <span className="text-gradient-primary">{user ? toCamelCase(user.firstName) : 'Loading...'}</span>
                  </h1>
                  <p className="text-light mb-0" data-cue="fadeIn">
                    Here's an overview of your subscription and account activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription and Invoices Section - wrapped in a single container to control spacing */}
        <div className="container">
          <div className="row g-4 align-items-stretch h-100 mb-0 pb-0"> {/* Removed extra margin/padding */}
            <div className="col-lg-8 h-100">
              <SubscriptionCard
                onChangePlan={handleChangePlan}
                onUpdatePayment={handleUpdatePayment}
              />
            </div>
            <div className="col-lg-4 h-100">
              <QuickActions
                // onViewBilling={handleViewBilling}
                onContactSupport={handleContactSupport}
                onDownloadInvoice={handleDownloadInvoice}
              />
            </div>
          </div>
          {/* Latest Invoices Section - now directly below in the same container */}
          <div className="row mt-5"> {/* Use mt-5 for a slightly larger gap */}
            <div className="col-12">
              <div className="card-gl-dark rounded-4 overflow-hidden" data-cue="fadeIn">
                <div className="p-4 border-bottom border-secondary">
                  <div className="d-flex align-items-center mb-3">
                    <Icon name="CreditCard" size={18} className="text-primary me-2" />
                    <span className="fw-medium text-light fs-16">Latest Invoices</span>
                  </div>
                </div>
                {invoiceLoading ? (
                  <div className="p-5 text-center">
                    <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
                    <p className="text-light">Loading invoices...</p>
                  </div>
                ) : latestInvoices.length === 0 ? (
                  <div className="p-5 text-center">
                    <div className="d-flex align-items-center justify-content-center bg-primary-gradient rounded-circle mx-auto mb-4" style={{ width: '96px', height: '96px' }}>
                      <Icon name="FileText" size={48} className="text-white" />
                    </div>
                    <h4 className="text-light fw-medium mb-2">No invoices found</h4>
                    <p className="text-light-50">Your invoice history will appear here once you have transactions.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-dark table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th className="text-light-50 fw-medium fs-14 p-3">Date</th>
                          <th className="text-light-50 fw-medium fs-14 p-3">Invoice</th>
                          <th className="text-light-50 fw-medium fs-14 p-3">Plan</th>
                          <th className="text-light-50 fw-medium fs-14 p-3">Amount</th>
                          <th className="text-light-50 fw-medium fs-14 p-3">Status</th>
                          <th className="text-light-50 fw-medium fs-14 p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {latestInvoices.filter(inv => (inv.invoiceStatus || inv.status || '').toUpperCase() !== 'PENDING').map((inv, idx) => (
                          <tr key={inv.invoiceNumber || idx} className="border-bottom border-dark">
                            <td className="p-3">
                              <div className="text-light fs-14">{inv.invoiceDate ? inv.invoiceDate.split('\r\n')[0] : '-'}</div>
                              {/* <div className="text-light-50 fs-12">{inv.invoiceDate && inv.invoiceDate.includes('\r\n') ? inv.invoiceDate.split('\r\n')[1] : '-'}</div> */}
                            </td>
                            <td className="p-3">
                              <div className="text-light fw-medium fs-14">{(inv.invoiceStatus || inv.status || '').toUpperCase() === 'PENDING' ? 'N/A' : (inv.invoiceNumber || inv.number || '-')}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-light fs-14">{inv.planName || inv.plan || '-'}</div>
                            </td>
                            <td className="p-3">
                              <div className="text-light fw-medium fs-14">{(inv.invoiceStatus || inv.status || '').toUpperCase() === 'PENDING' ? 'N/A' : (inv.amount ? currencyConfig.format(inv.amount) : '-')}</div>
                            </td>
                            <td className="p-3">
                              {(inv.invoiceStatus || inv.status || '').toUpperCase() === 'PENDING' ? (
                                <div
                                  className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill fs-12 fw-medium"
                                  style={{
                                    background: '#fd7e14', // Bright orange
                                    color: '#000000',         // White text for icon
                                    fontWeight: 700,
                                  }}
                                >
                                  <Icon name="Clock" size={12} />
                                  <span className="text-capitalize" style={{ color: '#000' }}>{inv.invoiceStatus || inv.status || '-'}</span>
                                </div>
                              ) : (
                                <div className="d-inline-flex align-items-center gap-1 px-2 py-1 rounded-pill fs-12 fw-medium text-success bg-success-subtle">
                                  <Icon name="CheckCircle" size={12} />
                                  <span className="text-capitalize">{inv.invoiceStatus || inv.status || '-'}</span>
                                </div>
                              )}
                            </td>
                            <td className="p-3">
                              <div className="d-flex align-items-center gap-2">
                                <button
                                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                                  onClick={() => {
                                    const pdfUrl = inv.invoicePdf || inv.pdf;
                                    if (pdfUrl) window.open(pdfUrl, '_blank');
                                  }}
                                  disabled={(inv.invoiceStatus || inv.status || '').toUpperCase() === 'PENDING' || !(inv.invoicePdf || inv.pdf)}
                                >
                                  <Icon name="Download" size={14} />
                                  <span>PDF</span>
                                </button>
                              </div>
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
      </div>
      <FooterOne />
    </Wrapper>
  );
};

export default UserDashboard;
