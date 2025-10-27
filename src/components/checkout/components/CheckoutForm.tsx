import React, { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

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

    // Get the return URL for payment confirmation page with necessary parameters
    const returnUrl = new URL('/payment-confirmation', window.location.origin);
    returnUrl.searchParams.set('payment_intent', intentMeta?.clientSecret?.split('_secret_')[0] || '');
    returnUrl.searchParams.set('user_profile_id', invoiceData?.userProfileId || intentMeta?.userProfileId || '');
    returnUrl.searchParams.set('customer_id', intentMeta?.customerId || '');
    returnUrl.searchParams.set('subscription_id', intentMeta?.subscriptionId || '');
    returnUrl.searchParams.set('plan_id', (planId || 0).toString());

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl.toString()
        }
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "Payment failed");
        } else {
          setMessage("Stripe payment failed.Please contact support.");
        }
        setIsProcessing(false);
      } else {
        // Payment succeeded - Stripe will redirect to return_url automatically
        setMessage('Payment successful! Redirecting...');
        // No need to check paymentIntent status as Stripe handles redirect
      }
    } catch (err: any) {
      setMessage('Stripe payment failed.Please contact support.');
      setIsProcessing(false);
    }
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