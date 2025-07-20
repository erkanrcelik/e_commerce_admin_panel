'use client';

import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';

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

import type { CategoryFilters } from '@/types/categories';

interface CategoryFiltersProps {
  filters: CategoryFilters;
  onFiltersChange: (filters: CategoryFilters) => void;
}

export function CategoryFilters({
  filters,
  onFiltersChange,
}: CategoryFiltersProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const handleStatusChange = (value: string) => {
    const isActive =
      value === 'active' ? true : value === 'inactive' ? false : undefined;
    onFiltersChange({ ...filters, isActive });
  };

  const handleSortByChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortBy: value as CategoryFilters['sortBy'],
    });
  };

  const handleSortOrderChange = (value: string) => {
    onFiltersChange({
      ...filters,
      sortOrder: value as CategoryFilters['sortOrder'],
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search categories..."
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
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Categories</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={
                    filters.isActive === true
                      ? 'active'
                      : filters.isActive === false
                        ? 'inactive'
                        : 'all'
                  }
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select
                  value={filters.sortBy || 'name'}
                  onValueChange={handleSortByChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="createdAt">Date Created</SelectItem>
                    <SelectItem value="productCount">Product Count</SelectItem>
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
