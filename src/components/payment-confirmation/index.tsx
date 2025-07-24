import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';
import { NodeService } from '../../services/Node';
import jsPDF from 'jspdf';

interface PaymentDetails {
  id: string;
  paymentId: string;
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  invoicePdf: string;
  periodStart: string | null;
  periodEnd: string | null;
  userProfileId: string;
  createdDate: string;
  // Plan Information
  planName: string;
  planSubtitle: string;
  planDescription: string;
  planAmount: number;
  billingCycle: string;
  subscriptionStatus: string;
}

// Helper to load image as base64
// const getBase64FromUrl = async (url: string): Promise<string> => {
//   const response = await fetch(url);
//   const blob = await response.blob();
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result as string);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

const PaymentConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get payment data from navigation state
  const { id: paymentId, userProfileId } = location.state || {};

  // Use actual payment details from API - moved inside component to react to state changes
  const subscriptionData = React.useMemo(() => {
    const data = {
      planName: paymentDetails?.planName,
      planDescription: paymentDetails?.planDescription || paymentDetails?.planSubtitle,
      amount: paymentDetails?.amount?.toString(),
      planAmount: paymentDetails?.planAmount?.toString() || paymentDetails?.amount?.toString(),
      billingCycle: paymentDetails?.billingCycle,
      confirmationNumber: paymentDetails?.paymentId || paymentId
    };
    console.log('Computed subscriptionData:', data);
    console.log('Original paymentDetails:', paymentDetails);
    return data;
  }, [paymentDetails, paymentId]);

  const fetchPaymentDetails = async (id: string) => {
    try {
      const details = await NodeService.getPaymentDetails(id);
      console.log('Payment Details API Response:', details);
      console.log('Payment Details Keys:', details ? Object.keys(details) : 'No details');
      setPaymentDetails(details);
    } catch (error) {
      console.error('Error fetching payment details:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch payment details');
    }
  };

  useEffect(() => {
    // Debug logging
    console.log('Payment Confirmation - Location State:', location.state);
    console.log('Payment ID:', paymentId);
    console.log('User Profile ID:', userProfileId);

    // Fetch payment details if we have a payment ID
    if (paymentId) {
      fetchPaymentDetails(paymentId);
    }

    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.state, paymentId, userProfileId]);

    const handleDownloadReceipt = async () => {
  if (paymentDetails?.invoicePdf) {
    // Download the actual PDF from Stripe
    const a = document.createElement('a');
    a.href = paymentDetails.invoicePdf;
    a.download = `receipt-${paymentDetails.invoiceNumber || paymentDetails.paymentId || 'invoice'}.pdf`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // Load the logo as base64
  // const logoBase64 = await getBase64FromUrl('/assets/img/nodeWhite.png');

  // Generate a text-based PDF with all variables, compact spacing
  const doc = new jsPDF();

  // Add the logo image (x, y, width, height)
  // doc.addImage(logoBase64, 'PNG', 80, 5, 50, 20); // Adjust as needed

  doc.setFontSize(22);
  doc.text('Payment Receipt', 105, 35, { align: 'center' });

  doc.setFontSize(12);
  let y = 50;
  doc.text(`Confirmation #: ${paymentDetails?.paymentId || ''}`, 20, y); y += 8;
  doc.text('Plan:', 20, y);
  doc.text(paymentDetails?.planName || '', 60, y, { maxWidth: 120 }); y += 8;
  doc.text(paymentDetails?.planDescription || '', 60, y, { maxWidth: 170 }); y += 8;
  doc.text('Billing Amount:', 20, y);
  doc.text(
    `$${paymentDetails?.planAmount?.toFixed(2) || ''}/${paymentDetails?.billingCycle || ''}`,
    60, y
  ); y += 8;
  doc.text('Status:', 20, y);
  doc.text(paymentDetails?.subscriptionStatus || paymentDetails?.status || '', 60, y); y += 8;
  // Invoice Number and Invoice Date removed
  // Optionally add period and userProfileId here, using y += 8 each time

  doc.setFontSize(14);
  y += 12;
  doc.text('Thank you for your subscription!', 20, y);

  doc.save(`receipt-${paymentDetails?.paymentId || 'payment'}.pdf`);
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

  // Show error if no payment details are available
  if (!paymentDetails && !isLoading) {
    return (
      <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '4rem', height: '4rem' }}>
            <Icon name="AlertCircle" size={32} className="text-warning" />
          </div>
          <h1 className="text-light fw-bold mb-2">Payment Details Not Found</h1>
          <p className="text-light text-opacity-75 mb-4">Unable to retrieve payment information. Please contact support if you believe this is an error.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/user-dashboard')}
          >
            Go to Dashboard
          </button>
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
                  <div id="receipt-section" className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                    
                    {/* Payment Success Header */}
                    <div className="text-center mb-5">
                      <div className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '4rem', height: '4rem' }}>
                        <Icon name="CheckCircle" size={32} className="text-success" />
                      </div>
                      <h1 className="text-light fw-bold mb-2 fs-1">Payment Successful!</h1>
                      <p className="text-light text-opacity-75 mb-2">
                        Your subscription has been activated
                      </p>
                      {subscriptionData.confirmationNumber && (
                        <p className="text-light text-opacity-50 small">
                          Confirmation #: <span className="text-light fw-medium">{subscriptionData.confirmationNumber}</span>
                        </p>
                      )}
                    </div>

                    {/* Subscription Details */}
                    <div className="mb-5">
                      <h2 className="text-light fw-medium mb-4 d-flex align-items-center fs-3">
                        <Icon name="CreditCard" size={20} className="me-2" />
                        Subscription Details
                      </h2>
                      
                      <div className="border-top border-light border-opacity-10">
                        {subscriptionData.planName && (
                          <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-light border-opacity-10">
                            <span className="text-light text-opacity-75">Plan</span>
                            <div className="text-end">
                              <div className="text-light fw-medium">{subscriptionData.planName}</div>
                              {subscriptionData.planDescription && (
                                <div className="text-light text-opacity-50 small">{subscriptionData.planDescription}</div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {subscriptionData.planAmount && (
                          <div className="d-flex justify-content-between align-items-center py-3 border-bottom border-light border-opacity-10">
                            <span className="text-light text-opacity-75">Billing Amount</span>
                            <span className="text-light fw-medium">
                              ${subscriptionData.planAmount}
                              {subscriptionData.billingCycle && `/${subscriptionData.billingCycle}`}
                            </span>
                          </div>
                        )}
                        
                        <div className="d-flex justify-content-between align-items-center py-3">
                          <span className="text-light text-opacity-75">Status</span>
                          <div className="d-flex align-items-center">
                            <div className="bg-success rounded-circle me-2" style={{ width: '0.5rem', height: '0.5rem' }}></div>
                            <span className="text-success fw-medium">{paymentDetails?.subscriptionStatus || paymentDetails?.status || 'Active'}</span>
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
      </div>
      </Wrapper>
    </>
  );
};

export default PaymentConfirmation;