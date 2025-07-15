// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID || '3FC61D34-A023-4974-AB02-1274D2061897';
const API_KEY = import.meta.env.VITE_API_KEY || 'yTh8r4xJwSf6ZpG3dNcQ2eV7uYbF9aD5';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  applicationid: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

export interface ApiError {
  message: string;
  status?: number;
}

// Account Service Class
export class AccountService {
  private static baseUrl = API_BASE_URL;
  private static apiKey = API_KEY;
  private static applicationId = APPLICATION_ID;

  /**
   * Login user with email and password
   */
  static async login(credentials: Omit<LoginCredentials, 'applicationid'>): Promise<LoginResponse> {
    try {
      const loginData: LoginCredentials = {
        ...credentials,
        applicationid: this.applicationId
      };

      const response = await fetch(`${this.baseUrl}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify(loginData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed. Please try again.');
      }

      return {
        success: true,
        message: 'Login successful',
        ...result
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
      
      return {
        success: false,
        message: errorMessage
      };
    }
  }

  /**
   * Logout user (clear stored tokens)
   */
  static logout(): void {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return !!token;
  }

  /**
   * Get stored user data
   */
  static getCurrentUser() {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Store authentication data
   */
  static storeAuthData(token: string, user: any, rememberMe: boolean = false): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));
  }
}

// Export default instance
export default AccountService; 