'use client';

import { FilterBar } from '@/components/layout/filter-bar';
import type { CampaignListQuery } from '@/types/admin-campaigns';

interface CampaignsFiltersProps {
  filters: CampaignListQuery;
  onFiltersChange: (filters: CampaignListQuery) => void;
}

/**
 * Filters component for campaigns page
 * Handles search, status, and type filtering for campaigns
 */
export function CampaignsFilters({
  filters,
  onFiltersChange,
}: CampaignsFiltersProps) {
  /**
   * Filter field configurations for campaigns
   */
  const filterFields = [
    {
      key: 'search',
      label: 'Search',
      type: 'search' as const,
      placeholder: 'Search campaigns...',
    },
    {
      key: 'isActive',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Campaigns' },
        { value: 'active', label: 'Active Only' },
        { value: 'inactive', label: 'Inactive Only' },
      ],
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Types' },
        { value: 'platform', label: 'Platform Campaigns' },
        { value: 'seller', label: 'Seller Campaigns' },
      ],
    },
  ];

  return (
    <FilterBar
      filters={filters}
      onFiltersChange={onFiltersChange}
      fields={filterFields}
      searchPlaceholder="Search campaigns..."
    />
  );
}
