import api from '@/lib/axios';
import type {
  ApiResponse,
  DashboardActivities,
  DashboardCharts,
  DashboardHealth,
  // Legacy types for backward compatibility
  DashboardStatistics,
  DashboardStats,
  DashboardSummary,
  NewCampaign,
  NewProduct,
  NewUser,
  PlatformTrends,
  RawActivitiesResponse,
  RawActivityItem,
  RecentActivity,
  RecentOrder
} from '@/types/admin-dashboard';

/**
 * Transform raw activities to categorized format
 */
const transformActivities = (rawActivities: RawActivityItem[]): DashboardActivities => {
  const newUsers: NewUser[] = [];
  const recentOrders: RecentOrder[] = [];
  const newProducts: NewProduct[] = [];
  const newCampaigns: NewCampaign[] = [];

  rawActivities.forEach((activity) => {
    switch (activity.type) {
      case 'user_registration':
        if (activity.userId && activity.userEmail) {
          // Extract names from description or use defaults
          const nameParts = activity.description.match(/^(\w+)\s+(\w+)/);
          const firstName = nameParts?.[1] || 'Unknown';
          const lastName = nameParts?.[2] || 'User';
          
          newUsers.push({
            _id: activity.userId,
            firstName,
            lastName,
            email: activity.userEmail,
            role: (activity.userRole as 'customer' | 'seller' | 'admin') || 'customer',
            createdAt: activity.createdAt,
          });
        }
        break;

      case 'order_placed':
        if (activity.orderId && activity.customerName && activity.totalPrice && activity.itemCount) {
          recentOrders.push({
            _id: activity.orderId,
            customerName: activity.customerName,
            totalPrice: activity.totalPrice,
            status: (activity.orderStatus as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') || 'pending',
            itemCount: activity.itemCount,
            createdAt: activity.createdAt,
          });
        }
        break;

      case 'product_added':
        if (activity.productId && activity.productName && activity.price) {
          newProducts.push({
            _id: activity.productId,
            name: activity.productName,
            price: activity.price,
            sellerName: activity.sellerName || 'Unknown Seller',
            category: activity.categoryName || 'Uncategorized',
            createdAt: activity.createdAt,
          });
        }
        break;

      case 'campaign_created':
        if (activity.campaignId && activity.campaignName && activity.discountValue) {
          newCampaigns.push({
            _id: activity.campaignId,
            name: activity.campaignName,
            type: (activity.campaignType as 'platform' | 'seller') || 'platform',
            discountValue: activity.discountValue,
            sellerName: activity.sellerName || null,
            createdAt: activity.createdAt,
          });
        }
        break;
    }
  });

  return {
    newUsers,
    recentOrders,
    newProducts,
    newCampaigns,
  };
};

/**
 * Admin Dashboard Service - Updated to match API documentation
 * Handles all admin dashboard data fetching
 */
export const adminDashboardService = {
  /**
   * Get dashboard statistics
   * Endpoint: GET /admin/dashboard/stats
   */
  getStats: async (): Promise<DashboardStats> => {
    try {
      const response = await api.get<DashboardStats>('/admin/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Dashboard stats fetch error:', error);
      throw error;
    }
  },

  /**
   * Get dashboard activities
   * Endpoint: GET /admin/dashboard/activities
   */
  getActivities: async (limit: number = 10): Promise<DashboardActivities> => {
    try {
      const response = await api.get<RawActivitiesResponse>(`/admin/dashboard/activities?limit=${limit}`);
      return transformActivities(response.data);
    } catch (error) {
      console.error('Dashboard activities fetch error:', error);
      throw error;
    }
  },

  /**
   * Get dashboard chart data
   * Endpoint: GET /admin/dashboard/charts
   */
  getCharts: async (days: number = 30): Promise<DashboardCharts> => {
    try {
      const response = await api.get<DashboardCharts>(`/admin/dashboard/charts?days=${days}`);
      return response.data;
    } catch (error) {
      console.error('Dashboard charts fetch error:', error);
      throw error;
    }
  },

  /**
   * Get system health status
   * Endpoint: GET /admin/dashboard/health
   */
  getHealth: async (): Promise<DashboardHealth> => {
    try {
      const response = await api.get<DashboardHealth>('/admin/dashboard/health');
      return response.data;
    } catch (error) {
      console.error('Dashboard health fetch error:', error);
      throw error;
    }
  },

  // Legacy methods for backward compatibility (will be removed)
  /**
   * @deprecated Use getStats() instead
   */
  getStatistics: (): Promise<ApiResponse<DashboardStatistics>> => {
    return api.get('/admin/dashboard/statistics');
  },

  /**
   * @deprecated Use getActivities() instead
   */
  getRecentActivity: (limit: number = 10): Promise<ApiResponse<RecentActivity>> => {
    return api.get(`/admin/dashboard/recent-activity?limit=${limit}`);
  },

  /**
   * @deprecated Use getCharts() instead
   */
  getTrends: (period: 'daily' | 'weekly' | 'monthly' = 'monthly'): Promise<ApiResponse<PlatformTrends>> => {
    return api.get(`/admin/dashboard/trends?period=${period}`);
  },

  /**
   * @deprecated Use individual methods instead
   */
  getSummary: (): Promise<ApiResponse<DashboardSummary>> => {
    return api.get('/admin/dashboard/summary');
  },
}; 