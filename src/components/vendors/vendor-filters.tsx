'use client';

import { Building, Search, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { VendorFilters } from '@/types/admin-vendors';

interface VendorFiltersProps {
  filters: VendorFilters;
  onFiltersChange: (filters: VendorFilters) => void;
}

export function VendorFilters({
  filters,
  onFiltersChange,
}: VendorFiltersProps) {
  const handleFilterChange = (
    key: keyof VendorFilters,
    value: string | boolean | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' || value === '' ? undefined : value,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('search', e.target.value);
  };

  const handleStatusChange = (value: string) => {
    if (value === 'all') {
      handleFilterChange('status', undefined);
    } else {
      handleFilterChange('status', value);
    }
  };

  const handleTypeChange = (value: string) => {
    if (value === 'all') {
      handleFilterChange('type', undefined);
    } else {
      handleFilterChange('type', value);
    }
  };

  const handleSortByChange = (value: string) => {
    handleFilterChange('sortBy', value);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) =>
      value !== undefined &&
      value !== '' &&
      value !== 'all' &&
      key !== 'page' &&
      key !== 'limit'
  );

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vendors..."
              value={filters.search || ''}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filters.status || 'all'}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.type || 'all'}
            onValueChange={handleTypeChange}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="individual">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Individual
                </div>
              </SelectItem>
              <SelectItem value="company">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy || 'createdAt'}
            onValueChange={handleSortByChange}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="businessName">Business Name</SelectItem>
              <SelectItem value="createdAt">Date Created</SelectItem>
              <SelectItem value="totalSales">Total Sales</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="totalProducts">Total Products</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
