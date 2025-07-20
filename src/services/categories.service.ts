import api from '@/lib/axios';
import type {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
  CategoryFilters,
  CategoryListResponse,
} from '@/types/categories';

export class CategoriesService {
  /**
   * Get all categories with filters
   */
  static async getCategories(
    filters: CategoryFilters = {}
  ): Promise<CategoryListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.isActive !== undefined)
      params.append('isActive', filters.isActive.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get(`/categories?${params.toString()}`);
    return response.data;
  }

  /**
   * Get category by ID
   */
  static async getCategory(id: string): Promise<Category> {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  }

  /**
   * Create new category
   */
  static async createCategory(data: CreateCategoryData): Promise<Category> {
    const response = await api.post('/categories', data);
    return response.data;
  }

  /**
   * Update category
   */
  static async updateCategory(
    id: string,
    data: UpdateCategoryData
  ): Promise<Category> {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  }

  /**
   * Delete category
   */
  static async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  }

  /**
   * Toggle category active status
   */
  static async toggleCategoryStatus(id: string): Promise<Category> {
    const response = await api.patch(`/categories/${id}/toggle`);
    return response.data;
  }

  /**
   * Upload category image
   */
  static async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/categories/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
