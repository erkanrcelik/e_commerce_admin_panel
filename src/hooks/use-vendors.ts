import { useToast } from '@/hooks/use-toast';
import { AdminSellersService } from '@/services/admin-sellers.service';
import type { AdminSeller } from '@/types/admin-sellers';
import type {
  AdminVendor,
  VendorListQuery,
  VendorStats,
} from '@/types/admin-vendors';
import { useEffect, useState } from 'react';

/**
 * Custom hook for managing vendors state and operations
 * Uses AdminSellersService as base for vendor management
 * Centralizes all vendors-related logic and API calls
 */
export function useVendors() {
  const [vendors, setVendors] = useState<AdminVendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<AdminVendor[]>([]);
  const [filters, setFilters] = useState<VendorListQuery>({});
  const [deletingVendor, setDeletingVendor] = useState<
    AdminVendor | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError, showLoading, dismiss } = useToast();

  /**
   * Transform AdminSeller to AdminVendor format
   */
  const transformSellerToVendor = (seller: AdminSeller): AdminVendor => {
    return {
      _id: seller._id,
      firstName: seller.firstName,
      lastName: seller.lastName,
      email: seller.email,
      phoneNumber: seller.phoneNumber,
      companyName:
        seller.profile?.companyName || `${seller.firstName} ${seller.lastName}`,
      role: seller.role,
      isActive: seller.isActive,
      isApproved: seller.profile?.isApproved || false,
      isEmailVerified: seller.isEmailVerified,
      profile: {
        _id: seller.profile?._id || seller._id,
        storeName:
          seller.profile?.companyName ||
          `${seller.firstName} ${seller.lastName}`,
        description: seller.profile?.description || '',
        storeDescription: seller.profile?.description || '',
        isApproved: seller.profile?.isApproved || false,
        logo: seller.profile?.logo,
        banner: seller.profile?.banner,
        businessCategories: seller.profile?.businessCategories || [],
        categories: seller.profile?.businessCategories || [],
        contactEmail: seller.profile?.contactEmail || seller.email,
        contactPhone: seller.profile?.contactPhone || seller.phoneNumber,
        website: seller.profile?.website,
        socialMedia: seller.profile?.socialMedia,
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        businessType: 'business' as const,
        rating: 0,
        reviewCount: 0,
        productCount: 0,
        createdAt: seller.profile?.createdAt || seller.createdAt,
        updatedAt: seller.profile?.updatedAt || seller.updatedAt,
      },
      totalSales: 0, // Would come from API
      totalProducts: 0, // Would come from API
      createdAt: seller.createdAt,
      updatedAt: seller.updatedAt,
    };
  };

  /**
   * Load vendors from API with current filters
   */
  const loadVendors = async () => {
    try {
      setIsLoading(true);
      const response = await AdminSellersService.getSellers({
        page: 1,
        limit: 100,
        search: filters.search,
        isActive: filters.isActive,
        isApproved: filters.isApproved,
      });

      // Transform sellers to vendors format
      const transformedVendors = response.data.map(transformSellerToVendor);
      setVendors(transformedVendors);
      setFilteredVendors(transformedVendors);
    } catch {
      showError({
        message: 'Failed to load vendors',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Apply client-side filtering
   */
  useEffect(() => {
    let filtered = [...vendors];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        vendor =>
          vendor.firstName.toLowerCase().includes(searchLower) ||
          vendor.lastName.toLowerCase().includes(searchLower) ||
          vendor.email.toLowerCase().includes(searchLower) ||
          (vendor.profile &&
            vendor.profile.storeName.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filters.isActive !== undefined) {
      filtered = filtered.filter(
        vendor => vendor.isActive === filters.isActive
      );
    }

    // Approval filter
    if (filters.isApproved !== undefined) {
      filtered = filtered.filter(
        vendor => vendor.isApproved === filters.isApproved
      );
    }

    setFilteredVendors(filtered);
  }, [vendors, filters]);

  /**
   * Load vendors on mount
   */
  useEffect(() => {
    void loadVendors();
  }, []);

  /**
   * Handle vendor deletion
   */
  const deleteVendor = async () => {
    if (!deletingVendor) return;

    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Deleting vendor...',
        description: 'Please wait while we delete the vendor',
      });

      await AdminSellersService.deleteSeller(deletingVendor._id);
      setVendors(prev =>
        prev.filter(vendor => vendor._id !== deletingVendor._id)
      );
      setDeletingVendor(undefined);

      showSuccess({
        message: 'Vendor deleted successfully!',
        description: `"${deletingVendor.firstName} ${deletingVendor.lastName}" has been removed.`,
      });
    } catch {
      showError({
        message: 'Failed to delete vendor',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Handle vendor status toggle (active/inactive)
   */
  const toggleVendorStatus = async (vendor: AdminVendor) => {
    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Updating status...',
        description: 'Please wait while we update the vendor status',
      });

      const updatedSeller = await AdminSellersService.toggleSellerStatus(
        vendor._id
      );
      const updatedVendor = transformSellerToVendor(updatedSeller);

      setVendors(prev =>
        prev.map(v => (v._id === vendor._id ? updatedVendor : v))
      );

      showSuccess({
        message: 'Status updated successfully!',
        description: `"${updatedVendor.firstName} ${updatedVendor.lastName}" is now ${updatedVendor.isActive ? 'active' : 'inactive'}.`,
      });
    } catch {
      showError({
        message: 'Failed to update status',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Get vendor statistics
   */
  const getVendorStats = (): VendorStats => {
    const total = vendors.length;
    const active = vendors.filter(v => v.isActive).length;
    const inactive = total - active;
    const approved = vendors.filter(v => v.isApproved).length;
    const pending = vendors.filter(v => !v.isApproved).length;
    const rejected = 0; // API doesn't provide rejected count yet

    return {
      total,
      active,
      inactive,
      approved,
      pending,
      rejected,
      totalRevenue: 0, // Would come from API
      averageRating: 0, // Would come from API
    };
  };

  return {
    // State
    vendors: filteredVendors,
    filters,
    deletingVendor,
    isLoading,
    stats: getVendorStats(),

    // Setters
    setFilters,
    setDeletingVendor,

    // Actions
    deleteVendor,
    toggleVendorStatus,
    loadVendors,
  };
}
