import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';
import { NodeService } from '../../services/Node';

interface PaymentConfirmationDetails {
  // Payment Details
  Id: string;
  PaymentId: string;
  InvoiceId: string;
  InvoiceNumber: string;
  Amount: number;
  Status: string;
  InvoicePdf: string;
  PeriodStart: string;
  PeriodEnd: string;
  UserProfileId: string;
  CreatedDate: string;
  
  // Plan Details
  PlanName: string;
  PlanSubtitle: string;
  PlanDescription: string;
  BillingCycle: string;
  
  // Subscription Status
  SubscriptionStatus: string;
  NextBillingDate: string;
}

const PaymentConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentConfirmationDetails, setPaymentConfirmationDetails] = useState<PaymentConfirmationDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get payment data from navigation state
  const { id: paymentId, userProfileId } = location.state || {};

  // Mock subscription data - in real app, this would come from URL params or API
  const mockSubscription = {
    planName: paymentConfirmationDetails?.PlanName || "PRO Plan",
    planDescription: paymentConfirmationDetails?.PlanDescription || "Perfect for growing businesses",
    amount: paymentConfirmationDetails?.Amount?.toString() || "29.99",
    nextBillingDate: paymentConfirmationDetails?.NextBillingDate || "August 11, 2025",
    confirmationNumber: paymentConfirmationDetails?.PaymentId || paymentId || "SF-2025-071118-4829", // Use paymentId from API if available
    customerEmail: "john.doe@example.com"
  };

  const fetchPaymentConfirmationDetails = async (userProfileId: string) => {
    try {
      const details = await NodeService.getPaymentConfirmationDetails(userProfileId);
      setPaymentConfirmationDetails(details);
    } catch (error) {
      console.error('Error fetching payment confirmation details:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch payment confirmation details');
    }
  };

  useEffect(() => {
    // Debug logging
    console.log('Payment Confirmation - Location State:', location.state);
    console.log('Payment ID:', paymentId);
    console.log('User Profile ID:', userProfileId);

    // Fetch payment confirmation details if we have a userProfileId
    if (userProfileId) {
      fetchPaymentConfirmationDetails(userProfileId);
    }

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.state, paymentId, userProfileId]);

  const handleDownloadReceipt = () => {
    // Check if we have a PDF URL from the payment confirmation details
    if (paymentConfirmationDetails?.InvoicePdf) {
      // Download the actual PDF from Stripe
      const a = document.createElement('a');
      a.href = paymentConfirmationDetails.InvoicePdf;
      a.download = `receipt-${paymentConfirmationDetails.InvoiceNumber || paymentConfirmationDetails.PaymentId || 'invoice'}.pdf`;
      a.target = '_blank'; // Open in new tab if download doesn't work
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Fallback: Generate receipt with actual payment details
      const receiptData = `
        N0de Receipt
        
        Confirmation Number: ${mockSubscription.confirmationNumber}
        Payment ID: ${paymentConfirmationDetails?.PaymentId || paymentId || 'N/A'}
        Invoice ID: ${paymentConfirmationDetails?.InvoiceId || 'N/A'}
        Invoice Number: ${paymentConfirmationDetails?.InvoiceNumber || 'N/A'}
        Amount: $${paymentConfirmationDetails?.Amount || mockSubscription.amount}
        Status: ${paymentConfirmationDetails?.Status || 'N/A'}
        User Profile ID: ${paymentConfirmationDetails?.UserProfileId || userProfileId || 'N/A'}
        Created Date: ${paymentConfirmationDetails?.CreatedDate || new Date().toLocaleDateString()}
        Plan: ${mockSubscription.planName}
        
        Thank you for your subscription!
      `;
      
      const blob = new Blob([receiptData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${mockSubscription.confirmationNumber}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/user-dashboard');
  };

  if (isLoading) {
    return (
      <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: '4rem', height: '4rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light text-opacity-75">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Payment Successful - N0de</title>
        <meta name="description" content="Your subscription payment has been processed successfully. Access your dashboard and start using your new plan." />
      </Helmet>

      <Wrapper>
        <div className="bg-dark">
          <HeaderDashboard />
          
          {/* Error Message */}
          {error && (
            <div className="section-space-sm-y">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger d-flex align-items-center justify-content-between mb-0" role="alert" style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}>
                      <div className="d-flex align-items-center">
                        <Icon name="AlertCircle" size={20} className="me-2 flex-shrink-0 text-white" />
                        <span className="text-white fw-medium">{error}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Main Content - Unified Card */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                    
                    {/* Payment Success Header */}
                    <div className="text-center mb-5">
                      <div className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '4rem', height: '4rem' }}>
                        <Icon name="CheckCircle" size={32} className="text-success" />
                      </div>
                      <h1 className="text-light fw-bold mb-2 fs-1">Payment Successful!</h1>
                      <p className="text-light text-opacity-75 mb-2">
                        Your subscription has been activated
                      </p>
                      <p className="text-light text-opacity-50 small">
                        Confirmation #: <span className="text-light fw-medium">{mockSubscription.confirmationNumber}</span>
                      </p>
                    </div>

                    {/* Subscription Details */}
                    <div className="mb-5">
                      <h2 className="text-light fw-medium mb-4 d-flex align-items-center fs-3">
                        <Icon name="CreditCard" size={20} className="me-2" />
                        Subscription Details
                      </h2>
                      
                      <div className="border-top border-light border-opacity-10">
                        <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-light border-opacity-10">
                          <span className="text-light text-opacity-75">Plan</span>
                          <div className="text-end">
                            <div className="text-light fw-medium">{paymentConfirmationDetails?.PlanName || mockSubscription.planName}</div>
                            <div className="text-light text-opacity-50 small">{paymentConfirmationDetails?.PlanSubtitle || mockSubscription.planDescription}</div>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-light border-opacity-10">
                          <span className="text-light text-opacity-75">Billing Amount</span>
                          <span className="text-light fw-medium">${paymentConfirmationDetails?.Amount || mockSubscription.amount}/{paymentConfirmationDetails?.BillingCycle || 'month'}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center py-3">
                          <span className="text-light text-opacity-75">Status</span>
                          <div className="d-flex align-items-center">
                            <div className="bg-success rounded-circle me-2" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                            <span className="text-success fw-medium">{paymentConfirmationDetails?.SubscriptionStatus || 'Active'}</span>
                          </div>
                        </div>
                      </div>
                    </div>



                    {/* Action Buttons */}
                    <div className="text-center">
                      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                        <button
                          className="btn btn-primary btn-lg d-flex align-items-center justify-content-center"
                          onClick={handleGoToDashboard}
                        >
                          <Icon name="LayoutDashboard" size={16} className="me-2" />
                          Access Dashboard
                        </button>
                        
                        <button
                          className="btn btn-outline-light btn-lg d-flex align-items-center justify-content-center"
                          onClick={handleDownloadReceipt}
                        >
                          <Icon name="Download" size={16} className="me-2" />
                          Download Receipt
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6">
                    <div className="row g-4 text-center">
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                          <div className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '3rem', height: '3rem' }}>
                            <Icon name="Shield" size={24} className="text-success" />
                          </div>
                          <h3 className="text-light fw-medium mb-2">Secure & Protected</h3>
                          <p className="text-light text-opacity-75 mb-0">
                            Your subscription is secured with enterprise-grade encryption
                          </p>
                        </div>
                      </div>
                      
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                          <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '3rem', height: '3rem' }}>
                            <Icon name="Zap" size={24} className="text-primary" />
                          </div>
                          <h3 className="text-light fw-medium mb-2">Instant Access</h3>
                          <p className="text-light text-opacity-75 mb-0">
                            All features are now active and ready to use
                          </p>
                        </div>
                      </div>
                      
                      <div className="col-12 col-md-4">
                        <div className="d-flex flex-column align-items-center">
                          <div className="bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '3rem', height: '3rem' }}>
                            <Icon name="Headphones" size={24} className="text-warning" />
                          </div>
                          <h3 className="text-light fw-medium mb-2">24/7 Support</h3>
                          <p className="text-light text-opacity-75 mb-0">
                            Our support team is here to help you get started
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        {/* Footer */}
          <div className="section-space-sm-y">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6">
            <div className="text-center">
                      <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 mb-4">
                        <Link to="/support-center" className="text-light text-opacity-75 text-decoration-none hover-text-primary">
                  Support Center
                </Link>
                        <Link to="/billing-management" className="text-light text-opacity-75 text-decoration-none hover-text-primary">
                  Billing
                </Link>
                        <Link to="/user-dashboard" className="text-light text-opacity-75 text-decoration-none hover-text-primary">
                          Dashboard
                        </Link>
                        <button className="btn btn-link text-light text-opacity-75 text-decoration-none hover-text-primary p-0 border-0">
                  Privacy Policy
                </button>
                        <button className="btn btn-link text-light text-opacity-75 text-decoration-none hover-text-primary p-0 border-0">
                  Terms of Service
                </button>
              </div>
                      <p className="text-light text-opacity-50 mb-0 small">
                © {new Date().getFullYear()} N0de. All rights reserved.
              </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </Wrapper>
    </>
  );
};

export default PaymentConfirmation;