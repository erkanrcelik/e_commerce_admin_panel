import api from '@/lib/axios';
import type {
  User,
  UserDetails,
  CreateUserData,
  UpdateUserData,
  UserFilters,
  UserListResponse,
} from '@/types/users';

export class UsersService {
  /**
   * Get all users with filters
   */
  static async getUsers(filters: UserFilters = {}): Promise<UserListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.role) params.append('role', filters.role);
    if (filters.status) params.append('status', filters.status);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
  }

  /**
   * Get user by ID
   */
  static async getUser(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  }

  /**
   * Get user details with orders and activity
   */
  static async getUserDetails(id: string): Promise<UserDetails> {
    const response = await api.get(`/users/${id}/details`);
    return response.data;
  }

  /**
   * Create new user
   */
  static async createUser(data: CreateUserData): Promise<User> {
    const response = await api.post('/users', data);
    return response.data;
  }

  /**
   * Update user
   */
  static async updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  /**
   * Update user status
   */
  static async updateUserStatus(id: string, status: string): Promise<User> {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  }

  /**
   * Verify user email
   */
  static async verifyEmail(id: string): Promise<User> {
    const response = await api.patch(`/users/${id}/verify-email`);
    return response.data;
  }

  /**
   * Verify user phone
   */
  static async verifyPhone(id: string): Promise<User> {
    const response = await api.patch(`/users/${id}/verify-phone`);
    return response.data;
  }

  /**
   * Reset user password
   */
  static async resetPassword(id: string): Promise<void> {
    await api.post(`/users/${id}/reset-password`);
  }

  /**
   * Upload user avatar
   */
  static async uploadAvatar(
    id: string,
    file: File
  ): Promise<{ avatar: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post(`/users/${id}/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
