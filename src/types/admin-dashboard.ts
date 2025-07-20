// Admin Dashboard Types
export interface DashboardStatistics {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalSellers: number;
  totalProducts: number;
  totalCategories: number;
  activeCampaigns: number;
  monthlyGrowth: number;
}

export interface RecentActivity {
  recentUsers: Array<{
    _id: string;
    email: string;
    role: 'admin' | 'seller' | 'customer';
    createdAt: string;
  }>;
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    totalPrice: number;
    status: string;
    createdAt: string;
  }>;
  recentSellers: Array<{
    _id: string;
    email: string;
    companyName: string;
    status: 'approved' | 'pending';
    createdAt: string;
  }>;
}

export interface PlatformTrends {
  salesTrend: Array<{
    date: string;
    amount: number;
  }>;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  topCategories: Array<{
    name: string;
    productCount: number;
    salesAmount: number;
  }>;
}

export interface DashboardSummary {
  statistics: DashboardStatistics;
  recentActivity: RecentActivity;
  trends: PlatformTrends;
}

// Common API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
} 