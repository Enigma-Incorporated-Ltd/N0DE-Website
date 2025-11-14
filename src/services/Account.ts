// API Configuration
const ensureTrailingSlash = (url: string) => (url.endsWith('/') ? url : url + '/');
const DEFAULT_API_BASE = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? '/'
  : 'https://enigmaincapp.azurewebsites.net/';
const API_BASE_URL = ensureTrailingSlash((import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim())
  ? import.meta.env.VITE_API_BASE_URL!
  : DEFAULT_API_BASE);
const APPLICATION_ID = import.meta.env.VITE_APPLICATION_ID || '3FC61D34-A023-4974-AB02-1274D2061897';
const API_KEY = import.meta.env.VITE_API_KEY || 'yTh8r4xJwSf6ZpG3dNcQ2eV7uYbF9aD5';

// Currency Configuration
export const currencyConfig = {
  symbol: '£',  // British Pound Sterling symbol
  code: 'GBP',  // ISO currency code
  // symbol: '€',  // Euro symbol
  // code: 'EUR',  // ISO currency code
  format: (amount: number | string): string => {
    // Convert string to number if needed
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    // Format number with 2 decimal places and currency symbol
    // return `${numAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currencyConfig.symbol}`;
    return `${numAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currencyConfig.symbol}`;
  }
};

// Re-export currency config for easy access
export const { symbol: CURRENCY_SYMBOL, code: CURRENCY_CODE, format: formatCurrency } = currencyConfig;

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

export interface RegisterUserDto {
  email: string;
  password: string;
  applicationid: string;
  firstname?: string;
  lastname?: string;
  businessname?: string;
}

export interface RegisterResponse {
  status: string;
  userid: string;
  IsRootUser?: boolean;
}

// Ticket Request Type
export interface TicketRequestViewModel {
  userId: string;
  title: string;
  description: string;
}

// Account Service Class
export class AccountService {
  private static baseUrl = API_BASE_URL;
  private static apiKey = API_KEY;
  public static applicationId = APPLICATION_ID;

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

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        return {
          success: false,
          message: 'Server error: invalid response. Please try again later.'
        };
      }

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
   * Register a new user
   */
  static async register(user: RegisterUserDto): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}api/users/RegisterUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify(user)
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.status || 'Registration failed. Please try again.');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
      return {
        status: errorMessage,
        userid: ''
      };
    }
  }

  /**
   * Logout user (clear stored tokens)
   */
  static logout(): void {
    // Clear any stored authentication data
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
  }
  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    return !!userId;
  }
  
  static getCurrentUserId(): string | null {
    return localStorage.getItem('userId') || sessionStorage.getItem('userId');
  }
  /**
   * Store authentication data
   */
  static storeAuthData(userId: string): void {
    const storage =  localStorage || sessionStorage;
    storage.setItem('userId', userId);
  }

  /**
   * Forgot Password - Request reset code
   */
  static async forgotPassword(email: string, applicationid: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Users/forgotpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({ email, applicationid })
      });
      return await response.json();
    } catch (error) {
      return { status: 'Failed to send reset email.' };
    }
  }

  /**
   * Verify reset code
   */
  static async verifyCode(verificationcode: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Users/VerifyCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({ verificationcode })
      });
      return await response.json();
    } catch (error) {
      return { status: 'Failed to verify code.' };
    }
  }

  /**
   * Update password using code
   */
  static async forgotPasswordUpdate(verificationcode: string, newpassword: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Users/forgotpasswordupdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({ verificationcode, newpassword })
      });
      return await response.json();
    } catch (error) {
      return { status: 'Failed to update password.' };
    }
  }

  /**
   * Fetch user invoice history by userId
   */
  static async getUserInvoiceHistory(userId: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Node/userinvoicehistory/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch invoice history.');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
      return { success: false, message: errorMessage };
    }
  }

  /**
   * Insert a new support ticket
   */
  static async insertTicket(request: TicketRequestViewModel): Promise<any> {
    try {
      // Convert to PascalCase for backend
      const pascalRequest = {
        UserId: request.userId,
        Title: request.title,
        Description: request.description
      };
      const response = await fetch(`${this.baseUrl}api/Node/insertticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify(pascalRequest)
      });
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        return {
          success: false,
          message: 'Server error: invalid response. Please try again later.'
        };
      }
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit ticket.');
      }
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again later.';
      return { success: false, message: errorMessage };
    }
  }
}

// Helper functions for cookies
// function setCookie(name: string, value: string, days: number) {
//   const expires = new Date(Date.now() + days * 864e5).toUTCString();
//   document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
// }

// function getCookie(name: string): string | null {
//   return document.cookie.split('; ').reduce((r, v) => {
//     const parts = v.split('=');
//     return parts[0] === name ? decodeURIComponent(parts.slice(1).join('=')) : r;
//   }, null as string | null);
// }

// Export default instance
export default AccountService;
