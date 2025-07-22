'use client';

import { FilterBar } from '@/components/layout/filter-bar';
import type { VendorListQuery } from '@/types/admin-vendors';

interface VendorsFiltersProps {
  filters: VendorListQuery;
  onFiltersChange: (filters: VendorListQuery) => void;
}

/**
 * Filters component for vendors page
 * Handles search, status, and approval filtering for vendors
 */
export function VendorsFilters({ 
  filters, 
  onFiltersChange,
}: VendorsFiltersProps) {
  /**
   * Filter field configurations for vendors
   */
  const filterFields = [
    {
      key: 'search',
      label: 'Search',
      type: 'search' as const,
      placeholder: 'Search vendors...',
    },
    {
      key: 'isActive',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Vendors' },
        { value: 'active', label: 'Active Only' },
        { value: 'inactive', label: 'Inactive Only' },
      ],
    },
    {
      key: 'isApproved',
      label: 'Approval',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Approval Status' },
        { value: 'approved', label: 'Approved Only' },
        { value: 'pending', label: 'Pending Approval' },
      ],
    },
  ];

  return (
    <FilterBar
      filters={filters}
      onFiltersChange={onFiltersChange}
      fields={filterFields}
      searchPlaceholder="Search vendors..."
    />
  );
} 