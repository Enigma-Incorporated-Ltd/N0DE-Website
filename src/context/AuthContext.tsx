import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { tokenStore } from '../utils/tokenStore';

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

  // On mount: no localStorage – just mark as ready.
  // (Token refresh on page reload must go through login again.)
  useEffect(() => {
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

  const logout = () => {
    setUser(null);
    setUserData(null);
    setUserEmail(null);
    setUserPlanDetails(null);
    setIsAuthenticated(false);
    tokenStore.clear();

    // Clean up any MSAL data that may have leaked into localStorage
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith('msal.') || key.includes('msal'))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      // Silently ignore if localStorage is unavailable
    }
  };

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
