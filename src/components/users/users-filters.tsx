'use client';

import { Filter, RotateCcw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { CustomerListQuery } from '@/types/admin-customers';

interface UsersFiltersProps {
  filters: CustomerListQuery;
  onFiltersChange: (filters: CustomerListQuery) => void;
  onReset: () => void;
}

export function UsersFilters({
  filters,
  onFiltersChange,
  onReset,
}: UsersFiltersProps) {
  const handleFilterChange = (
    key: keyof CustomerListQuery,
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

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) =>
      value !== undefined &&
      value !== '' &&
      value !== 'all' &&
      key !== 'page' &&
      key !== 'limit'
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4" />
          <h3 className="font-semibold">Filter Customers</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="ml-auto text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label htmlFor="search">Search Customers</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or email..."
                value={filters.search || ''}
                onChange={handleSearchChange}
                className="pl-8"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="space-y-2">
            <Label htmlFor="isActive">Status</Label>
            <Select
              value={
                filters.isActive !== undefined
                  ? filters.isActive.toString()
                  : 'all'
              }
              onValueChange={value =>
                handleFilterChange(
                  'isActive',
                  value === 'all' ? undefined : value === 'true'
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All customers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                <SelectItem value="true">Active Only</SelectItem>
                <SelectItem value="false">Inactive Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Active filters:</span>{' '}
              {Object.entries(filters)
                .filter(
                  ([, value]) =>
                    value !== undefined && value !== '' && value !== 'all'
                )
                .map(([key, value]) => {
                  if (key === 'search') return `Search: "${value as string}"`;
                  if (key === 'isActive')
                    return `Status: ${value ? 'Active' : 'Inactive'}`;
                  return `${key}: ${value as string}`;
                })
                .join(', ')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
