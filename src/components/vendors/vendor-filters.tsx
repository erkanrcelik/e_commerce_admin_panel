'use client';

import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Building,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import type { VendorFilters, VendorStatus, VendorType } from '@/types/vendors';

interface VendorFiltersProps {
  filters: VendorFilters;
  onFiltersChange: (filters: VendorFilters) => void;
}

export function VendorFilters({
  filters,
  onFiltersChange,
}: VendorFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({
      ...filters,
      status: (value as VendorStatus) || undefined,
    });
  };

  const handleTypeChange = (value: string) => {
    onFiltersChange({ ...filters, type: (value as VendorType) || undefined });
  };

  const handleSortByChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortBy: value as VendorFilters['sortBy'],
    });
  };

  const handleSortOrderChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortOrder: value as VendorFilters['sortOrder'],
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status) count++;
    if (filters.type) count++;
    if (filters.sortBy) count++;
    return count;
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search vendors..."
          value={filters.search || ''}
          onChange={e => handleSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {/* Sort Order Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const newOrder = filters.sortOrder === 'asc' ? 'desc' : 'asc';
            handleSortOrderChange(newOrder);
          }}
        >
          {filters.sortOrder === 'desc' ? (
            <SortDesc className="h-4 w-4" />
          ) : (
            <SortAsc className="h-4 w-4" />
          )}
        </Button>

        {/* Advanced Filters */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                  {getActiveFiltersCount()}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Vendors</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={filters.status || 'all'}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={filters.type || 'all'}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
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
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={filters.sortBy || 'createdAt'}
                  onValueChange={handleSortByChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="businessName">Business Name</SelectItem>
                    <SelectItem value="createdAt">Date Created</SelectItem>
                    <SelectItem value="totalSales">Total Sales</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="totalProducts">
                      Total Products
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
