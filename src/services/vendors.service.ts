import api from '@/lib/axios';
import type {
  Vendor,
  VendorDetails,
  VendorApplication,
  CreateVendorData,
  UpdateVendorData,
  VendorFilters,
  VendorListResponse,
} from '@/types/vendors';

export class VendorsService {
  /**
   * Get all vendors with filters
   */
  static async getVendors(
    filters: VendorFilters = {}
  ): Promise<VendorListResponse> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/vendors?${params.toString()}`);
    return response.data;
  }

  /**
   * Get vendor by ID
   */
  static async getVendor(id: string): Promise<Vendor> {
    const response = await api.get(`/vendors/${id}`);
    return response.data;
  }

  /**
   * Get vendor details with stats and recent data
   */
  static async getVendorDetails(id: string): Promise<VendorDetails> {
    const response = await api.get(`/vendors/${id}/details`);
    return response.data;
  }

  /**
   * Create new vendor
   */
  static async createVendor(data: CreateVendorData): Promise<Vendor> {
    const response = await api.post('/vendors', data);
    return response.data;
  }

  /**
   * Update vendor
   */
  static async updateVendor(
    id: string,
    data: UpdateVendorData
  ): Promise<Vendor> {
    const response = await api.put(`/vendors/${id}`, data);
    return response.data;
  }

  /**
   * Delete vendor
   */
  static async deleteVendor(id: string): Promise<void> {
    await api.delete(`/vendors/${id}`);
  }

  /**
   * Update vendor status
   */
  static async updateVendorStatus(id: string, status: string): Promise<Vendor> {
    const response = await api.patch(`/vendors/${id}/status`, { status });
    return response.data;
  }

  /**
   * Approve vendor application
   */
  static async approveVendor(id: string, notes?: string): Promise<Vendor> {
    const response = await api.post(`/vendors/${id}/approve`, { notes });
    return response.data;
  }

  /**
   * Reject vendor application
   */
  static async rejectVendor(id: string, notes: string): Promise<Vendor> {
    const response = await api.post(`/vendors/${id}/reject`, { notes });
    return response.data;
  }

  /**
   * Suspend vendor
   */
  static async suspendVendor(id: string, reason: string): Promise<Vendor> {
    const response = await api.post(`/vendors/${id}/suspend`, { reason });
    return response.data;
  }

  /**
   * Reactivate vendor
   */
  static async reactivateVendor(id: string): Promise<Vendor> {
    const response = await api.post(`/vendors/${id}/reactivate`);
    return response.data;
  }

  /**
   * Get vendor applications
   */
  static async getVendorApplications(
    filters: VendorFilters = {}
  ): Promise<VendorApplication[]> {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.type) params.append('type', filters.type);

    const response = await api.get(`/vendor-applications?${params.toString()}`);
    return response.data;
  }

  /**
   * Review vendor application
   */
  static async reviewApplication(
    id: string,
    action: 'approve' | 'reject',
    notes?: string
  ): Promise<VendorApplication> {
    const response = await api.post(`/vendor-applications/${id}/review`, {
      action,
      notes,
    });
    return response.data;
  }

  /**
   * Upload vendor logo
   */
  static async uploadLogo(id: string, file: File): Promise<{ logo: string }> {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await api.post(`/vendors/${id}/logo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Upload vendor banner
   */
  static async uploadBanner(
    id: string,
    file: File
  ): Promise<{ banner: string }> {
    const formData = new FormData();
    formData.append('banner', file);

    const response = await api.post(`/vendors/${id}/banner`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Upload vendor document
   */
  static async uploadDocument(
    id: string,
    file: File,
    type: string
  ): Promise<{ document: any }> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);

    const response = await api.post(`/vendors/${id}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
