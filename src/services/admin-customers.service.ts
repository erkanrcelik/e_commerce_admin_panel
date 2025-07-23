import api from '@/lib/axios';
import type {
  AdminCustomer,
  CustomerApiResponse,
  CustomerListQuery,
  CustomerListResponse,
  CustomerOrder,
  CustomerStats,
} from '@/types/admin-customers';

/**
 * Admin customer management API service
 * Central service class for all admin customer operations
 */
export class AdminCustomersService {
  /**
   * Get customers with pagination
   * @param query - Listing filters and pagination parameters
   * @returns Promise<CustomerListResponse> - Customer list and pagination info
   * @throws {Error} Throws error on API failure
   */
  static async getCustomers(
    query?: CustomerListQuery
  ): Promise<CustomerListResponse> {
    try {
      const params = new URLSearchParams();
      if (query?.page) params.append('page', query.page.toString());
      if (query?.limit) params.append('limit', query.limit.toString());
      if (query?.search) params.append('search', query.search);
      if (query?.isActive !== undefined)
        params.append('isActive', query.isActive.toString());

      const response = await api.get<CustomerListResponse>(
        `/admin/customers?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error('Get customers error:', error);
      throw error;
    }
  }

  /**
   * Get single customer details
   * @param id - Customer ID
   * @returns Promise<AdminCustomer> - Customer detail information
   * @throws {Error} Throws error on API failure
   */
  static async getCustomerById(id: string): Promise<AdminCustomer> {
    try {
      const response = await api.get<AdminCustomer>(`/admin/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get customer by ID error:', error);
      throw error;
    }
  }

  /**
   * Get customer orders
   * @param id - Customer ID
   * @returns Promise<CustomerOrder[]> - Customer order list
   * @throws {Error} Throws error on API failure
   */
  static async getCustomerOrders(id: string): Promise<CustomerOrder[]> {
    try {
      const response = await api.get<CustomerOrder[]>(
        `/admin/customers/${id}/orders`
      );
      return response.data;
    } catch (error) {
      console.error('Get customer orders error:', error);
      throw error;
    }
  }

  /**
   * Delete customer
   * @param id - Customer ID
   * @returns Promise<CustomerApiResponse> - Deletion result
   * @throws {Error} Throws error on API failure
   */
  static async deleteCustomer(id: string): Promise<CustomerApiResponse> {
    try {
      const response = await api.delete<CustomerApiResponse>(
        `/admin/customers/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Delete customer error:', error);
      throw error;
    }
  }

  /**
   * Toggle customer status (active/inactive)
   * @param id - Customer ID
   * @returns Promise<AdminCustomer> - Updated customer information
   * @throws {Error} Throws error on API failure
   */
  static async toggleCustomerStatus(id: string): Promise<AdminCustomer> {
    try {
      const response = await api.put<AdminCustomer>(
        `/admin/customers/${id}/toggle-status`
      );
      return response.data;
    } catch (error) {
      console.error('Toggle customer status error:', error);
      throw error;
    }
  }

  /**
   * Get customer statistics
   * @returns Promise<CustomerStats> - General customer statistics
   * @throws {Error} Throws error on API failure
   */
  static async getCustomerStats(): Promise<CustomerStats> {
    try {
      const response = await api.get<CustomerStats>(
        '/admin/customers/stats/overview'
      );
      return response.data;
    } catch (error) {
      console.error('Get customer stats error:', error);
      throw error;
    }
  }
}
