'use client';

import { Edit, Trash2, MoreVertical, Eye, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Vendor } from '@/types/vendors';

interface VendorCardProps {
  vendor: Vendor;
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendor: Vendor) => void;
}

export function VendorCard({ vendor, onEdit, onDelete }: VendorCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/vendors/${vendor.id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    suspended: 'bg-red-100 text-red-800',
  };

  const typeColors = {
    individual: 'bg-blue-100 text-blue-800',
    business: 'bg-purple-100 text-purple-800',
    corporate: 'bg-orange-100 text-orange-800',
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{vendor.businessName}</h3>
              <p className="text-sm text-muted-foreground">
                {vendor.contactPerson}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewDetails}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(vendor)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Vendor
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(vendor)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Vendor
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status and Type */}
          <div className="flex items-center gap-2">
            <Badge
              className={
                statusColors[vendor.status as keyof typeof statusColors]
              }
            >
              {vendor.status}
            </Badge>
            <Badge
              className={typeColors[vendor.type as keyof typeof typeColors]}
            >
              {vendor.type}
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Email:</span>
              <span>{vendor.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Phone:</span>
              <span>{vendor.phone}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {vendor.totalProducts}
              </div>
              <div className="text-xs text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {formatCurrency(vendor.totalSales)}
              </div>
              <div className="text-xs text-muted-foreground">Total Sales</div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{vendor.rating}</span>
              <span className="text-xs text-muted-foreground">★</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {vendor.reviewCount} reviews
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
