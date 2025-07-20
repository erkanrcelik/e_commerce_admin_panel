export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productCount?: number;
}

export interface CreateCategoryData {
  name: string;
  description: string;
  image: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'createdAt' | 'productCount';
  sortOrder?: 'asc' | 'desc';
}

export interface CategoryListResponse {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
}
