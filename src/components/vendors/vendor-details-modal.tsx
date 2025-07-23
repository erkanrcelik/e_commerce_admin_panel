'use client';

import {
  Building,
  Calendar,
  Check,
  Mail,
  MapPin,
  Phone,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import type { AdminVendor } from '@/types/admin-vendors';

interface VendorDetailsModalProps {
  vendor: AdminVendor | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (vendor: AdminVendor) => void;
  onApprove?: (vendor: AdminVendor) => void;
  onReject?: (vendor: AdminVendor) => void;
}

/**
 * Vendor details modal component for displaying comprehensive vendor information
 * Shows vendor profile, store details, and provides action buttons for management
 */
export function VendorDetailsModal({
  vendor,
  isOpen,
  onClose,
  onEdit,
  onApprove,
  onReject,
}: VendorDetailsModalProps) {
  if (!vendor) return null;

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * Get status badge variant
   */
  const getStatusVariant = (isActive: boolean) => {
    return isActive ? 'default' : 'secondary';
  };

  /**
   * Get approval badge variant
   */
  const getApprovalVariant = (isApproved: boolean) => {
    return isApproved ? 'default' : 'destructive';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building className="h-6 w-6" />
            Vendor Details: {vendor.companyName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {vendor.profile?.logo ? (
                <Image
                  src={vendor.profile.logo}
                  alt={vendor.companyName}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Building className="w-10 h-10 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold mb-2">{vendor.companyName}</h2>
              <p className="text-lg text-muted-foreground mb-2">
                {vendor.firstName} {vendor.lastName}
              </p>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant={getStatusVariant(vendor.isActive)}>
                  {vendor.isActive ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant={getApprovalVariant(vendor.isApproved)}>
                  {vendor.isApproved ? 'Approved' : 'Pending Approval'}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(vendor.createdAt)}</span>
                </div>
                {vendor.approvedAt && (
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4" />
                    <span>Approved {formatDate(vendor.approvedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.email}</span>
                </div>
                {vendor.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{vendor.phoneNumber}</span>
                  </div>
                )}
              </div>

              {vendor.profile?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div>{vendor.profile.address}</div>
                    <div className="text-sm text-muted-foreground">
                      {vendor.profile.city}, {vendor.profile.state}{' '}
                      {vendor.profile.postalCode}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {vendor.profile.country}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Store Profile */}
          {vendor.profile && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">Store Profile</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Store Name</h4>
                    <p className="text-muted-foreground">
                      {vendor.profile.storeName}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-muted-foreground">
                      {vendor.profile.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Business Type</h4>
                      <Badge variant="outline" className="capitalize">
                        {vendor.profile.businessType}
                      </Badge>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Rating</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {vendor.profile.rating
                            ? vendor.profile.rating.toFixed(1)
                            : 'N/A'}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({vendor.profile.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-1">Products</h4>
                      <span className="font-medium">
                        {vendor.profile.productCount || 0}
                      </span>
                    </div>
                  </div>

                  {vendor.profile.categories &&
                    vendor.profile.categories.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {vendor.profile.categories.map((category, index) => (
                            <Badge key={index} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </>
          )}

          {/* Business Statistics */}
          <Separator />
          <div>
            <h3 className="text-lg font-semibold mb-3">Business Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{vendor.totalProducts}</div>
                <div className="text-sm text-muted-foreground">
                  Total Products
                </div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">
                  ${vendor.totalSales.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Sales</div>
              </div>
            </div>
          </div>

          {/* Rejection Reason */}
          {vendor.rejectionReason && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3 text-destructive">
                  Rejection Reason
                </h3>
                <p className="text-muted-foreground bg-destructive/10 p-3 rounded-lg">
                  {vendor.rejectionReason}
                </p>
                {vendor.rejectedAt && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Rejected on {formatDate(vendor.rejectedAt)}
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            {!vendor.isApproved && onApprove && (
              <Button onClick={() => onApprove(vendor)} variant="default">
                <Check className="mr-2 h-4 w-4" />
                Approve Vendor
              </Button>
            )}
            {!vendor.isApproved && onReject && (
              <Button onClick={() => onReject(vendor)} variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Reject Vendor
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onEdit(vendor)} variant="outline">
              Edit Vendor
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
