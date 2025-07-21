// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY || 'yTh8r4xJwSf6ZpG3dNcQ2eV7uYbF9aD5';

// Types
export interface UserPlanDetails {
  planName: string;
  planPrice: string;
  planStatus: string;
  nextBillingDate: string;
  lastFourDigits: string;
  expiryDate: string;
  nameOnCard: string;
  country: string;
  paymentMethod: string;
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

      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        // Not valid JSON (e.g., plain text error from backend)
        return null;
      }

      if (!response.ok) {
        // If backend returned a JSON error object, use its error message
        throw new Error(result?.error || 'Unable to load your plan details. Please try refreshing the page.');
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to load your account information. Please try again.');
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'We encountered an issue while cancelling your subscription. Please try again or contact support.');
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

      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        return null;
      }

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to load plan information. Please try refreshing the page.');
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

      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        return null;
      }

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to load available plans. Please try refreshing the page.');
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

      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        return [];
      }

      if (!response.ok) {
        throw new Error(result?.error || 'Unable to load your billing history. Please try refreshing the page.');
      }

      return result.invoices || [];
    } catch (error) {
      console.error('Error fetching user invoice history:', error);
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

      let result: any;
      try {
        result = await response.json();
      } catch (e) {
        throw new Error('Oops! Something went wrong while setting up your plan. Please try refreshing the page or contact support if the issue persists.');
      }

      if (!response.ok) {
        throw new Error(result?.message || 'We encountered an issue while creating your plan. Please try again or contact our support team for assistance.');
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
}

// Export default instance
export default NodeService; 