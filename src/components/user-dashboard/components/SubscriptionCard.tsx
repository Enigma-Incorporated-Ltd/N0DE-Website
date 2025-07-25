import  { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { NodeService } from '../../../services';
import { AccountService } from '../../../services';

interface UserPlan {
  planId: number;
  planName: string;
  planPrice: string;
  planStatus: string;
 billingCycle: string;
 planSubtitle: string;
}


type Subscription = {
  plan: 'LITE' | 'PRO' | 'MAX' | string;
  price: number;
  status: 'active' | 'cancelled' | 'past_due' | string;
  nextBillingDate: string;
  lastFourDigits: string;
};

type Props = {
  subscription: Subscription;
  onChangePlan: () => void;
  onUpdatePayment: () => void;
};

const SubscriptionCard: React.FC<Props> = ({
  subscription,
  onChangePlan,
  onUpdatePayment
  // onCancelSubscription // Removed, not in Props
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success';
      case 'cancelled':
        return 'text-danger bg-danger';
      case 'past_due':
        return 'text-warning bg-warning';
      default:
        return 'text-secondary bg-secondary';
    }
  };

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'LITE':
        return 'Zap';
      case 'PRO':
        return 'Star';
      case 'MAX':
        return 'Crown';
      default:
        return 'Package';
    }
  };
 
const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
const [refreshTrigger, setRefreshTrigger] = useState(0); // 👈 trigger to re-run fetch

  const fetchUserData = async () => {
    try {
      const userIdRaw = AccountService.getCurrentUserId();
      const userId = userIdRaw || '';
      const response = await NodeService.getUserPlanDetails(userId);
      if (!response) throw new Error('Invalid user plan data');
      setUserPlan({
        planId: response.planId ?? 0, // default to 0 if undefined
        planName: response.planName,
        planPrice: response.planPrice,
        planStatus: response.planStatus,
        billingCycle: response.billingCycle ?? '',
        planSubtitle: response.planSubtitle ?? ''
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const userId = AccountService.getCurrentUserId();
      if (isNaN(Number(userPlan?.planId ?? 0))) throw new Error('Invalid Plan ID');
      if (!userId) throw new Error('User not found');
      const success = await NodeService.cancelSubscription(userId, Number(userPlan?.planId ?? 0));

      if (success) {
        setRefreshTrigger(prev => prev + 1); // trigger re-fetch
      } else {
        console.error('Cancellation API returned false');
      }
    } catch (error) {
      console.error('Cancel subscription failed:', error);
    }
  };

    useEffect(() => {
    fetchUserData();
  }, [refreshTrigger]); // 👈 re-run on refreshTrigger change

  if (!userPlan) {
    return (
      <div className="bg-dark border border-secondary rounded-3 p-3 shadow-sm d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100px' }}>
        <h2 className="text-light h5 mb-2">No plan available</h2>
        <button
          type="button"
          onClick={onChangePlan}
          className="btn btn-primary-gradient text-white fs-6 rounded-pill d-flex align-items-center justify-content-center py-2 mt-2"
        >
          <Icon name="ArrowUpDown" size={16} className="me-2" />
          Choose Plan
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark border border-secondary rounded-3 p-3 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', minHeight: '100px', display: 'flex', flexDirection: 'column' }}>
      <div>
        <div className="d-flex align-items-start justify-content-between mb-2">
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center me-3 rounded-2 bg-primary-gradient" style={{ width: '48px', height: '48px' }}>
              <Icon name={getPlanIcon(subscription.plan)} size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-light h5 mb-1">{userPlan ? userPlan.planName : 'Loading...'}</h2>
              <p className="text-light opacity-75 mb-0">${userPlan ? userPlan.planPrice : 'Loading...'}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-pill text-white fs-6 fw-medium ${getStatusColor(userPlan?.planStatus || 'Loading')}`} style={{ fontSize: '0.875rem' }}>
            {userPlan?.planStatus ? userPlan.planStatus.charAt(0).toUpperCase() + userPlan.planStatus.slice(1) : 'Loading'}
          </div>
        </div>

        <div className="row align-items-center mb-2">
          <div className="col-md-6 mb-2 mb-md-0">
            <div className="d-flex align-items-center justify-content-start mb-2">
              <Icon name="Calendar" size={16} className="text-light opacity-75 me-2" />
              <span className="text-light opacity-75 fs-6">Billing Cycle</span>
            </div>
            <p className="text-light fw-medium mb-0 fs-5" style={{marginTop: '0.5rem'}}>
              {userPlan ? userPlan.billingCycle.charAt(0).toUpperCase() + userPlan.billingCycle.slice(1) : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
      {/* Plan Details section above buttons */}
      <div className="w-100 d-flex flex-column align-items-center mb-2">
        <div className="d-flex align-items-center mb-2">
          <Icon name="CreditCard" size={16} className="text-light opacity-75 me-2" />
          <span className="text-light opacity-75 fs-6">Plan Details</span>
        </div>
        <span className="text-light fw-bold mb-0 fs-4 text-center">{userPlan ? userPlan.planSubtitle : 'Loading...'}</span>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-2 mt-auto">
        <button
          type="button"
          onClick={onChangePlan}
          className="btn btn-primary-gradient text-white fs-6 flex-fill border-0 rounded-pill d-flex align-items-center justify-content-center py-2"
        >
          <Icon name="ArrowUpDown" size={16} className="me-2" />
          Change Plan
        </button>
        <button
          type="button"
          onClick={onUpdatePayment}
          className="btn btn-outline-light fs-6 flex-fill rounded-pill d-flex align-items-center justify-content-center py-2"
        >
          <Icon name="CreditCard" size={16} className="me-2" />
          Update Billing
        </button>
        <button
          type="button"
          onClick={handleCancelSubscription}
          className="btn btn-outline-danger fs-6 flex-fill rounded-pill d-flex align-items-center justify-content-center py-2"
         disabled={userPlan?.planStatus === 'cancelled'}
        >
          <Icon name="X" size={16} className="me-2" />
          Cancel Subscription
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
