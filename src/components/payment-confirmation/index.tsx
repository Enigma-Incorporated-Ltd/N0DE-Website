import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';

const PaymentConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock subscription data - in real app, this would come from URL params or API
  const mockSubscription = {
    planName: "PRO Plan",
    planDescription: "Perfect for growing businesses",
    amount: "29.99",
    nextBillingDate: "August 11, 2025",
    confirmationNumber: "SF-2025-071118-4829",
    customerEmail: "john.doe@example.com"
  };

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadReceipt = () => {
    // Mock PDF generation
    const receiptData = `
      N0de Receipt
      
      Confirmation Number: ${mockSubscription.confirmationNumber}
      Plan: ${mockSubscription.planName}
      Amount: $${mockSubscription.amount}/month
      Date: ${new Date().toLocaleDateString()}
      Next Billing: ${mockSubscription.nextBillingDate}
      
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
                            <div className="text-light fw-medium">{mockSubscription.planName}</div>
                            <div className="text-light text-opacity-50 small">{mockSubscription.planDescription}</div>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-light border-opacity-10">
                          <span className="text-light text-opacity-75">Billing Amount</span>
                          <span className="text-light fw-medium">${mockSubscription.amount}/month</span>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-light border-opacity-10">
                          <span className="text-light text-opacity-75">Next Billing Date</span>
                          <span className="text-light fw-medium">{mockSubscription.nextBillingDate}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center py-3">
                          <span className="text-light text-opacity-75">Status</span>
                          <div className="d-flex align-items-center">
                            <div className="bg-success rounded-circle me-2" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                            <span className="text-success fw-medium">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Email Sent */}
                    <div className="mb-5">
                      <div className="bg-primary bg-opacity-10 rounded-4 p-4">
                        <div className="d-flex align-items-start">
                          <div className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <Icon name="Mail" size={16} className="text-primary" />
                          </div>
                          <div className="flex-grow-1">
                            <h3 className="text-light fw-medium mb-2">Confirmation Email Sent</h3>
                            <p className="text-light text-opacity-75 mb-3 small">
                              A detailed receipt and subscription confirmation has been sent to{' '}
                              <span className="text-light fw-medium">{mockSubscription.customerEmail}</span>
                            </p>
                            <div className="d-flex align-items-center text-light text-opacity-50" style={{ fontSize: '0.75rem' }}>
                              <Icon name="Info" size={14} className="me-1" />
                              <span>
                                Didn't receive the email? Check your spam folder or{' '}
                                <button className="btn btn-link text-primary text-decoration-underline p-0 border-0" style={{ fontSize: '0.75rem' }}>
                                  contact support
                                </button>
                              </span>
                            </div>
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