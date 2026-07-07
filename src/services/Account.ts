// API Configuration
const ensureTrailingSlash = (url: string) =>
  url.endsWith("/") ? url : url + "/";
const DEFAULT_API_BASE =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "/"
    : "https://enigmaincapp.azurewebsites.net/";
const API_BASE_URL = ensureTrailingSlash(
  import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()
    ? import.meta.env.VITE_API_BASE_URL!
    : DEFAULT_API_BASE
);
const APPLICATION_ID =
  import.meta.env.VITE_APPLICATION_ID || "3FC61D34-A023-4974-AB02-1274D2061897";
const API_KEY =
  import.meta.env.VITE_API_KEY || "yTh8r4xJwSf6ZpG3dNcQ2eV7uYbF9aD5";

import { tokenStore } from '../utils/tokenStore';

// Currency Configuration
export const currencyConfig = {
  symbol: "£", // British Pound Sterling symbol
  code: "GBP", // ISO currency code
  // symbol: '€',  // Euro symbol
  // code: 'EUR',  // ISO currency code
  format: (amount: number | string): string => {
    // Convert string to number if needed
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    // Format number with 2 decimal places and currency symbol before the number
    return `${currencyConfig.symbol}${numAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  },
};

// Re-export currency config for easy access
export const {
  symbol: CURRENCY_SYMBOL,
  code: CURRENCY_CODE,
  format: formatCurrency,
} = currencyConfig;
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
  refreshToken?: string;
  isRootUser?: boolean;
  user?: {
    id: string;
    email: string;
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

export interface SupportTicketRequest {
  summary: string;
  description: string;
  requestTypeId: string;
  productServiceId: string;
  contactEmail: string;
  /** @deprecated use attachments */
  attachment?: File;
  attachments?: File[];
}

export const REQUEST_TYPE_OPTIONS = [
  { label: "Service Request", value: "10385" },
  { label: "Bug", value: "10386" },
  { label: "Incident", value: "10387" },
  { label: "Change Request", value: "10388" },
  { label: "Feature Request", value: "10389" },
] as const;

export const PRODUCT_SERVICE_OPTIONS = [
  { label: "NODE Lite Desktop", value: "10383" },
  { label: "NODE Lite Mobile", value: "10384" },
  { label: "Enigma Net Nexus", value: "10390" },
  { label: "Enigma Net Cloud Storage", value: "10392" },
  { label: "Developer Portal", value: "10391" },
  { label: "Others", value: "10428" },
] as const;

// Account Service Class
export class AccountService {
  private static baseUrl = API_BASE_URL;
  private static apiKey = API_KEY;
  public static applicationId = APPLICATION_ID;

  /**
   * Login with Microsoft token
   * Exchange Microsoft access token or ID token for application JWT
   */
  static async loginWithMicrosoft(
    accessToken: string,
    idToken?: string
  ): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}api/auth/microsoft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey: this.apiKey,
        },
        body: JSON.stringify({
          AccessToken: accessToken,
          IdToken: idToken || accessToken,
          ApplicationId: this.applicationId,
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        return {
          success: false,
          message: "Server error: invalid response. Please try again later.",
        };
      }

      if (!response.ok) {
        throw new Error(
          result.status ||
            result.message ||
            "Microsoft login failed. Please try again."
        );
      }

      // Update in-memory token store (no localStorage)
      if (result.token && result.userid) {
        tokenStore.set({
          token: result.token,
          refreshToken: result.refreshToken,
          userId: result.userid,
          email: result.email,
          isRootUser: result.isRootUser || false,
        });
      }

      return {
        success: true,
        message: "Microsoft login successful",
        token: result.token,
        refreshToken: result.refreshToken,
        isRootUser: result.isRootUser || false,
        user: {
          id: result.userid,
          email: result.email,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Microsoft login failed. Please try again later.";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }

  /**
   * Login user with email and password
   */
  static async login(
    credentials: Omit<LoginCredentials, "applicationid">
  ): Promise<LoginResponse> {
    try {
      const loginData: LoginCredentials = {
        ...credentials,
        applicationid: this.applicationId,
      };

      const response = await fetch(`${this.baseUrl}api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey: this.apiKey,
        },
        body: JSON.stringify(loginData),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        return {
          success: false,
          message: "Server error: invalid response. Please try again later.",
        };
      }

      if (!response.ok) {
        throw new Error(result.message || "Login failed. Please try again.");
      }

      // Update in-memory token store (no localStorage)
      if (result.token && result.userid) {
        tokenStore.set({
          token: result.token,
          refreshToken: result.refreshToken,
          userId: result.userid,
          email: result.email,
          isRootUser: result.isRootUser || false,
        });
      }

      return {
        success: true,
        message: "Login successful",
        token: result.token,
        refreshToken: result.refreshToken,
        isRootUser: result.isRootUser || false,
        user: {
          id: result.userid,
          email: result.email,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.";
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
  /**
   * Register a new user
   */
  static async register(user: RegisterUserDto): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}api/users/RegisterUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey: this.apiKey,
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.status || "Registration failed. Please try again."
        );
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.";
      return {
        status: errorMessage,
        userid: "",
      };
    }
  }

  /**
   * Logout user (clear stored tokens)
   */
  static logout(): void {
    tokenStore.clear();
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!tokenStore.get().userId;
  }

  static getCurrentUserId(): string | null {
    return tokenStore.get().userId;
  }

  /**
   * Store authentication data (kept for call-site compatibility)
   */
  static storeAuthData(userId: string): void {
    tokenStore.set({ userId });
  }

  /**
   * Forgot Password - Request reset code
   */
  static async forgotPassword(
    email: string,
    applicationid: string
  ): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Users/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey: this.apiKey,
        },
        body: JSON.stringify({ email, applicationid }),
      });
      return await response.json();
    } catch (error) {
      return { status: "Failed to send reset email." };
    }
  }

  /**
   * Verify reset code
   */
  static async verifyCode(verificationcode: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Users/VerifyCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey: this.apiKey,
        },
        body: JSON.stringify({ verificationcode }),
      });
      return await response.json();
    } catch (error) {
      return { status: "Failed to verify code." };
    }
  }

  /**
   * Update password using code
   */
  static async forgotPasswordUpdate(
    verificationcode: string,
    newpassword: string
  ): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}api/Users/forgotpasswordupdate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            APIKey: this.apiKey,
          },
          body: JSON.stringify({ verificationcode, newpassword }),
        }
      );
      return await response.json();
    } catch (error) {
      return { status: "Failed to update password." };
    }
  }

  /**
   * Fetch user invoice history by userId
   */
  static async getUserInvoiceHistory(userId: string): Promise<any> {
    try {
      const response = await fetch(
        `${this.baseUrl}api/Node/userinvoicehistory/${encodeURIComponent(userId)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            APIKey: this.apiKey,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch invoice history.");
      }
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.";
      return { success: false, message: errorMessage };
    }
  }

  /**
   * Submit a support ticket via POST /api/v1/jira/issues
   * JSON when no attachments; multipart/form-data when files are included.
   */
  static async insertTicket(request: SupportTicketRequest): Promise<any> {
    try {
      const url = `${this.baseUrl}api/v1/jira/issues`;
      const files =
        request.attachments?.length
          ? request.attachments
          : request.attachment
            ? [request.attachment]
            : [];

      let response: Response;

      if (files.length > 0) {
        const formData = new FormData();
        formData.append("Summary", request.summary);
        formData.append("Description", request.description);
        formData.append("RequestTypeId", request.requestTypeId);
        formData.append("ProductServiceId", request.productServiceId);
        formData.append("ContactEmail", request.contactEmail);
        for (const file of files) {
          formData.append("attachment", file);
        }

        response = await fetch(url, {
          method: "POST",
          headers: { APIKey: this.apiKey },
          body: formData,
        });
      } else {
        response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            APIKey: this.apiKey,
          },
          body: JSON.stringify({
            Summary: request.summary,
            Description: request.description,
            RequestTypeId: request.requestTypeId,
            ProductServiceId: request.productServiceId,
            ContactEmail: request.contactEmail,
          }),
        });
      }

      let result;
      try {
        result = await response.json();
      } catch {
        return {
          success: false,
          message: "Server error: invalid response. Please try again later.",
        };
      }

      if (!response.ok) {
        throw new Error(
          result.message || result.status || "Failed to submit ticket."
        );
      }

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.";
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
