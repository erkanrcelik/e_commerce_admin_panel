// Admin Users Types
export interface AdminUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'seller' | 'customer';
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  sellerProfile?: {
    storeName: string;
    isApproved: boolean;
  };
}

export interface AdminUserDetail extends AdminUser {
  phoneNumber?: string;
  addresses: Array<{
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }>;
  sellerProfile?: {
    storeName: string;
    storeDescription?: string;
    isApproved: boolean;
    contactEmail?: string;
    contactPhone?: string;
  };
}

export interface UpdateUserRequest {
  role?: 'admin' | 'seller' | 'customer';
  isActive?: boolean;
  firstName?: string; // 2-50 karakter
  lastName?: string; // 2-50 karakter
  phoneNumber?: string;
}

export interface UpdateUserResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  updatedAt: string;
}

export interface ToggleUserStatusResponse {
  _id: string;
  email: string;
  isActive: boolean;
  updatedAt: string;
}

export interface ChangeRoleRequest {
  role: 'admin' | 'seller' | 'customer';
}

export interface ChangeRoleResponse {
  _id: string;
  email: string;
  role: string;
  updatedAt: string;
}

export type AdminUsersResponse = import('./admin-dashboard').PaginatedResponse<AdminUser>; 