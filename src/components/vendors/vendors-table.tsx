'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AdminVendor } from '@/types/admin-vendors';
import { Eye, EyeOff, Mail, Phone, Store, Trash2, User } from 'lucide-react';
import Image from 'next/image';

interface VendorsTableProps {
  vendors: AdminVendor[];
  isLoading: boolean;
  onDelete: (vendor: AdminVendor) => void;
  onToggleStatus: (vendor: AdminVendor) => void;
  onViewDetails?: (vendor: AdminVendor) => void;
}

/**
 * Table component for displaying vendors
 * Handles loading states, empty states, and vendor rows
 */
export function VendorsTable({
  vendors,
  isLoading,
  onDelete,
  onToggleStatus,
  onViewDetails,
}: VendorsTableProps) {
  /**
   * Get status badge variant
   */
  const getStatusVariant = (isActive: boolean) => {
    return isActive ? 'default' : 'secondary';
  };

  /**
   * Get vendor logo or fallback
   */
  const getVendorLogo = (vendor: AdminVendor) => {
    if (vendor.profile?.logo) {
      return vendor.profile.logo;
    }
    const storeName = vendor.profile?.storeName || vendor.companyName;
    // Generate logo from store name initials
    const initials = storeName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=0d47a1&color=fff&size=40`;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading vendors...</p>
      </div>
    );
  }

  /**
   * Empty state
   */
  if (vendors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <Store className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No vendors found</h3>
        <p className="text-muted-foreground">
          Get started by adding your first vendor
        </p>
      </div>
    );
  }

  /**
   * Vendors table
   */
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Store</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-40">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map(vendor => {
            return (
              <TableRow key={vendor._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={getVendorLogo(vendor)}
                        alt={vendor.profile?.storeName || vendor.companyName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-medium">
                        {vendor.firstName} {vendor.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {vendor._id.slice(-8)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">
                      {vendor.profile?.storeName || vendor.companyName}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {vendor.profile?.description ||
                        vendor.profile?.storeDescription ||
                        'No description'}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{vendor.email}</span>
                    </div>
                    {vendor.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{vendor.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(vendor.isActive)}>
                    {vendor.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(vendor.createdAt)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {onViewDetails && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewDetails(vendor)}
                        className="h-8 w-8 p-0"
                        title="View vendor details"
                      >
                        <User className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onToggleStatus(vendor)}
                      className="h-8 w-8 p-0"
                      title={
                        vendor.isActive
                          ? 'Deactivate vendor'
                          : 'Activate vendor'
                      }
                    >
                      {vendor.isActive ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(vendor)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      title="Delete vendor"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
