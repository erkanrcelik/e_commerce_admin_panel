import api from '@/lib/axios';
import type {
  AdminCampaign,
  AdminCampaignStats,
  CampaignApiResponse,
  CampaignListQuery,
  CampaignListResponse,
  CreatePlatformCampaignRequest,
  UpdateCampaignRequest,
} from '@/types/admin-campaigns';

/**
 * Admin campaign management API service
 * Central service class for all admin campaign operations
 */
export class AdminCampaignsService {
  /**
   * Create a new platform campaign
   * @param data - Platform campaign creation data
   * @returns Promise<AdminCampaign> - Created campaign information
   * @throws {Error} Throws error on API failure
   */
  static async createPlatformCampaign(
    data: CreatePlatformCampaignRequest
  ): Promise<AdminCampaign> {
    try {
      const response = await api.post<AdminCampaign>(
        '/admin/campaigns/platform',
        data
      );
      return response.data;
    } catch (error) {
      console.error('Create platform campaign error:', error);
      throw error;
    }
  }

  /**
   * Get campaigns with pagination
   * @param query - Listing filters and pagination parameters
   * @returns Promise<CampaignListResponse> - Campaign list and pagination info
   * @throws {Error} Throws error on API failure
   */
  static async getCampaigns(
    query?: CampaignListQuery
  ): Promise<CampaignListResponse> {
    try {
      const params = new URLSearchParams();
      if (query?.page) params.append('page', query.page.toString());
      if (query?.limit) params.append('limit', query.limit.toString());
      if (query?.search) params.append('search', query.search);
      if (query?.isActive !== undefined)
        params.append('isActive', query.isActive.toString());
      if (query?.type) params.append('type', query.type);

      const response = await api.get<CampaignListResponse>(
        `/admin/campaigns?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error('Get campaigns error:', error);
      throw error;
    }
  }

  /**
   * Get single campaign details
   * @param id - Campaign ID
   * @returns Promise<AdminCampaign> - Campaign detail information
   * @throws {Error} Throws error on API failure
   */
  static async getCampaignById(id: string): Promise<AdminCampaign> {
    try {
      const response = await api.get<AdminCampaign>(`/admin/campaigns/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get campaign by ID error:', error);
      throw error;
    }
  }

  /**
   * Update campaign information
   * @param id - Campaign ID
   * @param data - Campaign data to update
   * @returns Promise<AdminCampaign> - Updated campaign information
   * @throws {Error} Throws error on API failure
   */
  static async updateCampaign(
    id: string,
    data: UpdateCampaignRequest
  ): Promise<AdminCampaign> {
    try {
      const response = await api.put<AdminCampaign>(
        `/admin/campaigns/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error('Update campaign error:', error);
      throw error;
    }
  }

  /**
   * Delete campaign
   * @param id - Campaign ID
   * @returns Promise<CampaignApiResponse> - Deletion result
   * @throws {Error} Throws error on API failure
   */
  static async deleteCampaign(id: string): Promise<CampaignApiResponse> {
    try {
      const response = await api.delete<CampaignApiResponse>(
        `/admin/campaigns/${id}`
      );
      return response.data;
    } catch (error) {
      console.error('Delete campaign error:', error);
      throw error;
    }
  }

  /**
   * Toggle campaign status (active/inactive)
   * @param id - Campaign ID
   * @returns Promise<AdminCampaign> - Updated campaign information
   * @throws {Error} Throws error on API failure
   */
  static async toggleCampaignStatus(id: string): Promise<AdminCampaign> {
    try {
      const response = await api.put<AdminCampaign>(
        `/admin/campaigns/${id}/toggle-status`
      );
      return response.data;
    } catch (error) {
      console.error('Toggle campaign status error:', error);
      throw error;
    }
  }

  /**
   * Get campaign statistics
   * @returns Promise<AdminCampaignStats> - General campaign statistics
   * @throws {Error} Throws error on API failure
   */
  static async getCampaignStats(): Promise<AdminCampaignStats> {
    try {
      const response = await api.get<AdminCampaignStats>(
        '/admin/campaigns/stats/overview'
      );
      return response.data;
    } catch (error) {
      console.error('Get campaign stats error:', error);
      throw error;
    }
  }
}
