import api from '@/lib/axios';
import type { ApiResponse } from '@/types/admin-dashboard';
import type {
  ApproveSellerResponse,
  RejectSellerResponse,
  SellerDetail,
  SellerStatistics,
  SellersResponse,
  UpdateSellerRequest,
  UpdateSellerResponse
} from '@/types/admin-sellers';

// Admin Sellers Service
export const adminSellersService = {
  /**
   * Get all sellers with pagination and filters
   */
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    isApproved?: boolean;
  }): Promise<ApiResponse<SellersResponse>> => {
    return api.get('/admin/sellers', { params });
  },

  /**
   * Get seller by ID
   */
  getById: (id: string): Promise<ApiResponse<SellerDetail>> => {
    return api.get(`/admin/sellers/${id}`);
  },

  /**
   * Approve seller
   */
  approve: (id: string): Promise<ApiResponse<ApproveSellerResponse>> => {
    return api.put(`/admin/sellers/${id}/approve`);
  },

  /**
   * Reject seller
   */
  reject: (id: string): Promise<ApiResponse<RejectSellerResponse>> => {
    return api.put(`/admin/sellers/${id}/reject`);
  },

  /**
   * Update seller
   */
  update: (id: string, data: UpdateSellerRequest): Promise<ApiResponse<UpdateSellerResponse>> => {
    return api.put(`/admin/sellers/${id}`, data);
  },

  /**
   * Delete seller
   */
  delete: (id: string): Promise<ApiResponse<{ message: string }>> => {
    return api.delete(`/admin/sellers/${id}`);
  },

  /**
   * Get seller statistics
   */
  getStatistics: (id: string): Promise<ApiResponse<SellerStatistics>> => {
    return api.get(`/admin/sellers/${id}/statistics`);
  },
};
