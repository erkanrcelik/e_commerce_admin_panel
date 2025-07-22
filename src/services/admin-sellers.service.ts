import api from '@/lib/axios';
import type {
    AdminSeller,
    SellerApiResponse,
    SellerListQuery,
    SellerListResponse,
    SellerStats,
} from '@/types/admin-sellers';

/**
 * Admin seller management API service
 * Central service class for all admin seller operations
 */
export class AdminSellersService {
  /**
   * Get sellers with pagination
   * @param query - Listing filters and pagination parameters
   * @returns Promise<SellerListResponse> - Seller list and pagination info
   * @throws {Error} Throws error on API failure
   */
  static async getSellers(query?: SellerListQuery): Promise<SellerListResponse> {
    try {
      const params = new URLSearchParams();
      if (query?.page) params.append('page', query.page.toString());
      if (query?.limit) params.append('limit', query.limit.toString());
      if (query?.search) params.append('search', query.search);
      if (query?.isApproved !== undefined) params.append('isApproved', query.isApproved.toString());
      if (query?.isActive !== undefined) params.append('isActive', query.isActive.toString());

      const response = await api.get<SellerListResponse>(`/admin/sellers?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get sellers:', error);
      throw error;
    }
  }

  /**
   * Get single seller details
   * @param id - Seller ID
   * @returns Promise<AdminSeller> - Seller detail information
   * @throws {Error} Throws error on API failure
   */
  static async getSellerById(id: string): Promise<AdminSeller> {
    try {
      const response = await api.get<AdminSeller>(`/admin/sellers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get seller details:', error);
      throw error;
    }
  }

  /**
   * Approve seller
   * @param id - Seller ID
   * @returns Promise<AdminSeller> - Updated seller information
   * @throws {Error} Throws error on API failure
   */
  static async approveSeller(id: string): Promise<AdminSeller> {
    try {
      const response = await api.patch<AdminSeller>(`/admin/sellers/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error('Seller approval error:', error);
      throw error;
    }
  }

  /**
   * Reject seller
   * @param id - Seller ID
   * @returns Promise<AdminSeller> - Updated seller information
   * @throws {Error} Throws error on API failure
   */
  static async rejectSeller(id: string): Promise<AdminSeller> {
    try {
      const response = await api.patch<AdminSeller>(`/admin/sellers/${id}/reject`);
      return response.data;
    } catch (error) {
      console.error('Seller rejection error:', error);
      throw error;
    }
  }

  /**
   * Delete seller
   * @param id - Seller ID
   * @returns Promise<SellerApiResponse> - Deletion result
   * @throws {Error} Throws error on API failure
   */
  static async deleteSeller(id: string): Promise<SellerApiResponse> {
    try {
      const response = await api.delete<SellerApiResponse>(`/admin/sellers/${id}`);
      return response.data;
    } catch (error) {
      console.error('Seller deletion error:', error);
      throw error;
    }
  }

  /**
   * Toggle seller status (active/inactive)
   * @param id - Seller ID
   * @returns Promise<AdminSeller> - Updated seller information
   * @throws {Error} Throws error on API failure
   */
  static async toggleSellerStatus(id: string): Promise<AdminSeller> {
    try {
      const response = await api.put<AdminSeller>(`/admin/sellers/${id}/toggle-status`);
      return response.data;
    } catch (error) {
      console.error('Seller status toggle error:', error);
      throw error;
    }
  }

  /**
   * Get seller statistics
   * @returns Promise<SellerStats> - General seller statistics
   * @throws {Error} Throws error on API failure
   */
  static async getSellerStats(): Promise<SellerStats> {
    try {
      const response = await api.get<SellerStats>('/admin/sellers/stats/overview');
      return response.data;
    } catch (error) {
      console.error('Failed to get seller statistics:', error);
      throw error;
    }
  }
} 