/**
 * Admin campaign management type definitions
 * Handles platform and seller campaign operations
 */

/**
 * Campaign discount types
 */
export type DiscountType = 'percentage' | 'amount';

/**
 * Campaign types
 */
export type CampaignType = 'platform' | 'seller';

/**
 * Campaign status values
 */
export type CampaignStatus = 'active' | 'inactive' | 'expired' | 'scheduled';

/**
 * Campaign product reference
 */
export interface CampaignProduct {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

/**
 * Campaign category reference
 */
export interface CampaignCategory {
  _id: string;
  name: string;
  productCount: number;
}

/**
 * Admin campaign entity interface
 */
export interface AdminCampaign {
  _id: string;
  name: string;
  description: string;
  type: CampaignType;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  status: CampaignStatus;
  imageUrl?: string;
  products?: CampaignProduct[];
  categories?: CampaignCategory[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

/**
 * Create platform campaign request
 */
export interface CreatePlatformCampaignRequest {
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  productIds?: string[];
  categoryIds?: string[];
  imageUrl?: string;
}

/**
 * Update campaign request
 */
export interface UpdateCampaignRequest {
  name?: string;
  description?: string;
  discountType?: DiscountType;
  discountValue?: number;
  startDate?: string;
  endDate?: string;
  productIds?: string[];
  categoryIds?: string[];
  imageUrl?: string;
  isActive?: boolean;
}

/**
 * Campaign list query parameters
 */
export interface CampaignListQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: CampaignType;
  status?: CampaignStatus;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
  // Index signature for compatibility with FilterBar component
  [key: string]: string | number | boolean | undefined;
}

/**
 * Campaign list API response
 */
export interface CampaignListResponse {
  data: AdminCampaign[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Campaign statistics
 */
export interface AdminCampaignStats {
  total: number;
  active: number;
  inactive: number;
  platform: number;
  seller: number;
  expiringSoon: number;
  totalRevenue: number;
  averageDiscount: number;
}

/**
 * API response wrapper for campaign operations
 */
export interface CampaignApiResponse {
  message: string;
}

/**
 * Seller campaign creation request
 */
export interface CreateSellerCampaignRequest {
  name: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  productIds: string[];
  imageUrl?: string;
}
