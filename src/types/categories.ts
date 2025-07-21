export interface Category {
  _id: string;
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
  image?: string;
  isActive?: boolean;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export interface CategoryFilters extends Record<string, string | boolean | number | undefined> {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: 'name' | 'createdAt' | 'productCount';
  sortOrder?: 'asc' | 'desc';
}

export interface CategoryListResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
}
