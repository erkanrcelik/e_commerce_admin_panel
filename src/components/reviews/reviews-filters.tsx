import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ReviewListQuery } from '@/types';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

interface ReviewsFiltersProps {
  filters: ReviewListQuery;
  onFiltersChange: (filters: ReviewListQuery) => void;
  loading?: boolean;
}

export function ReviewsFilters({ filters, onFiltersChange, loading }: ReviewsFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (key: keyof ReviewListQuery, value: string | number | boolean | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1, // Reset to first page when filters change
    });
  };

  const handleSearch = () => {
    onFiltersChange({
      ...filters,
      search: searchTerm,
      page: 1,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      page: 1,
      limit: 10,
      // isApproved gönderilmezse onay bekleyen review'lar gelir
    });
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Yorum içeriğinde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
              disabled={loading}
            />
          </div>
        </div>

        {/* Approval Status Filter */}
        <div className="w-full md:w-48">
          <Select
            value={filters.isApproved === undefined ? 'pending' : filters.isApproved ? 'approved' : 'all'}
            onValueChange={(value) => {
              let isApproved: boolean | undefined;
              if (value === 'pending') {
                isApproved = undefined; // Onay bekleyen için hiç gönderme
              } else if (value === 'approved') {
                isApproved = true; // Onaylanmış için true gönder
              } else {
                isApproved = false; // Tümü için false gönder
              }
              handleFilterChange('isApproved', isApproved);
            }}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Onay Durumu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Onay Bekleyen</SelectItem>
              <SelectItem value="approved">Onaylanan</SelectItem>
              <SelectItem value="all">Tümü</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div className="w-full md:w-48">
          <Select
            value={filters.rating?.toString() || 'all'}
            onValueChange={(value) => {
              const rating = value === 'all' ? undefined : parseInt(value);
              handleFilterChange('rating', rating);
            }}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Puan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Puanlar</SelectItem>
              <SelectItem value="5">5 Yıldız</SelectItem>
              <SelectItem value="4">4 Yıldız</SelectItem>
              <SelectItem value="3">3 Yıldız</SelectItem>
              <SelectItem value="2">2 Yıldız</SelectItem>
              <SelectItem value="1">1 Yıldız</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="h-4 w-4 mr-2" />
            Ara
          </Button>
          <Button variant="outline" onClick={clearFilters} disabled={loading}>
            <Filter className="h-4 w-4 mr-2" />
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
} 