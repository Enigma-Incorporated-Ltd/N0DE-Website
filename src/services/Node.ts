// API Configuration
const ensureTrailingSlash = (url: string) => (url.endsWith('/') ? url : url + '/');
// Use relative API path by default so development proxies can route requests. If VITE_API_BASE_URL is provided, it will be used.
const DEFAULT_API_BASE = '/';
const API_BASE_URL = ensureTrailingSlash((import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim())
  ? import.meta.env.VITE_API_BASE_URL!
  : DEFAULT_API_BASE);
const API_KEY = import.meta.env.VITE_API_KEY || 'yTh8r4xJwSf6ZpG3dNcQ2eV7uYbF9aD5';

// Types
export interface UserPlanDetails {
  planId: number;
  planName: string;
  planPrice: string;
  planStatus: string;
  nextBillingDate: string;
  lastFourDigits: string;
  expiryDate: string;
  nameOnCard: string;
  country: string;
  paymentMethod: string;
  billingCycle?: string;
  planSubtitle?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

// Node Service Class
export interface PaymentIntentInitResult {
  clientSecret: string;
  userProfileId?: string;
  customerId?: string;
  subscriptionId?: string;
  priceId?: string;
}

export class NodeService {
  private static baseUrl = API_BASE_URL;
  private static apiKey = API_KEY;
  private static applicationId = '3FC61D34-A023-4974-AB02-1274D2061897';

  /**
   * Refresh the authentication token
   */
  private static async refreshToken(): Promise<string> {
    console.log('=== refreshToken called ===');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (!userData.refreshToken) {
      console.error('No refresh token available');
      throw new Error('No refresh token available');
    }

    try {
      console.log('Sending refresh token request to:', `${this.baseUrl}users/refresh-token`);
      const response = await fetch(`${this.baseUrl}users/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({
          userId: userData.id,
          email: userData.email,
          applicationId: this.applicationId,
          refreshToken: userData.refreshToken
        })
      });

      console.log('Refresh token response status:', response.status);
      const responseText = await response.text();
      console.log('Refresh token response:', responseText);

      if (!response.ok) {
        throw new Error(`Refresh failed: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('New token data:', data);

      if (!data.token && !data.accessToken) {
        throw new Error('No token in response');
      }

      // Update stored user data with new tokens
      const updatedUser = {
        ...userData,
        token: data.token || data.accessToken,
        refreshToken: data.refreshToken || userData.refreshToken
      };
      
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      console.log('Token refreshed successfully');
      
      return data.token || data.accessToken;
    } catch (error) {
      console.error('Refresh token error:', error);
      // Clear user data on error
      localStorage.removeItem('userData');
      // Redirect to login
      window.location.href = '/login';
      throw new Error('Authentication failed');
    }
  }

  /**
   * Wrapper around fetch to handle network errors and token refresh
   */
  private static async fetchWithAuth(
    url: string, 
    options: RequestInit = {}, 
    retry = true
  ): Promise<Response> {
    console.log('=== fetchWithAuth called ===');
    console.log('URL:', url);
    
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = userData?.token;
    
    const headers = {
      'Content-Type': 'application/json',
      'APIKey': this.apiKey,
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...(options.headers || {})
    };

    try {
      console.log('Making request with headers:', headers);
      let response: Response;
      
      try {
        // First attempt to make the request
        response = await fetch(url, { ...options, headers });
        console.log('Response status:', response.status);
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        // If we get a network error and have a token, try to refresh it once
        if (token && retry) {
          console.log('Network error with token, attempting token refresh...');
          try {
            const newToken = await this.refreshToken();
            const newHeaders = {
              ...headers,
              'Authorization': `Bearer ${newToken}` 
            };
            console.log('Retrying with new token after network error...');
            return this.fetchWithAuth(url, { ...options, headers: newHeaders }, false);
          } catch (refreshError) {
            console.error('Token refresh after network error failed:', refreshError);
            throw fetchError; // Re-throw the original fetch error
          }
        }
        throw fetchError;
      }

      // Handle 401 Unauthorized
      if (response.status === 401) {
        console.log('=== 401 Unauthorized ===');
        
        if (retry) {
          console.log('Attempting to refresh token...');
          try {
            const newToken = await this.refreshToken();
            console.log('Token refresh successful, new token received');
            
            // Update stored user data with new token
            const updatedUser = { ...userData, token: newToken };
            localStorage.setItem('userData', JSON.stringify(updatedUser));
            
            // Update headers with new token
            const newHeaders = {
              ...headers,
              'Authorization': `Bearer ${newToken}` 
            };
            
            console.log('Retrying original request with new token...');
            // Retry with new token
            return this.fetchWithAuth(url, {
              ...options,
              headers: newHeaders
            }, false);
            
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Don't redirect here as refreshToken will handle it
            // Just clear the user data and let the original error propagate
            localStorage.removeItem('userData');
            return response;
          }
        }
      }

      return response;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  /**
   * Get user plan details by user ID
   */
  static async getUserPlanDetails(userId: string): Promise<UserPlanDetails | null> {
    try {
      const url = `${this.baseUrl}api/Node/userplan/${encodeURIComponent(userId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });
      
      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Unable to load your plan details. Please try refreshing the page.';
        throw new Error(errorMessage);
      }

      return result.userplan || null;
    } catch (error) {
      console.error('Error fetching user plan details:', error);
      throw error;
    }
  }

  /**
   * Get user details by user ID
   */
  static async getUserDetails(userId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/userdetails/${userId}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Unable to load your account information. Please try again.';
        throw new Error(errorMessage);
      }

      return result.user || null;
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   */
  static async cancelSubscription(userId: string, planId: number): Promise<boolean> {
    try {
      const url = `${this.baseUrl}api/Node/cancel-subscription`;
      const response = await this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          planId
        })
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'We encountered an issue while cancelling your subscription. Please try again or contact support.';
        throw new Error(errorMessage);
      }

      return result.success || false;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }

  static async getPlanById(planId: number): Promise<any | null> {
    try {
      const url = `${this.baseUrl}api/Node/plan/${planId}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Unable to load plan information. Please try refreshing the page.';
        throw new Error(errorMessage);
      }

      return result.plan || null;
    } catch (error) {
      console.error('Error fetching plan details:', error);
      throw error;
    }
  }

  /**
   * Get all plans
   */
  static async getAllPlans(): Promise<any[] | null> {
    // Try multiple endpoints, but never throw â€” always return an array.
    const endpoints = [
      `${this.baseUrl}api/Node/plans`,
      `/api/Node/plans`
    ];

    let lastError: any = null;

    for (const endpoint of endpoints) {
      try {
        // Use fetchWithAuth which handles authentication and token refresh
        const response = await this.fetchWithAuth(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        const responseText = await response.text();
        let result: any = responseText;

        try {
          if (typeof responseText === 'string' && (responseText.trim().startsWith('{') || responseText.trim().startsWith('['))) {
            result = JSON.parse(responseText);
          }
        } catch (e) {
          result = responseText;
        }

        if (!response.ok) {
          console.warn('getAllPlans non-ok response:', { endpoint, status: response.status, body: responseText });
          lastError = new Error(result?.error || result?.message || responseText || 'Unable to load available plans.');
          continue;
        }

        if (Array.isArray(result)) return result;
        if (result && Array.isArray(result.plans)) return result.plans;

        console.warn('getAllPlans unexpected response shape:', result);
        return [];
      } catch (err) {
        lastError = err;
        console.warn(`getAllPlans attempt failed for endpoint ${endpoint}:`, err);
        // continue to next endpoint
      }
    }

    console.error('getAllPlans all attempts failed:', lastError);
    // Return empty array â€” UI handles empty state
    return [];
  }

  /**
   * Get user invoice history by user ID
   */
  static async getUserInvoiceHistory(userId: string): Promise<any[]> {
    try {
      const url = `${this.baseUrl}api/Node/userinvoicehistory/${encodeURIComponent(userId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Unable to load your billing history. Please try refreshing the page.';
        throw new Error(errorMessage);
      }

      return result.invoices || [];
    } catch (error) {
      console.error('Error fetching user invoice history:', error);
      throw error;
    }
  }

  /**
   * Update an existing plan
   */
  static async updatePlan(planData: any): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/updateplan`;
      const response = await this.fetchWithAuth(url, {
        method: 'PUT',
        body: JSON.stringify(planData)
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to update plan';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error updating plan:', error);
      throw error;
    }
  }

  /**
   * Create plan with Stripe integration
   */
  static async createPlan(userId: string, planId: number, billingCycle: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/createplan`;
      const response = await this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          planId: planId.toString(),
          billingCycle
        })
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'We encountered an issue while creating your plan. Please try again or contact our support team for assistance.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error creating plan:', error);
      throw error;
    }
  }

  static async getAllInvoices(): Promise<any> {
    const url = `${this.baseUrl}api/Node/invoices`;
    const response = await this.fetchWithAuth(url, {
      method: 'GET'
    });
    const rawText = await response.text();
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      result = { message: rawText };
    }
    return result;
  }

  static async getAllTickets(): Promise<any> {
    const url = `${this.baseUrl}api/Node/allticket`;
    const response = await this.fetchWithAuth(url, {
      method: 'GET'
    });
    const rawText = await response.text();
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      result = { message: rawText };
    }
    return result;
  }

  static async getAllUserPlans(): Promise<any> {
    const url = `${this.baseUrl}api/Node/alluserplans`;
    const response = await this.fetchWithAuth(url, {
      method: 'GET'
    });
    const rawText = await response.text();
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      result = { message: rawText };
    }
    return result;
  }

  

  /**
   * Create payment invoice entry
   */
  static async createPaymentInvoice(paymentId: string, userProfileId: string, userId: string, customerId: string, subscriptionId: string, planId: number): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/create-payment-invoice`;
      const response = await this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({
          paymentId,
          userProfileId,
          userId,
          customerId,
          subscriptionId,
          planId
        })
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to create payment invoice. Please try again.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error creating payment invoice:', error);
      throw error;
    }
  }

  /**
   * Get payment details by ID
   */
  static async getPaymentDetails(id: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/get-payment-details/${encodeURIComponent(id)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to fetch payment details. Please try again.';
        throw new Error(errorMessage);
      }

      return result.payment || null;
    } catch (error) {
      console.error('Error fetching payment details:', error);
      throw error;
    }
  }

  /**
   * Get payment confirmation details by userProfileId
   */
  static async getPaymentConfirmationDetails(userProfileId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/get-payment-confirmation/${encodeURIComponent(userProfileId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to fetch payment confirmation details. Please try again.';
        throw new Error(errorMessage);
      }

      return result.paymentConfirmation || null;
    } catch (error) {
      console.error('Error fetching payment confirmation details:', error);
      throw error;
    }
  }

  /**
   * Get All Payment Method details by user ID
   */
  static async getUserPaymentMethods(userId: string): Promise<any[]> {
    try {
      const url = `${this.baseUrl}api/Node/cards/${encodeURIComponent(userId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Error Fetching Payment methods. Please try again.';
        throw new Error(errorMessage);
      }

      // The API returns the array directly, not wrapped in a paymentMethods property
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Error Fetching Payment methods.', error);
      throw error;
    }
  }

  /**
   * Check if a plan has active subscribers
   */
  static async checkPlanSubscribers(planId: string): Promise<{ hasSubscribers: boolean; subscriberCount?: number }> {
    try {
      const url = `${this.baseUrl}api/node/plan-subscribers/${encodeURIComponent(planId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        return { hasSubscribers: false };
      }

      if (!response.ok) {
        return { hasSubscribers: false };
      }

      return {
        hasSubscribers: result.subscriberCount > 0,
        subscriberCount: result.subscriberCount || 0
      };
    } catch (error) {
      console.error('Error checking plan subscribers:', error);
      return { hasSubscribers: false };
    }
  }

  /**
   * Save or update a plan
   */
  static async savePlan(planData: {
    planID?: number | 0;
    PlanTitle: string;
    PlanSubtitle: string;
    PlanDescription: string;
    IsPopular: boolean;
    AmountPerMonth: number;
    AmountPerYear: number;
    addedFeatures: string[];
    deletedFeatureIds?: number[];
    updatedFeatures?: Array<{
      featureId: number;
      Description: string;
    }>;
  }): Promise<any> {
    try {
      const url = `${this.baseUrl}api/node/saveplan`;
      console.log('Sending to API:', JSON.stringify(planData, null, 2));
      const response = await this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify(planData)
      });

      console.log('Sending to API:', JSON.stringify(planData, null, 2));

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to save plan.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error saving plan:', error);
      throw error;
    }
  }

  /**
   * Update plan status (active/inactive)
   */
  static async updatePlanStatus(planId: number, status: number): Promise<any> {
    try {
      const url = `${this.baseUrl}api/node/UpdatePlanStatus`;
      const response = await this.fetchWithAuth(url, {
        method: 'POST',
        body: JSON.stringify({
          planId: planId || 0,
          status
        })
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to update plan status.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error updating plan status:', error);
      throw error;
    }
  }

  /**
   * Delete a plan by ID
   */
  static async deletePlan(planId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/node/DeletePlan/${encodeURIComponent(planId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'POST'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to delete plan.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error deleting plan:', error);
      throw error;
    }
  }

  /**
   * Set default payment method for a user
   */
  static async setdefaultcard(userId: string, paymentMethodId: string): Promise<any> {
    try {
      const response = await this.fetchWithAuth(`${this.baseUrl}api/Node/setdefaultcard/`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          paymentMethodId
        })
      });
      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        throw new Error('Failed to set default payment method. Please try again.');
      }
      if (!response.ok) {
        throw new Error(result?.message || 'Failed to set default payment method. Please try again.');
      }
      return result;
    } catch (error) {
      console.error('Error setting default payment method:', error);
      throw error;
    }
  }

  /**
   * Delete a payment method for a user
   */
  static async deletePaymentMethod(userId: string, paymentMethodId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Node/card/${encodeURIComponent(userId)}/${encodeURIComponent(paymentMethodId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'DELETE'
      });
      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        result = { message: 'Unknown error' };
      }
      if (!response.ok) {
        throw new Error(result?.error || result?.message || 'Failed to delete payment method.');
      }
      return result;
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  }

  /**
   * Get the default payment method id for a user
   */
  static async getDefaultCard(userId: string): Promise<string | null> {
    try {
      const url = `${this.baseUrl}api/Node/defaultcard/${encodeURIComponent(userId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });
      if (!response.ok) return null;
      const result = await response.json();
      return result.paymentMethodId || null;
    } catch (e) {
      return null;
    }
  }

  static async getIsAdmin(userId: string): Promise<boolean> {
    try {
      const url = `${this.baseUrl}api/Node/isadmin/${encodeURIComponent(userId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });
      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        return false;
      }
      if (!response.ok) {
        throw new Error(result?.message || 'Unable to check admin status.');
      }
      return !!result.isAdmin;
    } catch (error) {
      console.error('Error fetching isAdmin:', error);
      return false;
    }
  }

  /**
   * Create Stripe payment intent and return client secret
   */
  static async createPaymentIntent(priceId: string, customerEmail: string, userId?: string, planId?: number, billingCycle?: string): Promise<PaymentIntentInitResult> {
    try {
      const payload: any = {
        priceId: priceId,
        customerEmail: customerEmail
      };
      if (userId) payload.userId = userId;
      if (planId) payload.planId = planId.toString();
      if (billingCycle) payload.billingCycle = billingCycle;

      const response = await this.fetchWithAuth(
        `${this.baseUrl}api/Node/create-payment-intent`,
        {
          method: 'POST',
          body: JSON.stringify(payload)
        }
      );

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;

      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        result = responseText;
      }

      if (!response.ok) {
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to create payment intent.';
        throw new Error(errorMessage);
      }

      const clientSecret = result?.clientSecret || result?.client_secret;
      if (!clientSecret || typeof clientSecret !== 'string') {
        throw new Error('Invalid response from payment intent API.');
      }

      const responseObj: PaymentIntentInitResult = {
        clientSecret,
        userProfileId: result?.userProfileId || result?.UserProfileId,
        customerId: result?.customerId || result?.CustomerId,
        subscriptionId: result?.subscriptionId || result?.SubscriptionId,
        priceId: result?.priceId || result?.PriceId
      };
      return responseObj;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Upgrade existing subscription to a new plan/price
   */
  static async upgradeSubscription(userId: string, planId: number, billingCycle: string): Promise<any> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}api/Node/upgrade-subscription`,
        {
          method: 'POST',
          body: JSON.stringify({
            userId: userId,
          planId: planId.toString(),
          billingCycle: billingCycle
        })
      });

      const responseText = await response.text();
      let result: any = responseText;
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        result = responseText;
      }

      if (!response.ok) {
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to upgrade subscription.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      throw error;
    }
  }

  /**
   * Submit a contact inquiry from the GetInTouchHomeThree form
   */
  static async submitContactInquiry(contactData: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    message: string;
  }): Promise<any> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}api/Node/insertcontactinquiry`,
        {
          method: 'POST',
          body: JSON.stringify(contactData)
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to submit your inquiry. Please try again.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error submitting contact inquiry:', error);
      throw error;
    }
  }

  /**
   * Get Stripe public key from server configuration
   */
  static async getStripePublicKey(): Promise<string> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}api/Node/stripe-public-key`,
        { method: 'GET' }
      );

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to fetch Stripe public key.';
        throw new Error(errorMessage);
      }

      return result.publicKey || '';
    } catch (error) {
      console.error('Error fetching Stripe public key:', error);
      throw error;
    }
  }

  /**
   * Get Stripe customer by email
   */
  static async getStripeCustomer(email: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/Stripe/customer?email=${encodeURIComponent(email)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'GET'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to retrieve customer information';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error fetching Stripe customer:', error);
      throw error;
    }
  }

  /**
   * Save payment method to customer
   */
  static async savePaymentMethod(customerId: string, paymentMethodId: string, setAsDefault: boolean = true): Promise<any> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}api/stripe/payments/cards`,
        {
          method: 'POST',
          body: JSON.stringify({
            customerId,
            paymentMethodId,
            setAsDefault
          })
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to save payment method';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error saving payment method:', error);
      throw error;
    }
  }

  /**
   * Delete payment method by ID
   */
  static async deletePaymentMethodById(paymentMethodId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}api/stripe/payments/cards/${encodeURIComponent(paymentMethodId)}`;
      const response = await this.fetchWithAuth(url, {
        method: 'DELETE'
      });

      // Read response as text first
      const responseText = await response.text();
      let result: any = responseText;
      
      // Try to parse as JSON if it looks like JSON
      try {
        if (responseText.trim().startsWith('{') || responseText.trim().startsWith('[')) {
          result = JSON.parse(responseText);
        }
      } catch (e) {
        // If JSON parsing fails, keep the text response
        result = responseText;
      }

      if (!response.ok) {
        // Return the exact error message from the API
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Failed to delete payment method';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  }
}

// Export default instance
export default NodeService;
