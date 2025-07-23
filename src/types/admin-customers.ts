/**
 * Admin customer management type definitions
 */

/**
 * Customer address information
 */
export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

/**
 * Customer order item information
 */
export interface CustomerOrderItem {
  _id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

/**
 * Customer order
 */
export interface CustomerOrder {
  _id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: CustomerOrderItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Customer entity interface
 */
export interface AdminCustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'customer';
  isActive: boolean;
  isEmailVerified: boolean;
  addresses: CustomerAddress[];
  orders: CustomerOrder[];
  totalSpent: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

/**
 * Customer list query parameters
 */
export interface CustomerListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  // Index signature for compatibility with FilterBar component
  [key: string]: string | number | boolean | undefined;
}

/**
 * Customer list API response
 */
export interface CustomerListResponse {
  data: AdminCustomer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Customer statistics
 */
export interface CustomerStats {
  total: number;
  active: number;
  inactive: number;
  totalRevenue: number;
  averageOrderValue: number;
}

/**
 * API response wrapper for customer operations
 */
export interface CustomerApiResponse {
  message: string;
}
