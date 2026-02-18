import React, { useState, useContext } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginRequest, isMsalConfigured } from '../../../config/authConfig';
import { MicrosoftAuthService } from '../../../services/MicrosoftAuth';
import { NodeService } from '../../../services/Node';
import { AuthContext } from '../../../context/AuthContext';
import Button from '../../ui/Button';
import Icon from '../../AppIcon';

interface MicrosoftLoginButtonProps {
  onSuccess?: (userId: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
}

const MicrosoftLoginButton: React.FC<MicrosoftLoginButtonProps> = ({
  onSuccess,
  onError,
  disabled = false,
  className = '',
}) => {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUserData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const { planId, billingCycle, selectedPlan } = location.state || {};

  /** Remove any MSAL keys that ended up in localStorage */
  const clearMsalLocalStorage = () => {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('msal.') || key.includes('msal'))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      // Silently ignore if localStorage is unavailable
    }
  };

  const handleMicrosoftLogin = async () => {
    if (!isMsalConfigured()) {
      const errorMsg = 'Microsoft login is not configured. Please contact support.';
      onError?.(errorMsg);
      return;
    }

    if (isLoading) {
      return; // Prevent multiple simultaneous attempts
    }

    setIsLoading(true);

    try {
      // Check if there's already an interaction in progress
      const accounts = instance.getAllAccounts();
      
      // Open Microsoft login popup
      const response = await instance.loginPopup(loginRequest);
      
      // Get the access token or ID token
      const token = response.accessToken || response.idToken;

      if (!token) {
        throw new Error('No token received from Microsoft');
      }

      // Exchange Microsoft token for application JWT
      const result = await MicrosoftAuthService.loginWithMicrosoft(
        response.accessToken,
        response.idToken
      );

      if (result.token && result.userid) {
        // Store full user data in React state (no localStorage)
        updateUserData({
          id: result.userid,
          email: result.email,
          token: result.token,
          refreshToken: result.refreshToken,
          isRootUser: result.isRootUser || false,
        });

        // Clean up any MSAL data that leaked into localStorage
        clearMsalLocalStorage();

        // Call success callback
        onSuccess?.(result.userid);

        // Check if user is admin
        let isAdmin = false;
        try {
          isAdmin = await NodeService.getIsAdmin(result.userid);
        } catch (error) {
          console.error('Failed to check admin status:', error);
        }

        if (isAdmin) {
          navigate('/admin/user-management', { state: { userId: result.userid } });
          return;
        }

        // Get plan details
        let userPlan = null;
        try {
          userPlan = await NodeService.getUserPlanDetails(result.userid);
          console.log('✅ Microsoft login - User plan response:', userPlan);
        } catch (error) {
          console.error('❌ Microsoft login - Failed to get user plan:', error);
        }

        // Handle both direct planId and nested userplan.planId
        const dbPlanId = parseInt(String(userPlan?.planId || userPlan?.userplan?.planId || '0'), 10);
        const normalizedPlanStatus = (userPlan?.planStatus || userPlan?.userplan?.planStatus || '').toLowerCase();
        
        console.log('🔍 Microsoft login - Navigation params:', {
          planId: planId,
          dbPlanId: dbPlanId,
          planStatus: normalizedPlanStatus,
          hasUserPlan: !!userPlan,
          responseKeys: userPlan ? Object.keys(userPlan) : []
        });

        // Navigate based on plan status
        if (!planId && dbPlanId && normalizedPlanStatus === 'active') {
          navigate('/user-dashboard', { state: { userId: result.userid, planId: dbPlanId } });
        } else if (!planId && dbPlanId && normalizedPlanStatus !== 'active') {
          navigate('/plan-selection', { state: { userId: result.userid } });
        } else if (!planId && !dbPlanId) {
          navigate('/plan-selection', { state: { userId: result.userid } });
        } else if (planId === dbPlanId && normalizedPlanStatus === 'active') {
          navigate('/user-dashboard', { state: { userId: result.userid, planId: dbPlanId } });
        } else if (planId === dbPlanId && normalizedPlanStatus === 'cancelled') {
          navigate('/checkout', { state: { userId: result.userid, planId, selectedPlan, billingCycle } });
        } else if (planId !== dbPlanId) {
          navigate('/checkout', { state: { userId: result.userid, planId, selectedPlan, billingCycle } });
        } else {
          navigate('/plan-selection', { state: { userId: result.userid } });
        }
      } else {
        throw new Error('Login succeeded but user data is missing');
      }
    } catch (error: any) {
      console.error('Microsoft login error:', error);
      
      // Handle specific MSAL errors
      if (error?.errorCode === 'interaction_in_progress') {
        console.warn('Login already in progress, waiting...');
        onError?.('A Microsoft login is already in progress. Please wait...');
      } else if (error?.errorCode === 'user_cancelled') {
        console.log('User cancelled the login');
        onError?.('Login cancelled');
      } else {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Microsoft login failed. Please try again.';
        onError?.(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render button if MSAL is not configured
  if (!isMsalConfigured()) {
    return null;
  }

  return (
    <Button
      type="button"
      variant="outline"
      fullWidth
      onClick={handleMicrosoftLogin}
      disabled={disabled || isLoading}
      loading={isLoading}
      className={`btn-outline-light text-light fs-14 rounded-pill py-3 d-flex align-items-center justify-content-center ${className}`}
    >
      {!isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 21 21"
          className="me-2"
        >
          <rect x="1" y="1" width="9" height="9" fill="#f25022" />
          <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
          <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
          <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
        </svg>
      )}
      {isLoading ? 'Signing in with Microsoft...' : 'Sign in with Microsoft'}
    </Button>
  );
};

export default MicrosoftLoginButton;
