const API_BASE_URL = 'http://localhost:5000/api';

class AdminService {
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

  // Get dashboard analytics
  async getDashboardAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/dashboard`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard analytics:', error);
      throw error;
    }
  }

  // Get user management data
  async getUserManagement(page = 1, limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user management data:', error);
      throw error;
    }
  }

  // Get revenue analytics
  async getRevenueAnalytics(period = '6months') {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics/revenue?period=${period}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      throw error;
    }
  }

  // Get payment history
  async getPaymentHistory() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/payments`, {
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
}

const adminServiceInstance = new AdminService();
export default adminServiceInstance;
