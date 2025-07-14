import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SuccessHeader from './components/SuccessHeader';
import SubscriptionDetailsCard from './components/SubscriptionDetailsCard';
import EmailConfirmationNotice from './components/EmailConfirmationNotice';
import QuickActions from './components/QuickActions';
import AccountSetupInstructions from './components/AccountSetupInstructions';
import TrustReinforcement from './components/TrustReinforcement';

const PaymentConfirmation = () => {
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your payment...</p>
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

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="CreditCard" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">N0de</span>
              </Link>
              
              <Button variant="outline" asChild>
                <Link to="/user-dashboard">
                  <Icon name="LayoutDashboard" size={16} className="mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-2xl mx-auto">
            <SuccessHeader confirmationNumber={mockSubscription.confirmationNumber} />
            
            <SubscriptionDetailsCard subscription={mockSubscription} />
            
            <EmailConfirmationNotice email={mockSubscription.customerEmail} />
            
            <QuickActions onDownloadReceipt={handleDownloadReceipt} />
            
            <AccountSetupInstructions />
            
            <TrustReinforcement />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-6 mb-4">
                <Link to="/support-center" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Support Center
                </Link>
                <Link to="/billing-management" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Billing
                </Link>
                <button className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </button>
                <button className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Terms of Service
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} N0de. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PaymentConfirmation;