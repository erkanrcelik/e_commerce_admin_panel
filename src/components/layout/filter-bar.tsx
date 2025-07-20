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

interface FilterOption {
  value: string;
  label: string;
}

interface FilterField {
  key: string;
  label: string;
  type: 'select' | 'search';
  options?: FilterOption[];
  placeholder?: string;
  width?: string;
}

interface FilterBarProps {
  filters: Record<string, string | boolean | number | undefined>;
  onFiltersChange: (filters: Record<string, string | boolean | number | undefined>) => void;
  fields: FilterField[];
  searchPlaceholder?: string;
  showClearButton?: boolean;
}

export function FilterBar({
  filters,
  onFiltersChange,
  fields,
  searchPlaceholder = 'Search...',
  showClearButton = true,
}: FilterBarProps) {
  const handleFilterChange = (key: string, value: string) => {
    // Handle special values for "all" and "default"
    let finalValue = value;
    if (value === 'all' || value === 'default') {
      finalValue = '';
    }
    
    onFiltersChange({
      ...filters,
      [key]: finalValue || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== ''
  );

  const searchField = fields.find(field => field.type === 'search');
  const selectFields = fields.filter(field => field.type === 'select');

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center gap-4">
        {/* Search Input */}
        {searchField && (
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchField.placeholder || searchPlaceholder}
                value={String(filters[searchField.key] || '')}
                onChange={e => handleFilterChange(searchField.key, e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Select Filters */}
        <div className="flex items-center gap-2">
          {selectFields.map(field => (
            <Select
              key={field.key}
              value={String(filters[field.key] || (field.options?.[0]?.value || ''))}
              onValueChange={value => handleFilterChange(field.key, value)}
            >
              <SelectTrigger className={field.width || 'w-32'}>
                <SelectValue placeholder={field.label} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {showClearButton && hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
} 