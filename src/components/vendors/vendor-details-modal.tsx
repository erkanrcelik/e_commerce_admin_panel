'use client';

import { Mail, Phone, MapPin, Calendar, Building, Star } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import type { VendorDetails } from '@/types/vendors';

interface VendorDetailsModalProps {
  vendor: VendorDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VendorDetailsModal({
  vendor,
  isOpen,
  onClose,
}: VendorDetailsModalProps) {
  if (!vendor) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vendor Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {vendor.businessName}
                  </h3>
                  <p className="text-muted-foreground">
                    {vendor.contactPerson}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      className={
                        typeColors[vendor.type as keyof typeof typeColors]
                      }
                    >
                      {vendor.type}
                    </Badge>
                    <Badge
                      className={
                        statusColors[vendor.status as keyof typeof statusColors]
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{vendor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span>{vendor.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Member since:</span>
                    <span>{formatDate(vendor.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last updated:</span>
                    <span>{formatDate(vendor.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          {vendor.address && (
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm">{vendor.address.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {vendor.address.city}, {vendor.address.state}{' '}
                      {vendor.address.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {vendor.address.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {vendor.totalProducts}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatCurrency(vendor.totalSales)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Sales
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatCurrency(vendor.totalCommission)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Commission
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-2xl font-bold">{vendor.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {vendor.reviewCount} reviews
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Commission Information */}
          <Card>
            <CardHeader>
              <CardTitle>Commission Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Commission Rate:</span>
                  <span className="text-sm">{vendor.commissionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Commission Type:</span>
                  <span className="text-sm capitalize">
                    {vendor.commissionType}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Commission:</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(vendor.totalCommission)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
