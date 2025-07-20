import api from '@/lib/axios';
import type {
  AddProductsRequest,
  AddProductsResponse,
  Campaign,
  CampaignDetail,
  CampaignProductsResponse,
  CampaignsResponse,
  CreateCampaignRequest,
  ToggleCampaignStatusResponse,
  UpdateCampaignRequest,
} from '@/types/admin-campaigns';
import type { ApiResponse } from '@/types/admin-dashboard';

// Admin Campaigns Service
export const adminCampaignsService = {
  /**
   * Get all platform campaigns with pagination and filters
   */
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }): Promise<ApiResponse<CampaignsResponse>> => {
    return api.get('/admin/campaigns/platform', { params });
  },

  /**
   * Get campaign by ID
   */
  getById: (id: string): Promise<ApiResponse<CampaignDetail>> => {
    return api.get(`/admin/campaigns/platform/${id}`);
  },

  /**
   * Create new campaign
   */
  create: (data: CreateCampaignRequest): Promise<ApiResponse<Campaign>> => {
    return api.post('/admin/campaigns/platform', data);
  },

  /**
   * Update campaign
   */
  update: (id: string, data: UpdateCampaignRequest): Promise<ApiResponse<Campaign>> => {
    return api.put(`/admin/campaigns/platform/${id}`, data);
  },

  /**
   * Delete campaign
   */
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete(`/admin/campaigns/platform/${id}`);
  },

  /**
   * Toggle campaign status
   */
  toggleStatus: (id: string): Promise<ApiResponse<ToggleCampaignStatusResponse>> => {
    return api.put(`/admin/campaigns/platform/${id}/toggle-status`);
  },

  /**
   * Add products to campaign
   */
  addProducts: (id: string, data: AddProductsRequest): Promise<ApiResponse<AddProductsResponse>> => {
    return api.post(`/admin/campaigns/platform/${id}/products`, data);
  },

  /**
   * Remove product from campaign
   */
  removeProduct: (id: string, productId: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete(`/admin/campaigns/platform/${id}/products/${productId}`);
  },

  /**
   * Get campaign products
   */
  getProducts: (id: string): Promise<ApiResponse<CampaignProductsResponse>> => {
    return api.get(`/admin/campaigns/platform/${id}/products`);
  },
};
