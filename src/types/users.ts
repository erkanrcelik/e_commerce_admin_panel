export type UserRole = 'admin' | 'vendor' | 'customer' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  totalOrders: number;
  totalSpent: number;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetails extends User {
  orders: Order[];
  recentActivity: {
    type: 'login' | 'order' | 'profile_update' | 'password_change';
    description: string;
    timestamp: string;
  }[];
}

export interface CreateUserData {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: UserRole;
  status?: UserStatus;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface UserFilters {
  search?: string;
  role?: UserRole;
  status?: UserStatus;
  sortBy?:
    | 'name'
    | 'email'
    | 'createdAt'
    | 'lastLoginAt'
    | 'totalOrders'
    | 'totalSpent';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
