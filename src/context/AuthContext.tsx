import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { tokenStore } from '../utils/tokenStore';
import { subscribeGlobalLogout } from '../utils/globalLogoutSignal';

export interface UserData {
  id: string;
  email: string;
  token: string;
  refreshToken: string;
  isRootUser: boolean;
}

export interface UserPlanDetails {
  planId?: number;
  planName?: string;
  planPrice?: string;
  planStatus?: string;
  billingCycle?: string;
  planSubtitle?: string;
  isInTrial?: boolean;
  trialEndDate?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: string | null;
  userData: UserData | null;
  userEmail: string | null;
  userPlanDetails: UserPlanDetails | null;
  login: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  getToken: () => string | null;
  updateUserData: (data: UserData) => void;
  setUserPlanDetails: (details: UserPlanDetails | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  userEmail: null,
  userPlanDetails: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
  getToken: () => null,
  updateUserData: () => {},
  setUserPlanDetails: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPlanDetails, setUserPlanDetails] = useState<UserPlanDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  // On mount: restore session from sessionStorage if available.
  // sessionStorage persists within the same browser tab, so it survives
  // third-party redirects (e.g. Stripe payment return) but is cleared when
  // the tab is closed, preserving the same security profile as before.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('auth_session');
      if (saved) {
        const data: UserData = JSON.parse(saved);
        setUserData(data);
        setUser(data.id);
        setUserEmail(data.email);
        setIsAuthenticated(true);
      }
    } catch {
      // Silently ignore if sessionStorage is unavailable or data is corrupt
    }
    setLoading(false);
  }, []);

  // Keep tokenStore in sync whenever userData changes so that
  // non-React service classes always have the latest credentials.
  useEffect(() => {
    if (userData) {
      tokenStore.set({
        token: userData.token,
        refreshToken: userData.refreshToken,
        userId: userData.id,
        email: userData.email,
        isRootUser: userData.isRootUser,
      });
    } else {
      tokenStore.clear();
    }
  }, [userData]);

  const login = (userId: string) => {
    setUser(userId);
    setIsAuthenticated(true);
  };

  const logout = useCallback(() => {
    setUser(null);
    setUserData(null);
    setUserEmail(null);
    setUserPlanDetails(null);
    setIsAuthenticated(false);
    tokenStore.clear();
    try {
      sessionStorage.removeItem('auth_session');
    } catch {
      // Silently ignore
    }

    // Clean up any MSAL data that may have leaked into localStorage
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('msal.') || key.includes('msal'))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      // Silently ignore if localStorage is unavailable
    }
  }, []);

  useEffect(() => {
    const onRefreshFailed = () => {
      // #region agent log
      fetch('http://127.0.0.1:7281/ingest/7a98156b-5309-46e3-8abf-a9b9da1a22a7',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'7b5918'},body:JSON.stringify({sessionId:'7b5918',hypothesisId:'A',location:'AuthContext.tsx:onRefreshFailed',message:'node:auth-refresh-failed -> logout()',data:{pathname:window.location.pathname},timestamp:Date.now(),runId:'dashboard-kickout'})}).catch(()=>{});
      // #endregion
      logout();
    };
    window.addEventListener('node:auth-refresh-failed', onRefreshFailed);
    return () => window.removeEventListener('node:auth-refresh-failed', onRefreshFailed);
  }, [logout]);

  // Portal global logout — other tabs receive localStorage "storage" event or BroadcastChannel.
  useEffect(() => {
    return subscribeGlobalLogout(() => {
      logout();
      const path = window.location.pathname;
      if (path !== '/login' && !path.startsWith('/sso/')) {
        window.location.replace('/login');
      }
    });
  }, [logout]);

  const getToken = (): string | null => {
    // Prefer the live tokenStore value so that after a silent token refresh
    // (done inside NodeService) we always return the newest token.
    const storeToken = tokenStore.get().token;
    if (storeToken) return storeToken;
    return userData?.token ?? null;
  };

  const updateUserData = (data: UserData) => {
    setUserData(data);
    setUser(data.id);
    setUserEmail(data.email);
    setIsAuthenticated(true);
    // tokenStore is kept in sync by the useEffect above
    // Persist to sessionStorage so auth survives third-party redirects (e.g. Stripe)
    try {
      sessionStorage.setItem('auth_session', JSON.stringify(data));
    } catch {
      // Silently ignore if sessionStorage is unavailable
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        userEmail,
        userPlanDetails,
        login,
        logout,
        isAuthenticated,
        loading,
        getToken,
        updateUserData,
        setUserPlanDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
