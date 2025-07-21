export type UserRole = 'admin' | 'vendor' | 'customer' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  addresses?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }[];
}

export interface UserOrder {
  orderId: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
}

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  isActive?: boolean;
  addresses?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }[];
}

export interface UserFilters extends Record<string, string | boolean | number | undefined> {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  sortBy?:
    | 'name'
    | 'email'
    | 'createdAt'
    | 'lastLoginAt'
    | 'totalOrders'
    | 'totalSpent';
  sortOrder?: 'asc' | 'desc';
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
