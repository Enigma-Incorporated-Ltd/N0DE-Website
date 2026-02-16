import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  id: string;
  email: string;
  token: string;
  refreshToken: string;
  isRootUser: boolean;
}

interface AuthContextType {
  user: string | null;
  userData: UserData | null;
  login: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  getToken: () => string | null;
  updateUserData: (data: UserData) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
  getToken: () => null,
  updateUserData: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const storedUserData = localStorage.getItem('userData');
    
    if (userId) {
      setUser(userId);
      setIsAuthenticated(true);
      
      if (storedUserData) {
        try {
          const parsed = JSON.parse(storedUserData);
          setUserData(parsed);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      }
    }
    setLoading(false); // Mark as ready
  }, []);

  const login = (userId: string) => {
    setUser(userId);
    setIsAuthenticated(true);
    localStorage.setItem('userId', userId);
    
    // Try to load full user data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        setUserData(parsed);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  };

  const logout = () => {
    setUser(null);
    setUserData(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    localStorage.removeItem('userEmail');
  };

  const getToken = (): string | null => {
    if (userData?.token) {
      return userData.token;
    }
    
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        return parsed.token || null;
      } catch {
        return null;
      }
    }
    
    return null;
  };

  const updateUserData = (data: UserData) => {
    setUserData(data);
    setUser(data.id);
    setIsAuthenticated(true);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userData', JSON.stringify(data));
    if (data.email) {
      localStorage.setItem('userEmail', data.email);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userData,
        login, 
        logout, 
        isAuthenticated, 
        loading,
        getToken,
        updateUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 