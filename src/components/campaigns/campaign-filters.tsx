'use client';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { CampaignFilters as CampaignFiltersType } from '@/types/campaigns';

interface CampaignFiltersProps {
  filters: CampaignFiltersType;
  onFiltersChange: (filters: CampaignFiltersType) => void;
}

export function CampaignFilters({
  filters,
  onFiltersChange,
}: CampaignFiltersProps) {
  const handleFilterChange = (
    key: keyof CampaignFiltersType,
    value: string
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== ''
  );

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={filters.search || ''}
              onChange={e => handleFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={filters.status || ''}
            onValueChange={value => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.type || ''}
            onValueChange={value => handleFilterChange('type', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="flash_sale">Flash Sale</SelectItem>
              <SelectItem value="free_shipping">Free Shipping</SelectItem>
              <SelectItem value="buy_one_get_one">Buy One Get One</SelectItem>
              <SelectItem value="seasonal">Seasonal</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.scope || ''}
            onValueChange={value => handleFilterChange('scope', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Scopes</SelectItem>
              <SelectItem value="all_products">All Products</SelectItem>
              <SelectItem value="category">Category</SelectItem>
              <SelectItem value="specific_products">
                Specific Products
              </SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy || ''}
            onValueChange={value => handleFilterChange('sortBy', value)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Default</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="createdAt">Created Date</SelectItem>
              <SelectItem value="startDate">Start Date</SelectItem>
              <SelectItem value="endDate">End Date</SelectItem>
              <SelectItem value="totalRevenue">Revenue</SelectItem>
              <SelectItem value="totalOrders">Orders</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.sortOrder || 'desc'}
            onValueChange={value => handleFilterChange('sortOrder', value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Desc</SelectItem>
              <SelectItem value="asc">Asc</SelectItem>
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
