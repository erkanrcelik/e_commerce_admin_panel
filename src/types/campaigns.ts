export type CampaignStatus =
  | 'draft'
  | 'active'
  | 'paused'
  | 'ended'
  | 'scheduled';
export type CampaignType =
  | 'discount'
  | 'free_shipping'
  | 'buy_one_get_one'
  | 'flash_sale'
  | 'seasonal';
export type DiscountType = 'percentage' | 'fixed_amount';
export type CampaignScope =
  | 'all_products'
  | 'category'
  | 'specific_products'
  | 'vendor';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  scope: CampaignScope;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  image?: string;
  bannerColor?: string;
  isActive: boolean;
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  categoryIds?: string[];
  productIds?: string[];
  vendorIds?: string[];
  conditions?: {
    minOrderAmount?: number;
    maxOrderAmount?: number;
    customerGroups?: string[];
    excludedProducts?: string[];
    excludedCategories?: string[];
  };
}

export interface CampaignStats {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  totalDiscount: number;
  dailyStats: {
    date: string;
    orders: number;
    revenue: number;
    discount: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
}

export interface CampaignDetails extends Campaign {
  stats: CampaignStats;
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    discount: number;
    status: string;
    createdAt: string;
  }[];
}

export interface CreateCampaignData {
  name: string;
  description: string;
  type: CampaignType;
  scope: CampaignScope;
  discountType: DiscountType;
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  startDate: string;
  endDate: string;
  image?: string;
  bannerColor?: string;
  categoryIds?: string[];
  productIds?: string[];
  vendorIds?: string[];
  conditions?: {
    minOrderAmount?: number;
    maxOrderAmount?: number;
    customerGroups?: string[];
    excludedProducts?: string[];
    excludedCategories?: string[];
  };
}

export interface UpdateCampaignData {
  name?: string;
  description?: string;
  type?: CampaignType;
  status?: CampaignStatus;
  scope?: CampaignScope;
  discountType?: DiscountType;
  discountValue?: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  startDate?: string;
  endDate?: string;
  image?: string;
  bannerColor?: string;
  categoryIds?: string[];
  productIds?: string[];
  vendorIds?: string[];
  conditions?: {
    minOrderAmount?: number;
    maxOrderAmount?: number;
    customerGroups?: string[];
    excludedProducts?: string[];
    excludedCategories?: string[];
  };
}

export interface CampaignFilters {
  search?: string;
  status?: CampaignStatus;
  type?: CampaignType;
  scope?: CampaignScope;
  sortBy?:
    | 'name'
    | 'createdAt'
    | 'startDate'
    | 'endDate'
    | 'totalRevenue'
    | 'totalOrders';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CampaignListResponse {
  campaigns: Campaign[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
