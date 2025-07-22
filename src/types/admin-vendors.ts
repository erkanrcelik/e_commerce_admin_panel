/**
 * Admin vendor management type definitions
 * Maps to seller management API for vendor/seller operations
 */

/**
 * Vendor status types
 */
export type VendorStatus = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected';

/**
 * Vendor business types
 */
export type VendorType = 'individual' | 'business' | 'corporate';

/**
 * Vendor filter types
 */
export interface VendorFilters {
  search?: string;
  status?: VendorStatus;
  type?: VendorType;
  sortBy?: 'name' | 'email' | 'createdAt' | 'totalSales' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Vendor social media accounts
 */
export interface VendorSocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

/**
 * Vendor store profile information
 */
export interface VendorProfile {
  _id: string;
  storeName: string;
  description: string;
  storeDescription: string;
  logo?: string;
  banner?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  businessType: 'individual' | 'business' | 'corporate';
  taxNumber?: string;
  socialMedia?: VendorSocialMedia;
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
 * Admin vendor entity interface
 */
export interface AdminVendor {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  companyName: string;
  businessName?: string;
  contactPerson?: string;
  isActive: boolean;
  isApproved: boolean;
  isEmailVerified: boolean;
  role: string;
  status?: string;
  type?: string;
  rating?: number;
  reviewCount?: number;
  profile: VendorProfile;
  totalSales: number;
  totalProducts: number;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

/**
 * Vendor list query parameters
 */
export interface VendorListQuery {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  isApproved?: boolean;
  businessType?: string;
  city?: string;
  state?: string;
  sortBy?: string;
  sortOrder?: string;
  status?: string;
  type?: string;
  // Index signature for compatibility with FilterBar component
  [key: string]: string | number | boolean | undefined;
}

/**
 * Vendor list API response
 */
export interface VendorListResponse {
  data: AdminVendor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Vendor statistics
 */
export interface VendorStats {
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
 * API response wrapper for vendor operations
 */
export interface VendorApiResponse {
  message: string;
} 