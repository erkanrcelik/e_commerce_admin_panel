import api from '@/lib/axios';

import type {
  Category,
  CategoryFilters,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/types/categories';

/**
 * Categories service for admin operations
 */
export class CategoriesService {
  private static readonly BASE_URL = '/admin/categories';

  /**
   * Get all categories with pagination and filters
   */
  static async getCategories(
    filters: CategoryFilters = {}
  ): Promise<{ data: Category[]; total: number; page: number; limit: number; totalPages: number }> {
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

    const response = await api.get<{ data: Category[]; total: number; page: number; limit: number; totalPages: number }>(
      `${this.BASE_URL}?${params.toString()}`
    );

    return response.data;
  }

  /**
   * Get category by ID
   */
  static async getCategory(id: string): Promise<Category> {
    const response = await api.get<Category>(
      `${this.BASE_URL}/${id}`
    );
    return response.data;
  }

  /**
   * Create new category
   */
  static async createCategory(data: CreateCategoryData): Promise<Category> {
    const response = await api.post<Category>(
      this.BASE_URL,
      data
    );
    return response.data;
  }

  /**
   * Update category
   */
  static async updateCategory(
    id: string,
    data: UpdateCategoryData
  ): Promise<Category> {
    const response = await api.put<Category>(
      `${this.BASE_URL}/${id}`,
      data
    );
    return response.data;
  }

  /**
   * Toggle category status (active/inactive)
   */
  static async toggleCategoryStatus(id: string): Promise<Category> {
    const response = await api.put<Category>(
      `${this.BASE_URL}/${id}/toggle-status`
    );
    return response.data;
  }

  /**
   * Delete category
   */
  static async deleteCategory(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
      `${this.BASE_URL}/${id}`
    );
    return response.data;
  }

  /**
   * Get category statistics
   */
  static async getCategoryStats(): Promise<{ total: number; active: number; inactive: number }> {
    const response = await api.get<{ total: number; active: number; inactive: number }>(
      `${this.BASE_URL}/stats/overview`
    );
    return response.data;
  }
}
