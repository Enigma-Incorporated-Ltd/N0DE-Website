import React, { useEffect, useState, useRef, useContext } from 'react';
import { formatCurrency, AccountService } from '../../services/Account';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeaderDashboard from '../../layouts/headers/HeaderDashboard';
import Wrapper from '../../common/Wrapper';
import Icon from '../../components/AppIcon';
import { NodeService } from '../../services/Node';
import { AuthContext } from '../../context/AuthContext';
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
  planName: string;
  planSubtitle: string;
  planDescription: string;
  planAmount: number;
  billingCycle: string;
  subscriptionStatus: string;
}

const PaymentConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasProcessedRef = useRef(false);
  const hasFetchedDetailsRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, loading: authLoading } = useContext(AuthContext);

  const urlParams = new URLSearchParams(location.search);
  const paymentIntentId = urlParams.get('payment_intent');
  const userProfileIdFromUrl = urlParams.get('user_profile_id');
  const customerId = urlParams.get('customer_id');
  const subscriptionId = urlParams.get('subscription_id');
  const planId = urlParams.get('plan_id');

  const effectivePaymentId = paymentIntentId;

  const subscriptionData = React.useMemo(() => {
    return {
      planName: paymentDetails?.planName,
      planDescription: paymentDetails?.planDescription || paymentDetails?.planSubtitle,
      amount: paymentDetails?.amount?.toString(),
      planAmount: paymentDetails?.planAmount?.toString() || paymentDetails?.amount?.toString(),
      billingCycle: paymentDetails?.billingCycle,
      confirmationNumber: paymentDetails?.paymentId || effectivePaymentId,
    };
  }, [paymentDetails, effectivePaymentId]);

  const fetchPaymentDetails = async (id: string) => {
    try {
      if (hasFetchedDetailsRef.current) {
        return;
      }

      hasFetchedDetailsRef.current = true;
      const details = await NodeService.getPaymentDetails(id);
      setPaymentDetails(details);
    } catch (err) {
      console.error('Error fetching payment details:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch payment details');
    }
  };

  useEffect(() => {
    if (authLoading || hasProcessedRef.current || !paymentIntentId) {
      return;
    }

    if (!userData?.id && !AccountService.getCurrentUserId()) {
      hasProcessedRef.current = true;
      setIsLoading(false);
      setError('Your session could not be restored. Please log in again.');
      return;
    }

    const handlePaymentConfirmation = async () => {
      try {
        setIsLoading(true);
        hasProcessedRef.current = true;

        let invoiceResponse: { id?: string } | null = null;

        if (paymentIntentId && userProfileIdFromUrl) {
          try {
            const effectiveUserId = userData?.id || AccountService.getCurrentUserId() || '';

            invoiceResponse = await NodeService.createPaymentInvoice(
              paymentIntentId,
              userProfileIdFromUrl,
              effectiveUserId,
              customerId || '',
              subscriptionId || '',
              planId ? parseInt(planId, 10) : 0
            );
          } catch (invoiceErr) {
            console.error('Error creating payment invoice:', invoiceErr);
            setError('Payment succeeded but failed to record invoice. Please contact support.');
          }
        }

        const idToFetch = invoiceResponse?.id;
        if (idToFetch) {
          await fetchPaymentDetails(idToFetch);
        }
      } catch (err) {
        console.error('Error handling payment confirmation:', err);
        setError(err instanceof Error ? err.message : 'Failed to process payment confirmation');
      } finally {
        setIsLoading(false);
      }
    };

    handlePaymentConfirmation();
  }, [paymentIntentId, effectivePaymentId, authLoading, userData?.id]);

  const handleDownloadReceipt = async () => {
    if (paymentDetails?.invoicePdf) {
      const a = document.createElement('a');
      a.href = paymentDetails.invoicePdf;
      a.download = `receipt-${paymentDetails.invoiceNumber || paymentDetails.paymentId || 'invoice'}.pdf`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('Payment Receipt', 105, 35, { align: 'center' });

    doc.setFontSize(12);
    let y = 50;
    doc.text(`Confirmation #: ${paymentDetails?.paymentId || ''}`, 20, y);
    y += 8;
    doc.text('Plan:', 20, y);
    doc.text(paymentDetails?.planName || '', 60, y, { maxWidth: 120 });
    y += 8;
    doc.text(paymentDetails?.planDescription || '', 60, y, { maxWidth: 170 });
    y += 8;
    doc.text('Billing Amount:', 20, y);
    doc.text(
      `${formatCurrency(paymentDetails?.planAmount || 0)}${paymentDetails?.billingCycle ? `/${paymentDetails.billingCycle}` : ''}`,
      60,
      y
    );
    y += 8;
    doc.text('Status:', 20, y);
    doc.text(paymentDetails?.subscriptionStatus || paymentDetails?.status || '', 60, y);
    y += 8;

    doc.setFontSize(14);
    y += 12;
    doc.text('Thank you for your subscription!', 20, y);

    doc.save(`receipt-${paymentDetails?.paymentId || 'payment'}.pdf`);
  };

  const handleGoToDashboard = () => {
    navigate('/user-dashboard');
  };

  if (authLoading || isLoading) {
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

  if (error && !paymentDetails) {
    return (
      <>
        <Helmet>
          <title>Payment Error - N0DE</title>
        </Helmet>
        <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
          <div className="text-center" style={{ maxWidth: 480, padding: '0 1.5rem' }}>
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{ width: '5rem', height: '5rem', background: 'rgba(220, 53, 69, 0.15)' }}
            >
              <Icon name="AlertCircle" size={40} className="text-danger" />
            </div>
            <h1 className="text-light fw-bold mb-3 fs-3">Payment Processing Issue</h1>
            <p className="text-light text-opacity-75 mb-4" style={{ lineHeight: 1.6 }}>
              {error}
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <button className="btn btn-primary px-4" onClick={() => navigate('/user-dashboard')}>
                <Icon name="LayoutDashboard" size={16} className="me-2" />
                Go to Dashboard
              </button>
              <button className="btn btn-outline-light px-4" onClick={() => navigate('/support-center')}>
                <Icon name="Headphones" size={16} className="me-2" />
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!paymentDetails && !isLoading) {
    return (
      <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div
            className="bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: '4rem', height: '4rem' }}
          >
            <Icon name="AlertCircle" size={32} className="text-warning" />
          </div>
          <h1 className="text-light fw-bold mb-2">Payment Details Not Found</h1>
          <p className="text-light text-opacity-75 mb-4">
            Unable to retrieve payment information. Please contact support if you believe this is an error.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/user-dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!paymentDetails) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Payment Successful - N0DE</title>
        <meta
          name="description"
          content="Your subscription payment has been processed successfully. Access your dashboard and start using your new plan."
        />
      </Helmet>

      <Wrapper>
        <div className="bg-dark position-relative">
          <div style={{ borderBottom: 'none', boxShadow: 'none' }}>
            <HeaderDashboard />
          </div>
          <div style={{ marginTop: '80px' }}>
            {error && (
              <div className="section-space-sm-y">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div
                        className="alert alert-danger d-flex align-items-center justify-content-between mb-0"
                        role="alert"
                        style={{ backgroundColor: '#dc3545', borderColor: '#dc3545' }}
                      >
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

            <div className="section-space-sm-y">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8">
                    <div id="receipt-section" className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
                      <div className="text-center mb-5">
                        <div
                          className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{ width: '4rem', height: '4rem' }}
                        >
                          <Icon name="CheckCircle" size={32} className="text-success" />
                        </div>
                        <h1 className="text-light fw-bold mb-2 fs-1">Payment Successful!</h1>
                        <p className="text-light text-opacity-75 mb-2">Your subscription has been activated</p>
                        {subscriptionData.confirmationNumber && (
                          <p className="text-light text-opacity-50 small">
                            Confirmation #:{' '}
                            <span className="text-light fw-medium">{subscriptionData.confirmationNumber}</span>
                          </p>
                        )}
                      </div>

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
                                {formatCurrency(subscriptionData.planAmount)}
                                {subscriptionData.billingCycle && `/${subscriptionData.billingCycle}`}
                              </span>
                            </div>
                          )}

                          <div className="d-flex justify-content-between align-items-center py-3">
                            <span className="text-light text-opacity-75">Status</span>
                            <div className="d-flex align-items-center">
                              <div className="bg-success rounded-circle me-2" style={{ width: '0.5rem', height: '0.5rem' }} />
                              <span className="text-success fw-medium">
                                {paymentDetails.subscriptionStatus || paymentDetails.status || 'Active'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

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

            <div className="section-space-sm-y">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6">
                      <div className="row g-4 text-center">
                        <div className="col-12 col-md-4">
                          <div className="d-flex flex-column align-items-center">
                            <div
                              className="bg-success bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3"
                              style={{ width: '3rem', height: '3rem' }}
                            >
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
                            <div
                              className="bg-primary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3"
                              style={{ width: '3rem', height: '3rem' }}
                            >
                              <Icon name="Zap" size={24} className="text-primary" />
                            </div>
                            <h3 className="text-light fw-medium mb-2">Instant Access</h3>
                            <p className="text-light text-opacity-75 mb-0">All features are now active and ready to use</p>
                          </div>
                        </div>

                        <div className="col-12 col-md-4">
                          <div className="d-flex flex-column align-items-center">
                            <div
                              className="bg-warning bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center mb-3"
                              style={{ width: '3rem', height: '3rem' }}
                            >
                              <Icon name="Headphones" size={24} className="text-warning" />
                            </div>
                            <h3 className="text-light fw-medium mb-2">24/7 Support</h3>
                            <p className="text-light text-opacity-75 mb-0">Our support team is here to help you get started</p>
                          </div>
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
