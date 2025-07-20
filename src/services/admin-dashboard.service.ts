import api from '@/lib/axios';
import type {
    ApiResponse,
    DashboardStatistics,
    DashboardSummary,
    PlatformTrends,
    RecentActivity
} from '@/types/admin-dashboard';

// Admin Dashboard Service
export const adminDashboardService = {
  /**
   * Get platform statistics
   */
  getStatistics: (): Promise<ApiResponse<DashboardStatistics>> => {
    return api.get('/admin/dashboard/statistics');
  },

  /**
   * Get recent activity
   */
  getRecentActivity: (limit: number = 10): Promise<ApiResponse<RecentActivity>> => {
    return api.get(`/admin/dashboard/recent-activity?limit=${limit}`);
  },

  /**
   * Get platform trends
   */
  getTrends: (period: 'daily' | 'weekly' | 'monthly' = 'monthly'): Promise<ApiResponse<PlatformTrends>> => {
    return api.get(`/admin/dashboard/trends?period=${period}`);
  },

  /**
   * Get complete dashboard summary
   */
  getSummary: (): Promise<ApiResponse<DashboardSummary>> => {
    return api.get('/admin/dashboard/summary');
  },
}; 