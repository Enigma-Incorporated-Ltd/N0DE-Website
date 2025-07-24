import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Location } from 'react-router-dom';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentMethodCard from './components/PaymentMethodCard';
import NodeService from '../../services/Node';
import { AccountService } from '../../services';

const BillingManagement = () => {
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: { userId?: string } };
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [defaultPaymentMethodId, setdefaultcardId] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

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
    const loadUserData = async () => {
      try {
        // Get userId from navigation state (passed from login) or from storage
        const userIdFromState = location.state?.userId;
        const userIdFromStorage = AccountService.getCurrentUserId();
        const userId = userIdFromState || userIdFromStorage;
        
        if (!userId) {
          setError('User not authenticated. Please log in again.');
          setLoading(false);
          return;
        }

        // Set current user with the userId
        setCurrentUser({ id: userId });
        
        // Fetch payment methods
        const paymentMethodsData = await NodeService.getUserPaymentMethods(userId);
        setPaymentMethods(paymentMethodsData);
        
        // Fetch default card id from API
        try {
          const defaultCardId = await NodeService.getDefaultCard(userId);
          setdefaultcardId(defaultCardId);
        } catch (e) {
          setdefaultcardId(null);
        }

      } catch (error) {
        console.error('Error loading billing data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, [location.state]);

  const handleUpdateBillingAddress = (newAddress: typeof billingAddress) => {
    setBillingAddress(newAddress);
    console.log('Updated billing address:', newAddress);
    // In a real app, you would call an API to save the address
  };

  const handleSetDefault = async () => {
    if (!selectedCardId || selectedCardId === defaultPaymentMethodId) return;
    setProcessingId(selectedCardId);
    try {
      // Fallback: get userId from storage if not set
      const userId = currentUser?.id || AccountService.getCurrentUserId();
      console.log('Setting default payment method:', { userId, selectedCardId });
      if (!userId) throw new Error('User ID is missing.');
      // Call the backend API to set the default payment method
      await NodeService.setdefaultcard(userId, selectedCardId);
      setdefaultcardId(selectedCardId);
      setPaymentMethods(prevMethods =>
        prevMethods.map(pm => ({
          ...pm,
          isDefault: pm.id === selectedCardId
        }))
      );
    } catch (error) {
      console.error('Failed to set default payment method:', error);
      alert('Failed to set default payment method. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };
  
  const handleDeleteCard = async () => {
    if (!selectedCardId) return;
    setProcessingId(selectedCardId);
    try {
      const userId = currentUser?.id || AccountService.getCurrentUserId();
      if (!userId) throw new Error('User ID is missing.');
      await NodeService.deletePaymentMethod(userId, selectedCardId);
      setPopupMessage('Card deleted successfully.');
      // Refresh payment methods
      const paymentMethodsData = await NodeService.getUserPaymentMethods(userId);
      setPaymentMethods(paymentMethodsData);
      // Reset selection if deleted card was selected
      setSelectedCardId(null);
      // Update default if needed
      const defaultMethod = paymentMethodsData.find(pm => pm.isDefault === true);
      setdefaultcardId(defaultMethod ? defaultMethod.id : null);
    } catch (error: any) {
      setPopupMessage(error?.message || 'Failed to delete card.');
    } finally {
      setProcessingId(null);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'history', label: 'History', icon: 'FileText' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  if (loading) {
    return (
      <Wrapper>
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary-gradient mx-auto mb-4" style={{ animation: 'spin 1s linear infinite' }} />
            <p className="text-light">Loading billing information...</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="bg-dark min-vh-100">
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

        {/* Tab Content */}
        <div style={{ paddingTop: '0.5rem', paddingBottom: '2rem' }}>
          <div className="container">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="row g-4">
                  <div className="col-lg-7">
                    <div className="card-gl-dark rounded-4">
                      <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center p-4 border-bottom border-light border-opacity-10">
                          <h3 className="text-light fw-semibold mb-0">Payment Methods</h3>
                          {/* Add New Card button - triggers card addition flow */}
                       { /*  <Button className="btn-sm btn-primary d-flex align-items-center gap-2">
                              <Icon name="Plus" size={16} />
                              Add New Card
                          </Button> */}
                      </div>
                      <div className="p-3">
                        {error ? (
                          <div className="text-center p-4">
                            <Icon name="AlertCircle" size={48} className="text-danger mb-3" />
                            <h4 className="text-light mb-2">Error Loading Payment Methods</h4>
                            <p className="text-light-50 mb-3">{error}</p>
                            <Button 
                              onClick={() => window.location.reload()} 
                              className="btn-primary"
                            >
                              Try Again
                            </Button>
                          </div>
                        ) : paymentMethods.length > 0 ? (
                          <div className="d-flex flex-column gap-2">
                            {/* Render each saved payment method as a card */}
                            {paymentMethods.map((paymentMethod, index) => (
                              <PaymentMethodCard
                                key={paymentMethod.id || index}
                                paymentMethod={{
                                  id: paymentMethod.id,
                                  brand: paymentMethod.brand || paymentMethod.card?.brand,
                                  last4: paymentMethod.last4 || paymentMethod.card?.last4,
                                  expMonth: paymentMethod.expMonth?.toString() || paymentMethod.card?.expMonth?.toString(),
                                  expYear: paymentMethod.expYear?.toString() || paymentMethod.card?.expYear?.toString(),
                                  // No metadata needed, isDefault is handled at the parent
                                }}
                                isProcessing={processingId === paymentMethod.id}
                                isDefault={defaultPaymentMethodId === paymentMethod.id}
                                selected={selectedCardId === paymentMethod.id}
                                onSelect={() => setSelectedCardId(paymentMethod.id)}
                              />
                            ))}
                            <div className="d-flex justify-content-end mt-3 gap-2">
                              <Button
                                className="btn-primary px-4"
                                onClick={handleSetDefault}
                                disabled={!selectedCardId || selectedCardId === defaultPaymentMethodId || !!processingId}
                              >
                                {processingId ? (
                                  <span className="spinner-border spinner-border-sm text-light me-2" role="status" aria-hidden="true"></span>
                                ) : null}
                                Set as Default
                              </Button>
                              {/*
                              <Button
                                className="btn-danger px-4"
                                onClick={handleDeleteCard}
                                disabled={!selectedCardId || !!processingId}
                              >
                                <Icon name="Trash" size={16} className="me-2" />
                                Delete
                              </Button>
*/}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <Icon name="CreditCard" size={48} className="text-light-50 mb-3" />
                            <h4 className="text-light mb-2">No Payment Methods</h4>
                            <p className="text-light-50">You haven't added any payment methods yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            )}
            
          </div>
        </div>
      </div>
      {/* Popup Message Modal */}
      {popupMessage && (
        <div className="fixed-top vw-100 vh-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75" style={{ zIndex: 2000 }}>
          <div className="bg-dark border border-light border-opacity-10 rounded-4 shadow p-4" style={{ minWidth: 320, maxWidth: 400 }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <span className="text-light fw-semibold">Notice</span>
              <button className="btn btn-sm btn-close btn-close-white" onClick={() => setPopupMessage(null)} aria-label="Close"></button>
            </div>
            <div className="text-light-50 mb-3">{popupMessage}</div>
            <div className="d-flex justify-content-end">
              <Button className="btn btn-primary" onClick={() => setPopupMessage(null)}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default BillingManagement;