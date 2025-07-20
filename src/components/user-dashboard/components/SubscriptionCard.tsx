import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { NodeService, type UserPlanDetails } from '../../../services';
import { AccountService } from '../../../services';



interface UserPlan {
  planName: string;
  planPrice: string;
  planStatus: string;
 billingCycle: string;
 planSubtitle: string;
}

const formatExpiryDate = (dateString: string): string => {
  try {
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) return dateString;
    return parsed.toLocaleDateString(undefined, {
      month: 'short',
      year: 'numeric',
    }); // e.g., Nov 2048
  } catch {
    return dateString;
  }
};

const formatPrice = (price: string): string => {
  return price.replace(/\\+/g, '').replace(/(\d+\.?\d*)/, '$$$1');
};


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
  //onCancelSubscription: () => void;
};

const SubscriptionCard: React.FC<Props> = ({
  subscription,
  onChangePlan,
  onUpdatePayment,
  onCancelSubscription
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

 
const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [refreshTrigger, setRefreshTrigger] = useState(0); // 👈 trigger to re-run fetch

  const fetchUserData = async () => {
    try {
      const currentUser = AccountService.getCurrentUser();
      const userId = currentUser?.id;
      const response = await NodeService.getUserPlanDetails('AFB7F2BC-5D88-468F-8B3D-5874855ADF85');

    if (!response || !response) throw new Error('Invalid user plan data');
      setUserPlan(response);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const currentUser = AccountService.getCurrentUser();
      //const userId = currentUser?.id;
      const userId='AFB7F2BC-5D88-468F-8B3D-5874855ADF85';
      const planId = 2;
      if (!userId) throw new Error('User not found');

      const success = await NodeService.cancelSubscription(userId, planId);
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



  return (
    <div className="bg-dark border border-secondary rounded-3 p-4 shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      <div className="d-flex align-items-start justify-content-between mb-4">
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

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="d-flex align-items-center mb-2">
            <Icon name="Calendar" size={16} className="text-light opacity-75 me-2" />
            <span className="text-light opacity-75 fs-6">Billing Cycle</span>
          </div>
          <p className="text-light fw-medium mb-0">  {userPlan ? userPlan.billingCycle : 'Loading...'}</p>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center mb-2">
            <Icon name="CreditCard" size={16} className="text-light opacity-75 me-2" />
            <span className="text-light opacity-75 fs-6">Plan Details</span>
          </div>
          <p className="text-light fw-medium mb-0"> {userPlan ? userPlan.planSubtitle : 'Loading...'}</p>
        </div>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2">
        <button
          type="button"
          onClick={onChangePlan}
          className="btn btn-primary-gradient text-white fs-6 flex-fill border-0 rounded-pill d-flex align-items-center justify-content-center"
        >
          <Icon name="ArrowUpDown" size={16} className="me-2" />
          Change Plan
        </button>
        <button
          type="button"
          onClick={onUpdatePayment}
          className="btn btn-outline-light fs-6 flex-fill rounded-pill d-flex align-items-center justify-content-center"
        >
          <Icon name="CreditCard" size={16} className="me-2" />
          Update Billing
        </button>
        <button
          type="button"
          onClick={handleCancelSubscription}
          className="btn btn-outline-danger fs-6 flex-fill rounded-pill d-flex align-items-center justify-content-center"
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
