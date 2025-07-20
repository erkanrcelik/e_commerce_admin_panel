import api from '@/lib/axios';
import type {
  Campaign,
  CampaignDetails,
  CreateCampaignData,
  UpdateCampaignData,
  CampaignFilters,
  CampaignListResponse,
} from '@/types/campaigns';

export class CampaignsService {
  /**
   * Get all campaigns with filters
   */
  static async getCampaigns(
    filters: CampaignFilters = {}
  ): Promise<CampaignListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);
    if (filters.scope) params.append('scope', filters.scope);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/campaigns?${params.toString()}`);
    return response.data;
  }

  /**
   * Get campaign by ID
   */
  static async getCampaign(id: string): Promise<Campaign> {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  }

  /**
   * Get campaign details with stats
   */
  static async getCampaignDetails(id: string): Promise<CampaignDetails> {
    const response = await api.get(`/campaigns/${id}/details`);
    return response.data;
  }

  /**
   * Create new campaign
   */
  static async createCampaign(data: CreateCampaignData): Promise<Campaign> {
    const response = await api.post('/campaigns', data);
    return response.data;
  }

  /**
   * Update campaign
   */
  static async updateCampaign(
    id: string,
    data: UpdateCampaignData
  ): Promise<Campaign> {
    const response = await api.put(`/campaigns/${id}`, data);
    return response.data;
  }

  /**
   * Delete campaign
   */
  static async deleteCampaign(id: string): Promise<void> {
    await api.delete(`/campaigns/${id}`);
  }

  /**
   * Update campaign status
   */
  static async updateCampaignStatus(
    id: string,
    status: string
  ): Promise<Campaign> {
    const response = await api.patch(`/campaigns/${id}/status`, { status });
    return response.data;
  }

  /**
   * Activate campaign
   */
  static async activateCampaign(id: string): Promise<Campaign> {
    const response = await api.post(`/campaigns/${id}/activate`);
    return response.data;
  }

  /**
   * Pause campaign
   */
  static async pauseCampaign(id: string): Promise<Campaign> {
    const response = await api.post(`/campaigns/${id}/pause`);
    return response.data;
  }

  /**
   * End campaign
   */
  static async endCampaign(id: string): Promise<Campaign> {
    const response = await api.post(`/campaigns/${id}/end`);
    return response.data;
  }

  /**
   * Duplicate campaign
   */
  static async duplicateCampaign(id: string): Promise<Campaign> {
    const response = await api.post(`/campaigns/${id}/duplicate`);
    return response.data;
  }

  /**
   * Get campaign analytics
   */
  static async getCampaignAnalytics(
    id: string,
    dateRange?: { start: string; end: string }
  ): Promise<any> {
    const params = new URLSearchParams();
    if (dateRange) {
      params.append('startDate', dateRange.start);
      params.append('endDate', dateRange.end);
    }

    const response = await api.get(
      `/campaigns/${id}/analytics?${params.toString()}`
    );
    return response.data;
  }

  /**
   * Upload campaign image
   */
  static async uploadImage(id: string, file: File): Promise<{ image: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post(`/campaigns/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Get campaign performance metrics
   */
  static async getCampaignPerformance(id: string): Promise<any> {
    const response = await api.get(`/campaigns/${id}/performance`);
    return response.data;
  }

  /**
   * Export campaign data
   */
  static async exportCampaignData(
    id: string,
    format: 'csv' | 'excel' = 'csv'
  ): Promise<Blob> {
    const response = await api.get(`/campaigns/${id}/export?format=${format}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}
