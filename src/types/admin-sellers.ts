/**
 * Admin seller management type definitions
 */

/**
 * Seller social media accounts
 */
export interface SellerSocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

/**
 * Seller profile information
 */
export interface SellerProfile {
  _id: string;
  companyName: string;
  description: string;
  logo?: string;
  banner?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  businessType: 'individual' | 'business' | 'corporate';
  taxNumber?: string;
  socialMedia?: SellerSocialMedia;
  rating: number;
  reviewCount: number;
  productCount: number;
  categories: string[];
  businessCategories: string[];
  isApproved: boolean;
  contactEmail: string;
  contactPhone?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Seller entity interface
 */
export interface AdminSeller {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  companyName: string;
  isActive: boolean;
  isApproved: boolean;
  isEmailVerified: boolean;
  role: string;
  profile: SellerProfile;
  totalSales: number;
  totalProducts: number;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

/**
 * Seller list query parameters
 */
export interface SellerListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isApproved?: boolean;
  businessType?: string;
  city?: string;
  state?: string;
  // Index signature for compatibility with FilterBar component
  [key: string]: string | number | boolean | undefined;
}

/**
 * Seller list API response
 */
export interface SellerListResponse {
  data: AdminSeller[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Seller statistics
 */
export interface SellerStats {
  total: number;
  active: number;
  inactive: number;
  approved: number;
  pending: number;
  rejected: number;
  totalRevenue: number;
  averageRating: number;
}

/**
 * API response wrapper for seller operations
 */
export interface SellerApiResponse {
  message: string;
}
