import api from '@/lib/axios';
import type { ApiResponse } from '@/types/admin-dashboard';
import type {
    AdminUserDetail,
    AdminUsersResponse,
    ChangeRoleRequest,
    ChangeRoleResponse,
    ToggleUserStatusResponse,
    UpdateUserRequest,
    UpdateUserResponse
} from '@/types/admin-users';

// Admin Users Service
export const adminUsersService = {
  /**
   * Get all users with pagination and filters
   */
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: 'admin' | 'seller' | 'customer';
    isActive?: boolean;
  }): Promise<ApiResponse<AdminUsersResponse>> => {
    return api.get('/admin/users', { params });
  },

  /**
   * Get user by ID
   */
  getById: (id: string): Promise<ApiResponse<AdminUserDetail>> => {
    return api.get(`/admin/users/${id}`);
  },

  /**
   * Update user
   */
  update: (id: string, data: UpdateUserRequest): Promise<ApiResponse<UpdateUserResponse>> => {
    return api.put(`/admin/users/${id}`, data);
  },

  /**
   * Delete user
   */
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete(`/admin/users/${id}`);
  },

  /**
   * Toggle user status
   */
  toggleStatus: (id: string): Promise<ApiResponse<ToggleUserStatusResponse>> => {
    return api.put(`/admin/users/${id}/toggle-status`);
  },

  /**
   * Change user role
   */
  changeRole: (id: string, data: ChangeRoleRequest): Promise<ApiResponse<ChangeRoleResponse>> => {
    return api.put(`/admin/users/${id}/change-role`, data);
  },
};
