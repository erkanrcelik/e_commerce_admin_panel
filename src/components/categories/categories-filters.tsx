'use client';

import { FilterBar } from '@/components/layout/filter-bar';
import type { CategoryListQuery } from '@/types/admin-categories';

interface CategoriesFiltersProps {
  filters: CategoryListQuery;
  onFiltersChange: (filters: CategoryListQuery) => void;
}

/**
 * Filters component for categories page
 * Handles search and status filtering for categories
 */
export function CategoriesFilters({ 
  filters, 
  onFiltersChange 
}: CategoriesFiltersProps) {
  /**
   * Filter field configurations for categories
   */
  const filterFields = [
    {
      key: 'search',
      label: 'Search',
      type: 'search' as const,
      placeholder: 'Search categories...',
    },
    {
      key: 'isActive',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'active', label: 'Active Only' },
        { value: 'inactive', label: 'Inactive Only' },
      ],
    },
  ];

  return (
    <FilterBar
      filters={filters}
      onFiltersChange={onFiltersChange}
      fields={filterFields}
      searchPlaceholder="Search categories..."
    />
  );
} 