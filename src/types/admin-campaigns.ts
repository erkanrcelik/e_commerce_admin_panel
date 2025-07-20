// Admin Campaigns Types
export interface Campaign {
  _id: string;
  name: string;
  description?: string;
  discountPercentage: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  targetCategories?: string[];
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
  productCount: number;
  createdAt: string;
}

export interface CampaignDetail extends Campaign {
  products: Array<{
    _id: string;
    name: string;
    price: number;
    category: string;
  }>;
}

export interface CreateCampaignRequest {
  name: string; // 2-100 karakter
  description?: string;
  discountPercentage: number; // 0-100
  startDate: string; // ISO datetime
  endDate: string; // ISO datetime
  isActive?: boolean; // default: true
  targetCategories?: string[];
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
}

export interface UpdateCampaignRequest {
  name?: string; // 2-100 karakter
  description?: string;
  discountPercentage?: number; // 0-100
  startDate?: string; // ISO datetime
  endDate?: string; // ISO datetime
  isActive?: boolean;
  targetCategories?: string[];
  minimumOrderAmount?: number;
  maximumDiscountAmount?: number;
}

export interface ToggleCampaignStatusResponse {
  _id: string;
  name: string;
  isActive: boolean;
  updatedAt: string;
}

export interface AddProductsRequest {
  productIds: string[];
}

export interface AddProductsResponse {
  _id: string;
  name: string;
  productCount: number;
  updatedAt: string;
}

export interface CampaignProductsResponse {
  campaign: {
    _id: string;
    name: string;
  };
  products: Array<{
    _id: string;
    name: string;
    price: number;
    category: string;
    seller: string;
  }>;
  total: number;
}

export type CampaignsResponse = import('./admin-dashboard').PaginatedResponse<Campaign>; 