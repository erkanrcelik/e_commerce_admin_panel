import api from '@/lib/axios';

import type {
  User,
  UserFilters,
  UserOrder,
  UserStats,
} from '@/types/users';

/**
 * Users service for admin operations
 */
export class UsersService {
  private static readonly BASE_URL = '/admin/customers';

  /**
   * Get all users with pagination and filters
   */
  static async getUsers(
    filters: UserFilters = {}
  ): Promise<{ data: User[]; total: number; page: number; limit: number; totalPages: number }> {
    const params = new URLSearchParams();

    // Add pagination params
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    // Add search param
    if (filters.search) params.append('search', filters.search);

    // Add status filter
    if (filters.isActive !== undefined) {
      params.append('isActive', filters.isActive.toString());
    }

    const response = await api.get<{ data: User[]; total: number; page: number; limit: number; totalPages: number }>(
      `${this.BASE_URL}?${params.toString()}`
    );

    return response.data;
  }

  /**
   * Get user by ID
   */
  static async getUser(id: string): Promise<User> {
    const response = await api.get<User>(
      `${this.BASE_URL}/${id}`
    );
    return response.data;
  }

  /**
   * Get user orders
   */
  static async getUserOrders(id: string): Promise<UserOrder[]> {
    const response = await api.get<UserOrder[]>(
      `${this.BASE_URL}/${id}/orders`
    );
    return response.data;
  }

  /**
   * Toggle user status (active/inactive)
   */
  static async toggleUserStatus(id: string): Promise<User> {
    const response = await api.put<User>(
      `${this.BASE_URL}/${id}/toggle-status`
    );
    return response.data;
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
      `${this.BASE_URL}/${id}`
    );
    return response.data;
  }

  /**
   * Get user statistics
   */
  static async getUserStats(): Promise<UserStats> {
    const response = await api.get<UserStats>(
      `${this.BASE_URL}/stats/overview`
    );
    return response.data;
  }
}
