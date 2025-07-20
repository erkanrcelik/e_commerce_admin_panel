// Admin Categories Types
export interface Category {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string; // 2-50 karakter
  description?: string;
  image?: string; // URL
  isActive?: boolean; // default: true
}

export interface UpdateCategoryRequest {
  name?: string; // 2-50 karakter
  description?: string;
  image?: string; // URL
  isActive?: boolean;
}

export interface ToggleStatusResponse {
  _id: string;
  name: string;
  isActive: boolean;
  updatedAt: string;
}

export type CategoriesResponse = import('./admin-dashboard').PaginatedResponse<Category>; 