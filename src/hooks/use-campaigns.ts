import { useToast } from '@/hooks/use-toast';
import { AdminCampaignsService } from '@/services/admin-campaigns.service';
import type {
  AdminCampaign,
  AdminCampaignStats,
  CampaignListQuery,
  CampaignType,
} from '@/types/admin-campaigns';
import { useEffect, useState } from 'react';

/**
 * Custom hook for managing campaigns state and operations
 * Centralizes all campaigns-related logic and API calls
 */
export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<AdminCampaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<AdminCampaign[]>(
    []
  );
  const [filters, setFilters] = useState<CampaignListQuery>({});
  const [deletingCampaign, setDeletingCampaign] = useState<
    AdminCampaign | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError, showLoading, dismiss } = useToast();

  /**
   * Load campaigns from API with current filters
   */
  const loadCampaigns = async () => {
    try {
      setIsLoading(true);
      const response = await AdminCampaignsService.getCampaigns({
        page: 1,
        limit: 100,
        search: filters.search,
        type: filters.type,
        isActive: filters.isActive,
      });

      setCampaigns(response.data);
      setFilteredCampaigns(response.data);
    } catch (error) {
      console.error('Failed to load campaigns:', error);
      showError({
        message: 'Failed to load campaigns',
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
    let filtered = [...campaigns];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        campaign =>
          campaign.name.toLowerCase().includes(searchLower) ||
          campaign.description.toLowerCase().includes(searchLower)
      );
    }

    // Type filter - handle string values from FilterBar
    if (filters.type && typeof filters.type === 'string') {
      const typeString = filters.type as string;
      if (typeString !== 'all' && typeString !== '') {
        const validTypes: CampaignType[] = ['platform', 'seller'];
        if (validTypes.includes(typeString as CampaignType)) {
          filtered = filtered.filter(campaign => campaign.type === typeString);
        }
      }
    }

    // Active status filter
    if (filters.isActive !== undefined) {
      filtered = filtered.filter(
        campaign => campaign.isActive === filters.isActive
      );
    }

    // Date filters
    if (filters.startDate) {
      filtered = filtered.filter(
        campaign => new Date(campaign.startDate) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        campaign => new Date(campaign.endDate) <= new Date(filters.endDate!)
      );
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, filters]);

  /**
   * Load campaigns on mount
   */
  useEffect(() => {
    void loadCampaigns();
  }, []);

  /**
   * Handle campaign deletion
   */
  const deleteCampaign = async () => {
    if (!deletingCampaign) return;

    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Deleting campaign...',
        description: 'Please wait while we delete the campaign',
      });

      await AdminCampaignsService.deleteCampaign(deletingCampaign._id);
      setCampaigns(prev =>
        prev.filter(campaign => campaign._id !== deletingCampaign._id)
      );
      setDeletingCampaign(undefined);

      showSuccess({
        message: 'Campaign deleted successfully!',
        description: `"${deletingCampaign.name}" has been removed.`,
      });
    } catch (error) {
      console.error('Failed to delete campaign:', error);
      showError({
        message: 'Failed to delete campaign',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Handle campaign status toggle (active/inactive)
   */
  const toggleCampaignStatus = async (campaign: AdminCampaign) => {
    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Updating status...',
        description: 'Please wait while we update the campaign status',
      });

      const updatedCampaign = await AdminCampaignsService.toggleCampaignStatus(
        campaign._id
      );

      setCampaigns(prev =>
        prev.map(c => (c._id === campaign._id ? updatedCampaign : c))
      );

      showSuccess({
        message: 'Status updated successfully!',
        description: `"${updatedCampaign.name}" is now ${updatedCampaign.isActive ? 'active' : 'inactive'}.`,
      });
    } catch (error) {
      console.error('Failed to toggle campaign status:', error);
      showError({
        message: 'Failed to update status',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Get campaign statistics
   */
  const getCampaignStats = (): AdminCampaignStats => {
    const total = campaigns.length;
    const active = campaigns.filter(c => c.isActive).length;
    const inactive = total - active;
    const platform = campaigns.filter(c => c.type === 'platform').length;
    const seller = campaigns.filter(c => c.type === 'seller').length;
    const expiringSoon = campaigns.filter(c => {
      const endDate = new Date(c.endDate);
      const threeDaysFromNow = new Date();
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
      return endDate <= threeDaysFromNow && c.isActive;
    }).length;

    return {
      total,
      active,
      inactive,
      platform,
      seller,
      expiringSoon,
      totalRevenue: 0, // Would come from API
      averageDiscount:
        campaigns.length > 0
          ? campaigns.reduce((sum, c) => sum + c.discountValue, 0) /
            campaigns.length
          : 0,
    };
  };

  return {
    // State
    campaigns: filteredCampaigns,
    filters,
    deletingCampaign,
    isLoading,
    stats: getCampaignStats(),

    // Setters
    setFilters,
    setDeletingCampaign,

    // Actions
    deleteCampaign,
    toggleCampaignStatus,
    loadCampaigns,
  };
}
