// Admin Dashboard API Types - Updated based on API documentation

/**
 * Raw activity item from API
 */
export interface RawActivityItem {
  type:
    | 'user_registration'
    | 'product_added'
    | 'campaign_created'
    | 'order_placed';
  title: string;
  description: string;
  createdAt: string;
  // User registration fields
  userId?: string;
  userEmail?: string;
  userRole?: string;
  // Product fields
  productId?: string;
  productName?: string;
  categoryName?: string;
  sellerName?: string;
  price?: number;
  // Campaign fields
  campaignId?: string;
  campaignName?: string;
  discountValue?: number;
  campaignType?: string;
  // Order fields
  orderId?: string;
  customerName?: string;
  totalPrice?: number;
  itemCount?: number;
  orderStatus?: string;
}

/**
 * Raw activities API response
 */
export type RawActivitiesResponse = RawActivityItem[];

/**
 * User statistics from dashboard API
 */
export interface UserStats {
  total: number;
  customers: number;
  sellers: number;
  admins: number;
  newThisMonth: number;
  activeToday: number;
}

/**
 * Product statistics from dashboard API
 */
export interface ProductStats {
  total: number;
  active: number;
  inactive: number;
  newThisMonth: number;
  topCategories: TopCategory[];
}

/**
 * Top category information
 */
export interface TopCategory {
  categoryId: string;
  categoryName: string;
  productCount: number;
}

/**
 * Order statistics from dashboard API
 */
export interface OrderStats {
  total: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  todayOrders: number;
  thisMonthOrders: number;
  totalRevenue: number;
  thisMonthRevenue: number;
}

/**
 * Campaign statistics from dashboard API
 */
export interface CampaignStats {
  total: number;
  active: number;
  platform: number;
  seller: number;
  expiringSoon: number;
}

/**
 * Category statistics from dashboard API
 */
export interface CategoryStats {
  total: number;
  active: number;
}

/**
 * Review statistics from dashboard API
 */
export interface ReviewStats {
  total: number;
  pending: number;
  approved: number;
  averageRating: number;
}

/**
 * System health metrics
 */
export interface SystemHealth {
  pendingSellerApprovals: number;
  lowStockProducts: number;
  expiredCampaigns: number;
  unverifiedUsers: number;
}

/**
 * Main dashboard statistics response
 */
export interface DashboardStats {
  users: UserStats;
  products: ProductStats;
  orders: OrderStats;
  campaigns: CampaignStats;
  categories: CategoryStats;
  reviews: ReviewStats;
  systemHealth: SystemHealth;
}

/**
 * New user activity
 */
export interface NewUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  createdAt: string;
}

/**
 * Recent order activity
 */
export interface RecentOrder {
  _id: string;
  customerName: string;
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  itemCount: number;
  createdAt: string;
}

/**
 * New product activity
 */
export interface NewProduct {
  _id: string;
  name: string;
  price: number;
  sellerName: string;
  category: string;
  createdAt: string;
}

/**
 * New campaign activity
 */
export interface NewCampaign {
  _id: string;
  name: string;
  type: 'platform' | 'seller';
  discountValue: number;
  sellerName: string | null;
  createdAt: string;
}

/**
 * Dashboard activities response
 */
export interface DashboardActivities {
  newUsers: NewUser[];
  recentOrders: RecentOrder[];
  newProducts: NewProduct[];
  newCampaigns: NewCampaign[];
}

/**
 * Daily order chart data
 */
export interface DailyOrderData {
  date: string;
  orders: number;
  revenue: number;
}

/**
 * Monthly revenue chart data
 */
export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  orderCount: number;
}

/**
 * User registration chart data
 */
export interface UserRegistrationData {
  date: string;
  customers: number;
  sellers: number;
}

/**
 * Category distribution chart data
 */
export interface CategoryDistributionData {
  categoryName: string;
  productCount: number;
  revenue: number;
}

/**
 * Order status distribution chart data
 */
export interface OrderStatusDistributionData {
  status: string;
  count: number;
  percentage: number;
}

/**
 * Dashboard charts response
 */
export interface DashboardCharts {
  dailyOrders: DailyOrderData[];
  monthlyRevenue: MonthlyRevenueData[];
  userRegistrations: UserRegistrationData[];
  categoryDistribution: CategoryDistributionData[];
  orderStatusDistribution: OrderStatusDistributionData[];
}

/**
 * System alert
 */
export interface SystemAlert {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  count: number;
  actionRequired: boolean;
}

/**
 * Dashboard health response
 */
export interface DashboardHealth {
  status: 'healthy' | 'warning' | 'critical';
  alerts: SystemAlert[];
  systemHealth: SystemHealth;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
}

// Legacy types for backward compatibility (will be removed)
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
  type: 'order' | 'user' | 'product' | 'campaign';
  description: string;
  createdAt: string;
  userId?: string;
  orderId?: string;
  productId?: string;
}

export interface PlatformTrends {
  revenue: number[];
  orders: number[];
  users: number[];
  period: string[];
}

export interface DashboardSummary {
  statistics: DashboardStatistics;
  recentActivity: RecentActivity;
  trends: PlatformTrends;
}
