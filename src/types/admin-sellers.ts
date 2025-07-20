// Admin Sellers Types
export interface Seller {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  sellerProfile: {
    storeName: string;
    storeDescription?: string;
    isApproved: boolean;
    contactEmail?: string;
    contactPhone?: string;
    website?: string;
  };
}

export interface SellerDetail extends Seller {
  phoneNumber?: string;
  sellerProfile: {
    storeName: string;
    storeDescription?: string;
    isApproved: boolean;
    logo?: string;
    banner?: string;
    businessCategories: string[];
    contactEmail?: string;
    contactPhone?: string;
    website?: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
  statistics: {
    totalProducts: number;
    totalSales: number;
    totalOrders: number;
  };
}

export interface ApproveSellerResponse {
  _id: string;
  email: string;
  isApproved: boolean;
  updatedAt: string;
}

export interface RejectSellerResponse {
  _id: string;
  email: string;
  isApproved: boolean;
  updatedAt: string;
}

export interface UpdateSellerRequest {
  isApproved?: boolean;
  storeName?: string; // 2-100 karakter
  storeDescription?: string;
  contactEmail?: string; // email formatı
  contactPhone?: string;
  website?: string; // URL
}

export interface UpdateSellerResponse {
  _id: string;
  email: string;
  sellerProfile: {
    storeName: string;
    storeDescription?: string;
    isApproved: boolean;
    contactEmail?: string;
    contactPhone?: string;
    website?: string;
  };
  updatedAt: string;
}

export interface SellerStatistics {
  totalProducts: number;
  totalSales: number;
  totalOrders: number;
  averageRating: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
  }>;
  topProducts: Array<{
    _id: string;
    name: string;
    sales: number;
  }>;
}

export type SellersResponse = import('./admin-dashboard').PaginatedResponse<Seller>; 