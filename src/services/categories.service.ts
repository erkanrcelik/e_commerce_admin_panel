import api from '@/lib/axios';
import type {
    CategoriesResponse,
    Category,
    CreateCategoryRequest,
    ToggleStatusResponse,
    UpdateCategoryRequest,
} from '@/types/admin-categories';
import type { ApiResponse } from '@/types/admin-dashboard';

// Admin Categories Service
export const adminCategoriesService = {
  /**
   * Get all categories with pagination and filters
   */
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }): Promise<ApiResponse<CategoriesResponse>> => {
    return api.get('/admin/categories', { params });
  },

  /**
   * Get category by ID
   */
  getById: (id: string): Promise<ApiResponse<Category>> => {
    return api.get(`/admin/categories/${id}`);
  },

  /**
   * Create new category
   */
  create: (data: CreateCategoryRequest): Promise<ApiResponse<Category>> => {
    return api.post('/admin/categories', data);
  },

  /**
   * Update category
   */
  update: (id: string, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> => {
    return api.put(`/admin/categories/${id}`, data);
  },

  /**
   * Delete category
   */
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete(`/admin/categories/${id}`);
  },

  /**
   * Toggle category status
   */
  toggleStatus: (id: string): Promise<ApiResponse<ToggleStatusResponse>> => {
    return api.put(`/admin/categories/${id}/toggle-status`);
  },
};
