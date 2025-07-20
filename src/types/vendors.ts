export type VendorStatus =
  | 'pending'
  | 'approved'
  | 'active'
  | 'suspended'
  | 'rejected';
export type VendorType = 'individual' | 'company';
export type CommissionType = 'percentage' | 'fixed';

export interface Vendor {
  id: string;
  userId: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  type: VendorType;
  status: VendorStatus;
  commissionRate: number;
  commissionType: CommissionType;
  logo?: string;
  banner?: string;
  description?: string;
  website?: string;
  taxNumber?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  bankInfo?: {
    bankName: string;
    accountNumber: string;
    iban: string;
  };
  documents: {
    id: string;
    type: 'tax_certificate' | 'business_license' | 'identity_card' | 'other';
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  totalProducts: number;
  totalSales: number;
  totalCommission: number;
  rating: number;
  reviewCount: number;
}

export interface VendorApplication {
  id: string;
  userId: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  type: VendorType;
  status: VendorStatus;
  description: string;
  website?: string;
  taxNumber?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  documents: {
    id: string;
    type: 'tax_certificate' | 'business_license' | 'identity_card' | 'other';
    name: string;
    url: string;
    uploadedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface VendorStats {
  totalProducts: number;
  activeProducts: number;
  totalSales: number;
  totalOrders: number;
  totalCommission: number;
  averageRating: number;
  reviewCount: number;
  monthlySales: {
    month: string;
    sales: number;
    orders: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }[];
}

export interface VendorDetails extends Vendor {
  stats: VendorStats;
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
  recentReviews: {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}

export interface CreateVendorData {
  userId: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  type: VendorType;
  description: string;
  website?: string;
  taxNumber?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  commissionRate: number;
  commissionType: CommissionType;
}

export interface UpdateVendorData {
  businessName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  description?: string;
  website?: string;
  taxNumber?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  commissionRate?: number;
  commissionType?: CommissionType;
  status?: VendorStatus;
}

export interface VendorFilters {
  search?: string;
  status?: VendorStatus;
  type?: VendorType;
  sortBy?:
    | 'businessName'
    | 'createdAt'
    | 'totalSales'
    | 'rating'
    | 'totalProducts';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface VendorListResponse {
  vendors: Vendor[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
