/**
 * Admin user interface for user management
 */
export interface AdminUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'admin' | 'vendor' | 'customer' | 'moderator';
  isActive: boolean;
  isEmailVerified: boolean;
  avatar?: string;
  addresses?: Array<{
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create user request interface
 */
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: 'admin' | 'vendor' | 'customer' | 'moderator';
}

/**
 * Update user request interface
 */
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: 'admin' | 'vendor' | 'customer' | 'moderator';
  isActive?: boolean;
}

/**
 * User list query interface
 */
export interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * User list response interface
 */
export interface UserListResponse {
  users: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * User API response interface
 */
export interface UserApiResponse {
  success: boolean;
  message: string;
  data?: AdminUser;
}

/**
 * User statistics interface
 */
export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: {
    admin: number;
    vendor: number;
    customer: number;
    moderator: number;
  };
}
