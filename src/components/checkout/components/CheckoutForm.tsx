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
      redirect: 'if_required'
    });

    if (paymentResult.error) {
      if (paymentResult.error.type === "card_error" || paymentResult.error.type === "validation_error") {
        setMessage(paymentResult.error.message || "Payment failed");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else {
      const confirmedIntent = (paymentResult as any)?.paymentIntent;
      if (confirmedIntent?.status === 'succeeded') {
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
      } else if (confirmedIntent?.status === 'processing') {
        setMessage('Your payment is processing.');
      } else {
        setMessage('Payment was not successful, please try again.');
      }
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <PaymentElement id="payment-element" />
      </div>
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="btn btn-primary w-100 rounded-pill px-5 py-2 fw-semibold d-flex justify-content-center align-items-center"
        style={{
          background: 'linear-gradient(90deg, #7c5cff 0%, #6a5cff 100%)',
          border: 'none'
        }}
      >
        <span id="button-text">
          {isProcessing ? "Processing ..." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="mt-3 alert alert-danger" role="alert">
          {message}
        </div>
      )}
    </form>
  );
}