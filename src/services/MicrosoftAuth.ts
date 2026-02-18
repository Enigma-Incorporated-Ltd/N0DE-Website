/**
 * Microsoft Authentication Service
 *
 * Handles Microsoft login integration with the backend API.
 * This service exchanges Microsoft tokens for application JWT tokens.
 */

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
const API_KEY =
  import.meta.env.VITE_API_KEY || "yTh8r4xJwSf6ZpG3dNcQ2eV7uYbF9aD5";
const APPLICATION_ID =
  import.meta.env.VITE_APPLICATION_ID || "3FC61D34-A023-4974-AB02-1274D2061897";

import { tokenStore } from '../utils/tokenStore';

export interface MicrosoftLoginRequest {
  accessToken?: string;
  idToken?: string;
}

export interface MicrosoftLoginResponse {
  status: string;
  userid: string;
  email: string;
  token: string;
  refreshToken: string;
  isRootUser: boolean;
}

export class MicrosoftAuthService {
  private static baseUrl = API_BASE_URL;
  private static apiKey = API_KEY;

  /**
   * Exchange Microsoft token for application JWT
   *
   * @param accessToken - Microsoft access token from MSAL
   * @param idToken - Microsoft ID token from MSAL (optional fallback)
   * @returns Application JWT and user data
   */
  static async loginWithMicrosoft(
    accessToken?: string,
    idToken?: string
  ): Promise<MicrosoftLoginResponse> {
    try {
      if (!accessToken && !idToken) {
        throw new Error('No Microsoft token provided');
      }

      const response = await fetch(`${this.baseUrl}api/auth/microsoft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          APIKey: this.apiKey,
        },
        body: JSON.stringify({
          AccessToken: accessToken || '',
          IdToken: idToken || accessToken || '',
          ApplicationId: APPLICATION_ID,
        }),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error(
          "Server error: invalid response. Please try again later."
        );
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

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong with Microsoft login. Please try again later.";
      throw new Error(errorMessage);
    }
  }

  /**
   * Check if user is already logged in (reads from in-memory store)
   */
  static isAuthenticated(): boolean {
    const { token, userId } = tokenStore.get();
    return !!(token && userId);
  }

  /**
   * Get current user data from in-memory store
   */
  static getCurrentUser(): {
    id: string;
    email: string;
    token: string;
    refreshToken: string;
    isRootUser: boolean;
  } | null {
    const { token, refreshToken, userId, email, isRootUser } = tokenStore.get();
    if (!token || !userId) return null;
    return {
      id: userId,
      email: email ?? '',
      token,
      refreshToken: refreshToken ?? '',
      isRootUser,
    };
  }
}

export default MicrosoftAuthService;
