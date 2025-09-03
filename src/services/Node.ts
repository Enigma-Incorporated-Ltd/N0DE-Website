// API Configuration
const ensureTrailingSlash = (url: string) => (url.endsWith('/') ? url : url + '/');
const DEFAULT_API_BASE = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
  ? '/'
  : 'https://enigmaincapp.azurewebsites.net/';
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
export class NodeService {
  private static baseUrl = API_BASE_URL;
  private static apiKey = API_KEY;

  /**
   * Get user plan details by user ID
   */
  static async getUserPlanDetails(userId: string): Promise<UserPlanDetails | null> {
    try {
      const response = await fetch(`${this.baseUrl}api/Node/userplan/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/userdetails/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({
          userId: userId,
          planId: planId
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
      const response = await fetch(`${this.baseUrl}api/Node/plan/${planId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
    try {
      const response = await fetch(`${this.baseUrl}api/Node/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
        const errorMessage = result?.error || result?.message || result?.Message || responseText || 'Unable to load available plans. Please try refreshing the page.';
        throw new Error(errorMessage);
      }

      return result.plans || [];
    } catch (error) {
      console.error('Error fetching all plans:', error);
      throw error;
    }
  }

  /**
   * Get user invoice history by user ID
   */
  static async getUserInvoiceHistory(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}api/Node/userinvoicehistory/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/updateplan`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
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
      const response = await fetch(`${this.baseUrl}api/Node/createplan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({
          userId: userId,
          planId: planId.toString(),
          billingCycle: billingCycle
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
    const response = await fetch(`${this.baseUrl}api/Node/invoices`, {
      headers: {
        'Content-Type': 'application/json',
        'APIKey': this.apiKey
      }
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
    const response = await fetch(`${this.baseUrl}api/Node/allticket`, {
      headers: {
        'Content-Type': 'application/json',
        'APIKey': this.apiKey
      }
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
    const response = await fetch(`${this.baseUrl}api/Node/alluserplans`, {
      headers: {
        'Content-Type': 'application/json',
        'APIKey': this.apiKey
      }
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
   * Create payment intent with Stripe
   */
  static async createPaymentIntent(requestData: {
    userId: string;
    planId: number;
    amount: number;
    currency: string;
    planName: string;
    billingCycle: string;
    customerName: string;
    customerEmail: string;
    customerAddress: string;
    customerCity: string;
    customerState: string;
    customerZipCode: string;
    customerCountry: string;
    priceId: string;
  }): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Node/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify(requestData)
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
        const errorMessage = result?.message || result?.error || result?.Message || responseText || 'Failed to create payment intent. Please try again.';
        throw new Error(errorMessage);
      }

      return result;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  /**
   * Create payment invoice entry
   */
  static async createPaymentInvoice(paymentId: string, userProfileId: string, userId:string, customerId:string, subscriptionId:string, oldSubscriptionId:string, planId:number): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}api/Node/create-payment-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({
          paymentId: paymentId,
          userProfileId: userProfileId,
          userId: userId,
          customerId: customerId,
          subscriptionId: subscriptionId,
          oldSubscriptionId: oldSubscriptionId,
          planId: planId
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
      const response = await fetch(`${this.baseUrl}api/Node/get-payment-details/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/get-payment-confirmation/${userProfileId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/cards/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/node/plan-subscribers/${planId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/node/saveplan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
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
      const response = await fetch(`${this.baseUrl}api/node/UpdatePlanStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
        body: JSON.stringify({
          planId: planId || 0,
          status: status
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
      const response = await fetch(`${this.baseUrl}api/node/DeletePlan/${planId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/setdefaultcard/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        },
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
      const response = await fetch(`${this.baseUrl}api/Node/card/${userId}/${paymentMethodId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/defaultcard/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
      const response = await fetch(`${this.baseUrl}api/Node/isadmin/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'APIKey': this.apiKey
        }
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
}

// Export default instance
export default NodeService;
