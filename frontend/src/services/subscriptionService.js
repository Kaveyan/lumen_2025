const API_BASE_URL = 'http://localhost:5000/api';

class SubscriptionService {
  // Get auth token from localStorage
  getAuthToken() {
    return localStorage.getItem('token');
  }

  // Get auth headers
  getAuthHeaders() {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  // Get available plans
  async getAvailablePlans() {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching plans:', error);
      throw error;
    }
  }

  // Get current subscription
  async getCurrentSubscription() {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/current`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 404) {
          return { success: true, subscription: null };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current subscription:', error);
      throw error;
    }
  }

  // Subscribe to a new plan
  async subscribeToNewPlan(planId, billingCycle = 'monthly') {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/subscribe`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          planId,
          billingCycle
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      throw error;
    }
  }

  // Upgrade subscription
  async upgradeSubscription(newPlanId, billingCycle = 'monthly') {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/upgrade`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          newPlanId,
          billingCycle
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      throw error;
    }
  }

  // Downgrade subscription
  async downgradeSubscription(newPlanId, billingCycle = 'monthly') {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/downgrade`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          newPlanId,
          billingCycle
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error downgrading subscription:', error);
      throw error;
    }
  }

  // Cancel subscription
  async cancelSubscription(reason = '') {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/cancel`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          reason
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  }

  // Get payment history
  async getPaymentHistory(limit = 10, page = 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/subscriptions/payment-history?limit=${limit}&page=${page}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching payment history:', error);
      throw error;
    }
  }

  // Get active offers
  async getActiveOffers() {
    try {
      const response = await fetch(`${API_BASE_URL}/offers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching offers:', error);
      throw error;
    }
  }

  // Apply offer
  async applyOffer(offerId, planId) {
    try {
      const response = await fetch(`${API_BASE_URL}/offers/apply`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ offerId, planId })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error applying offer:', error);
      throw error;
    }
  }
}

export default new SubscriptionService();
