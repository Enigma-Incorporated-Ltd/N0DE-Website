import React, { useContext } from 'react';
import Icon from '../../../components/AppIcon';
import { AccountService } from '../../../services';
import { NodeService } from '../../../services';
import { AuthContext } from '../../../context/AuthContext';

interface UserPlan {
  planId: number;
  planName: string;
  planPrice: string;
  planStatus: string;
  billingCycle: string;
  planSubtitle: string;
  isInTrial?: boolean;
  trialEndDate?: string;
}

const TrialDetailsCard: React.FC = () => {
  const { userPlanDetails, setUserPlanDetails } = useContext(AuthContext);
  const [userPlan, setUserPlan] = React.useState<UserPlan | null>(null);

  React.useEffect(() => {
    const fetchTrialData = async () => {
      try {
        const userId = AccountService.getCurrentUserId();
        if (!userId) return;

        // If context already has plan details, use them instantly
        if (userPlanDetails) {
          const parsedData: any = userPlanDetails;
          const userplan = parsedData.userplan || parsedData.UserPlan || parsedData;
          const isInTrial = parsedData.isInTrial === true || parsedData.IsInTrial === true;
          const trialEndDate = parsedData.trialEndDate || parsedData.TrialEndDate;

          setUserPlan({
            planId: userplan.planId ?? 0,
            planName: userplan.planName,
            planPrice: userplan.planPrice,
            planStatus: userplan.planStatus,
            billingCycle: userplan.billingCycle ?? '',
            planSubtitle: userplan.planSubtitle ?? '',
            isInTrial: isInTrial,
            trialEndDate: trialEndDate
          });
        }

        // Fetch fresh data from API and update context
        const response = await NodeService.getUserPlanDetails(userId);
        if (response) {
          const apiResponse: any = response;
          setUserPlanDetails(apiResponse);

          const userplan = apiResponse.userplan || apiResponse.UserPlan || apiResponse;
          const isInTrial = apiResponse.isInTrial === true || apiResponse.IsInTrial === true;
          const trialEndDate = apiResponse.trialEndDate || apiResponse.TrialEndDate;

          setUserPlan({
            planId: userplan.planId ?? 0,
            planName: userplan.planName,
            planPrice: userplan.planPrice,
            planStatus: userplan.planStatus,
            billingCycle: userplan.billingCycle ?? '',
            planSubtitle: userplan.planSubtitle ?? '',
            isInTrial: isInTrial,
            trialEndDate: trialEndDate
          });
        }
      } catch (error) {
        console.error('Error fetching trial data:', error);
      }
    };

    fetchTrialData();
  }, []);

  // Don't render if not in trial
  if (!userPlan?.isInTrial || !userPlan.trialEndDate) {
    return null;
  }

  return (
    <div
      className="border border-light border-opacity-10 rounded-4 p-3"
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
        boxShadow: '0 10px 24px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.03)'
      }}
    >
      <div className="d-flex align-items-start">
        <div
          className="flex-shrink-0 rounded-pill me-3"
          style={{
            width: '4px',
            height: '100%',
            minHeight: '56px',
            background: 'linear-gradient(180deg, #f0f828 0%, #4fb3d9 100%)'
          }}
        />

        <div className="flex-grow-1">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{
                  width: '28px',
                  height: '28px',
                  background: 'linear-gradient(45deg, rgba(240, 248, 40, 0.18), rgba(79, 179, 217, 0.16))',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <Icon name="Clock" size={14} className="text-light" />
              </div>
              <p className="text-light mb-0 fw-semibold small">Trial Active</p>
            </div>

            <span
              className="px-2 py-1 fw-bold bg-success text-white"
              style={{
                fontSize: '11px',
                borderRadius: '999px'
              }}
            >
              TRIAL
            </span>
          </div>

          <p className="text-light mb-0 small text-opacity-75">
            Ends{' '}
            <span className="text-light text-opacity-100">
              {new Date(userPlan.trialEndDate).toLocaleDateString('en-GB', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrialDetailsCard;
