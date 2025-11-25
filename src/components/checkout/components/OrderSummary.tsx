import React from 'react';
import Icon from '../../../components/AppIcon';
import { currencyConfig } from '../../../services/Account';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: string;
  features: PlanFeature[] | string[];
  tax?: number;
}

interface TaxInfo {
  hasTax: boolean;
  taxRate: number;
  taxAmount: number;
  country?: string;
}

interface OrderSummaryProps {
  selectedPlan: Plan | null;
  taxInfo?: TaxInfo | null;
  isCheckingTax?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ selectedPlan, taxInfo, isCheckingTax }) => {
  if (!selectedPlan) {
    return <div className="text-light">No plan selected.</div>;
  }

  // Add null checks and default values for price calculations
  const priceValue = typeof selectedPlan.price === 'number' ? selectedPlan.price : 0;

  // Calculate tax for display (tax is inclusive, so subtotal = total)
  let taxPercent = 0;
  let tax = 0;
  if (taxInfo && taxInfo.hasTax) {
    taxPercent = taxInfo.taxRate;
    tax = taxInfo.taxAmount / 100; // Convert from cents to currency
  } else if (typeof selectedPlan.tax === 'number') {
    taxPercent = selectedPlan.tax;
    // Calculate tax amount from inclusive price: tax = price * (rate / (100 + rate))
    tax = priceValue * (taxPercent / (100 + taxPercent));
  }

  // Tax is inclusive in the price, so we show subtotal = total
  const subtotal = priceValue;
  const total = priceValue;
  const billingLabel = selectedPlan.billingCycle === 'yearly' ? 'Billed Yearly' : 'Billed Monthly';

  // Helper function to render features
  const renderFeature = (feature: PlanFeature | string, index: number) => {
    const isObject = typeof feature === 'object';
    const featureText = isObject ? feature.text : feature;
    const isIncluded = isObject ? feature.included : true;

    return (
      <li key={index} className="d-flex align-items-center mb-2 text-light text-opacity-75 small">
        <Icon
          name={isIncluded ? "Check" : "X"}
          size={14}
          className={`me-2 flex-shrink-0 ${isIncluded ? 'text-success' : 'text-secondary'}`}
        />
        <span className={isIncluded ? 'text-light text-opacity-75' : 'text-secondary'}>
          {featureText}
        </span>
      </li>
    );
  };

  return (
    <div className="bg-dark-gradient border border-light border-opacity-10 rounded-5 p-6 shadow-sm">
      <h2 className="text-light fw-medium mb-4">Order Summary</h2>
      {/* Plan Details */}
      <div className="mb-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="text-light fw-medium mb-1">{selectedPlan.name || 'Plan'} Plan</h3>
            <p className="text-light text-opacity-75 small mb-0 text-capitalize">
              {billingLabel}
            </p>
          </div>
          <div className="text-end">
            <p className="text-light fw-semibold mb-0">{currencyConfig.format(priceValue)}</p>
            <p className="text-light text-opacity-75 small mb-0">
              {selectedPlan.billingCycle === 'yearly' ? 'per year' : 'per month'}
            </p>
          </div>
        </div>
        {/* Features */}
        <div className="pt-4 border-top border-light border-opacity-10">
          <p className="text-light fw-medium mb-3 small">
            Included features:
          </p>
          <ul className="list-unstyled mb-0">
            {(selectedPlan.features || []).map((feature, index) => renderFeature(feature, index))}
          </ul>
        </div>
      </div>
      {/* Pricing Breakdown */}
      <div className="pt-4 border-top border-light border-opacity-10">
        <div className="d-flex justify-content-between mb-2 small">
          <span className="text-light text-opacity-75">Subtotal</span>
          <span className="text-light">{currencyConfig.format(subtotal)}</span>
        </div>
        {isCheckingTax ? (
          <div className="d-flex justify-content-between mb-3 small">
            <span className="text-light text-opacity-75">Tax (inclusive)</span>
            <span className="text-light text-opacity-50">
              <span className="spinner-border spinner-border-sm me-1" role="status" style={{ width: '0.8rem', height: '0.8rem' }}>
                <span className="visually-hidden">Loading...</span>
              </span>
              Checking...
            </span>
          </div>
        ) : (
          <div className="d-flex justify-content-between mb-3 small">
            <span className="text-light text-opacity-75">Tax (inclusive)</span>
            <span className="text-light">{currencyConfig.format(tax)}</span>
          </div>
        )}
        <div className="d-flex justify-content-between pt-2 border-top border-light border-opacity-10 mb-2">
          <span className="text-light fw-semibold">
            Total per {selectedPlan.billingCycle === 'yearly' ? 'year' : 'month'}
          </span>
          <span className="text-light fw-semibold">{currencyConfig.format(total)}</span>
        </div>
        <div className="small text-light text-opacity-75">
          Billed at the start of the period
        </div>
      </div>
      {/* Security Badge */}
      <div className="mt-4 pt-4 border-top border-light border-opacity-10">
        <div className="d-flex align-items-center justify-content-center">
          <Icon name="Shield" size={16} className="text-success me-2" />
          <span className="text-light text-opacity-75 small">Secured by Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;