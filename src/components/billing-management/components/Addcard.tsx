import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Icon from '../../../components/AppIcon';
import HeaderDashboard from '../../../layouts/headers/HeaderDashboard';
import FooterOne from '../../../layouts/footers/FooterOne';
import { NodeService } from '../../../services/Node';
import { AuthContext } from '../../../context/AuthContext';

// Payment Form Component that uses Stripe Elements
const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardName: ''
  });

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#fff',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#9CA3AF',
        },
        ':-webkit-autofill': {
          color: '#fff',
        },
      },
      invalid: {
        color: '#EF4444',
      },
    },
    hidePostalCode: true,
    classes: {
      base: 'w-full',
      focus: 'focus:outline-none',
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!stripe || !elements) {
      setError('Stripe has not been properly initialized');
      return;
    }

    if (!formData.cardName) {
      setError('Please enter the cardholder name');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Starting payment method addition flow...');
      
      // Get user email from React context
      const userEmail = userData?.email?.toLowerCase();
      console.log('Retrieved user email from context:', userEmail);
      
      if (!userEmail) {
        console.error('No user email found in auth context');
        throw new Error('User not authenticated. Please sign in again.');
      }

      // Always fetch and update customer ID from the server
      console.log('Fetching customer data for email:', userEmail);
      
      const customerData = await NodeService.getStripeCustomer(userEmail);
      console.log('Customer data received:', customerData);
      
      const customerId = customerData.id;
      
      if (!customerId) {
        console.error('No customer ID found in response:', customerData);
        throw new Error('No customer ID found in the response');
      }

      console.log('Customer ID retrieved:', customerId);

      // Create payment method
      console.log('Creating payment method...');
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
        billing_details: {
          name: formData.cardName,
        },
      });

      console.log('Payment method creation result:', { paymentMethod, stripeError });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
        throw new Error(stripeError.message || 'Failed to create payment method');
      }
      
      if (!paymentMethod?.id) {
        console.error('Payment method ID is missing');
        throw new Error('Payment method ID is missing');
      }

      // Save payment method to customer
      console.log('Saving payment method for customer:', customerId);
      
      const responseData = await NodeService.savePaymentMethod(
        customerId, 
        paymentMethod.id, 
        true
      );
      
      console.log('✅ Card saved successfully:', responseData);
      
      toast.success('Card added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      
      // Give the toast time to show before navigating
      setTimeout(() => {
        navigate('/billing-management');
      }, 1500);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  // Update your JSX to use CardElement instead of manual inputs
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <HeaderDashboard />
      <ToastContainer />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb Navigation */}
          <nav className="d-inline-flex align-items-center bg-dark-light rounded-pill px-4 py-2 mb-6 mt-4" data-cue="fadeIn" aria-label="Breadcrumb">
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
              <span>Add Payment Method</span>
            </span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
              <h1 className="text-2xl font-bold">
                <span className="text-gradient-primary">Add New Card</span>
              </h1>
            </div>
            <p className="text-gray-300">Securely add a new payment method to your account.</p>
          </div>

          <div className="max-w-md mx-auto">
            <form id="cardForm" onSubmit={handleSubmit}>
              <div className="border border-gray-700 rounded-4xl p-6 bg-gray-900 overflow-hidden shadow-xl space-y-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Card Information
                  </label>
                  <div className="w-full bg-black border border-gray-600 rounded-2xl px-4 py-3">
                    <CardElement 
                      options={{
                        ...CARD_ELEMENT_OPTIONS,
                        style: {
                          ...CARD_ELEMENT_OPTIONS.style,
                          base: {
                            ...CARD_ELEMENT_OPTIONS.style.base,
                            '::placeholder': {
                              color: '#9CA3AF',
                            },
                          },
                        },
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
                <style>{`
                  .StripeElement {
                    width: 100% !important;
                    padding: 0 !important;
                  }
                  .StripeElement--focus {
                    outline: none;
                    box-shadow: none;
                  }
                  .StripeElement input {
                    width: 100% !important;
                  }
                `}</style>

                <div className="space-y-2 w-full">
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-300">
                    Name on Card
                  </label>
                  <div className="w-full">
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-3 bg-black border border-gray-600 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-400 text-sm mt-2">
                    {error}
                  </div>
                )}

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    form="cardForm"
                    disabled={!stripe || isLoading}
                    className="w-full max-w-xs py-5 px-10 text-base font-semibold text-white shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(145deg, #3b82f6, #2563eb)',
                      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                      borderRadius: '9999px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(145deg, #2563eb, #1d4ed8)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(145deg, #3b82f6, #2563eb)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)';
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid #93c5fd';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Add Card'
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterOne />
    </div>
  );
};

// Main component that wraps the payment form with Stripe Elements
const AddCard: React.FC = () => {
  const [stripePublicKey, setStripePublicKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch Stripe public key on mount
  useEffect(() => {
    let isMounted = true;
    
    const fetchPublicKey = async () => {
      try {
        const key = await NodeService.getStripePublicKey();
        if (isMounted) {
          setStripePublicKey(key);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching Stripe public key:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchPublicKey();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const stripePromise = React.useMemo(
    () => stripePublicKey ? loadStripe(stripePublicKey) : null,
    [stripePublicKey]
  );

  if (isLoading || !stripePublicKey) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <HeaderDashboard />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="d-flex align-items-center justify-content-center" style={{ 
              height: 'calc(100vh - 200px)'
            }}>
              <div className="text-center">
                <div className="spinner-border text-primary mb-3" role="status" style={{ width: '4rem', height: '4rem' }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-light mb-0">Initializing payment form...</p>
              </div>
            </div>
          </div>
        </main>
        <FooterOne />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default AddCard;