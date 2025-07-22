import api from '@/lib/axios';
import type {
  AdminCategory,
  AdminCategoryStats,
  CategoryApiResponse,
  CategoryImageUploadResponse,
  CategoryListQuery,
  CategoryListResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types/admin-categories';

/**
 * Admin category management API service
 * Central service class for all admin category operations
 */
export class AdminCategoriesService {
  /**
   * Create a new category
   * @param data - Category creation data
   * @returns Promise<AdminCategory> - Created category information
   * @throws {Error} Throws error on API failure
   */
  static async createCategory(data: CreateCategoryRequest): Promise<AdminCategory> {
    try {
      const response = await api.post<AdminCategory>('/admin/categories', data);
      return response.data;
    } catch (error) {
      console.error('Category creation error:', error);
      throw error;
    }
  }

  /**
   * Get categories with pagination and filtering
   * @param query - Listing filters and pagination parameters
   * @returns Promise<CategoryListResponse> - Category list and pagination info
   * @throws {Error} Throws error on API failure
   */
  static async getCategories(query?: CategoryListQuery): Promise<CategoryListResponse> {
    try {
      const params = new URLSearchParams();
      if (query?.page) params.append('page', query.page.toString());
      if (query?.limit) params.append('limit', query.limit.toString());
      if (query?.search) params.append('search', query.search);
      if (query?.isActive !== undefined) params.append('isActive', query.isActive.toString());

      const response = await api.get<CategoryListResponse>(`/admin/categories?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get categories:', error);
      throw error;
    }
  }

  /**
   * Get single category details
   * @param id - Category ID
   * @returns Promise<AdminCategory> - Category detail information
   * @throws {Error} Throws error on API failure
   */
  static async getCategoryById(id: string): Promise<AdminCategory> {
    try {
      const response = await api.get<AdminCategory>(`/admin/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get category details:', error);
      throw error;
    }
  }

  /**
   * Update category information
   * @param id - Category ID
   * @param data - Category data to update
   * @returns Promise<AdminCategory> - Updated category information
   * @throws {Error} Throws error on API failure
   */
  static async updateCategory(id: string, data: UpdateCategoryRequest): Promise<AdminCategory> {
    try {
      const response = await api.put<AdminCategory>(`/admin/categories/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Category update error:', error);
      throw error;
    }
  }

  /**
   * Delete category
   * @param id - Category ID
   * @returns Promise<CategoryApiResponse> - Deletion result
   * @throws {Error} Throws error on API failure
   */
  static async deleteCategory(id: string): Promise<CategoryApiResponse> {
    try {
      const response = await api.delete<CategoryApiResponse>(`/admin/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Category deletion error:', error);
      throw error;
    }
  }

  /**
   * Upload category image
   * @param id - Category ID  
   * @param imageFile - Image file to upload
   * @param categoryName - Category name for the image
   * @returns Promise<CategoryImageUploadResponse> - Uploaded image information
   * @throws {Error} Throws error on API failure
   */
  static async uploadCategoryImage(id: string, imageFile: File, categoryName?: string): Promise<CategoryImageUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      // Backend expects name field, send category name
      if (categoryName) {
        formData.append('name', categoryName);
      }

      const response = await api.post<CategoryImageUploadResponse>(`/admin/categories/${id}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Category image upload error:', error);
      throw error;
    }
  }

  /**
   * Delete category image
   * @param id - Category ID
   * @returns Promise<CategoryApiResponse> - Deletion result
   * @throws {Error} Throws error on API failure
   */
  static async deleteCategoryImage(id: string): Promise<CategoryApiResponse> {
    try {
      const response = await api.delete<CategoryApiResponse>(`/admin/categories/${id}/image`);
      return response.data;
    } catch (error) {
      console.error('Category image deletion error:', error);
      throw error;
    }
  }

  /**
   * Toggle category status (active/inactive)
   * @param id - Category ID
   * @returns Promise<AdminCategory> - Updated category with new status
   * @throws {Error} Throws error on API failure
   */
  static async toggleCategoryStatus(id: string): Promise<AdminCategory> {
    try {
      const response = await api.patch<AdminCategory>(`/admin/categories/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error('Category status toggle error:', error);
      throw error;
    }
  }

  /**
   * Get category statistics
   * @returns Promise<AdminCategoryStats> - General category statistics
   * @throws {Error} Throws error on API failure
   */
  static async getCategoryStats(): Promise<AdminCategoryStats> {
    try {
      const response = await api.get<AdminCategoryStats>('/admin/categories/stats/overview');
      return response.data;
    } catch (error) {
      console.error('Failed to get category statistics:', error);
      throw error;
    }
  }
} 