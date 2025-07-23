/**
 * Admin category management type definitions
 */

/**
 * Category entity interface
 */
export interface AdminCategory {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  image?: string; // API has image field
  imageUrl?: string; // For backward compatibility
  imageKey?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Category creation request data
 */
export interface CreateCategoryRequest {
  name: string;
  description: string;
  isActive: boolean;
}

/**
 * Category update request data
 */
export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Category list query parameters
 */
export interface CategoryListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  // Index signature for compatibility with FilterBar component
  [key: string]: string | number | boolean | undefined;
}

/**
 * Category list API response
 */
export interface CategoryListResponse {
  data: AdminCategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Category image upload response
 */
export interface CategoryImageUploadResponse {
  imageUrl: string;
  imageKey: string;
}

/**
 * Category statistics
 */
export interface AdminCategoryStats {
  total: number;
  active: number;
  inactive: number;
}

/**
 * API response wrapper for category operations
 */
export interface CategoryApiResponse {
  message: string;
}
