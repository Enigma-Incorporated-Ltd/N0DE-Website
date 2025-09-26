import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { NodeService } from "../../../services/Node";
import AccountService from "../../../services/Account";

interface CheckoutFormProps {
  invoiceData?: {
    id: string;
    userProfileId: string;
  };
  intentMeta?: {
    clientSecret?: string;
    userProfileId?: string;
    customerId?: string;
    subscriptionId?: string;
  };
  planId?: number;
}

export default function CheckoutForm({ invoiceData, intentMeta, planId }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const paymentResult = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Navigate to payment confirmation with invoice data
        return_url: `${window.location.origin}/payment-confirmation`,
      },
    });

    if (paymentResult.error) {
      if (paymentResult.error.type === "card_error" || paymentResult.error.type === "validation_error") {
        setMessage(paymentResult.error.message || "Payment failed");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      const confirmedIntent = (paymentResult as any)?.paymentIntent;
      const effectiveUserProfileId = invoiceData?.userProfileId || intentMeta?.userProfileId;
      const effectiveCustomerId = intentMeta?.customerId;
      const effectiveSubscriptionId = intentMeta?.subscriptionId;
      // Record invoice in backend then navigate to confirmation
      try {
        const effectiveUserId = AccountService.getCurrentUserId() || '';
        const invoiceResponse = await NodeService.createPaymentInvoice(
          confirmedIntent?.id || '',
          effectiveUserProfileId || '',
          effectiveUserId,
          effectiveCustomerId || '',
          effectiveSubscriptionId || '',
          planId || 0
        );

        if (invoiceResponse?.id) {
          navigate('/payment-confirmation', {
            state: {
              id: invoiceResponse.id,
              userProfileId: invoiceResponse.userProfileId || effectiveUserProfileId || ''
            }
          });
        } 
      } catch (err: any) {
        console.error('Error during invoice creation:', err);
        setMessage('Payment succeeded but failed to create invoice. Please contact support.');
      }
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}