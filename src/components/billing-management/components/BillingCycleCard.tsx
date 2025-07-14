import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

interface BillingInfo {
  currentPlan: string;
  planDescription: string;
  monthlyAmount: string;
  nextBillingDate: string;
  nextAmount: string;
  autoRenewal: boolean;
}

interface BillingCycleCardProps {
  billingInfo: BillingInfo;
  onToggleAutoRenewal: (enabled: boolean) => void;
  onChangePlan: () => void;
}

const BillingCycleCard: React.FC<BillingCycleCardProps> = ({ billingInfo, onToggleAutoRenewal, onChangePlan }) => {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleAutoRenewal = async () => {
    setIsToggling(true);
    // Simulate API call
    setTimeout(() => {
      setIsToggling(false);
      onToggleAutoRenewal(!billingInfo.autoRenewal);
    }, 1500);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card-gl-dark rounded-4 p-4" data-cue="fadeIn">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h3 className="text-light fw-semibold mb-0">Billing Cycle</h3>
        <button
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
          onClick={onChangePlan}
        >
          <Icon name="ArrowUpDown" size={14} />
          <span>Change Plan</span>
        </button>
      </div>

      <div className="d-flex flex-column gap-4">
        {/* Current Plan */}
        <div className="card-gl-light rounded-3 p-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center bg-primary-gradient rounded-3" style={{ width: '40px', height: '40px' }}>
              <Icon name="Zap" size={20} className="text-white" />
            </div>
            <div>
              <div className="text-light fw-medium">{billingInfo.currentPlan}</div>
              <div className="text-light-50 fs-14">{billingInfo.planDescription}</div>
            </div>
          </div>
          <div className="text-end">
            <div className="text-light fw-bold">${billingInfo.monthlyAmount}</div>
            <div className="text-light-50 fs-14">per month</div>
          </div>
        </div>

        {/* Next Billing Date */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Icon name="Calendar" size={20} className="text-light-50" />
            <div>
              <div className="text-light fw-medium fs-14">Next Billing Date</div>
              <div className="text-light-50 fs-14">{formatDate(billingInfo.nextBillingDate)}</div>
            </div>
          </div>
          <div className="text-end">
            <div className="text-light fw-medium">${billingInfo.nextAmount}</div>
            <div className="text-light-50 fs-12">Amount due</div>
          </div>
        </div>

        {/* Auto Renewal Toggle */}
        <div className="card-gl-light rounded-3 p-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <Icon name="RotateCcw" size={20} className="text-light-50" />
            <div>
              <div className="text-light fw-medium fs-14">Auto-Renewal</div>
              <div className="text-light-50 fs-14">
                {billingInfo.autoRenewal ? 'Automatically renew subscription' : 'Manual renewal required'}
              </div>
            </div>
          </div>
          <button
            className={`btn btn-sm d-flex align-items-center gap-2 ${
              billingInfo.autoRenewal ? 'btn-primary' : 'btn-outline-primary'
            }`}
            onClick={handleToggleAutoRenewal}
            disabled={isToggling}
          >
            {isToggling ? (
              <Icon name="Loader2" size={14} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Icon name={billingInfo.autoRenewal ? "ToggleRight" : "ToggleLeft"} size={14} />
            )}
            <span>{billingInfo.autoRenewal ? 'On' : 'Off'}</span>
          </button>
        </div>

        {/* Billing Cycle Information */}
        <div className="card-gl-light rounded-3 p-4 border-1 border-warning">
          <div className="d-flex align-items-start gap-3">
            <Icon name="Info" size={16} className="text-warning" style={{ marginTop: '2px' }} />
            <div className="text-light-50 fs-14">
              <div className="text-light fw-medium mb-1">Billing Cycle Information</div>
              <div>
                Your subscription renews on the {new Date(billingInfo.nextBillingDate).getDate()}
                {new Date(billingInfo.nextBillingDate).getDate() === 1 ? 'st' : 
                  new Date(billingInfo.nextBillingDate).getDate() === 2 ? 'nd' : 
                  new Date(billingInfo.nextBillingDate).getDate() === 3 ? 'rd' : 'th'} of each month.
                You can cancel anytime before your next billing date.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingCycleCard;