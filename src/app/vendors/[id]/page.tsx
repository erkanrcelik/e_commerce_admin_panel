'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminSellersService } from '@/services/admin-sellers.service';
import type { AdminSeller } from '@/types/admin-sellers';
import {
    ArrowLeft,
    Building,
    Calendar,
    DollarSign,
    Eye,
    EyeOff,
    Globe,
    Mail,
    MapPin,
    Package,
    Phone,
    Star,
    Store,
    Trash2,
    User
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * Vendor detail page
 * Displays comprehensive vendor information and management options
 */
export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<AdminSeller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const vendorId = params.id as string;

  /**
   * Load vendor details
   */
  useEffect(() => {
    const loadVendor = async () => {
      try {
        setIsLoading(true);
        const vendorData = await AdminSellersService.getSellerById(vendorId);
        setVendor(vendorData);
      } catch (error) {
        console.error('Failed to load vendor:', error);
        toast.error('Failed to load vendor details');
        router.push('/vendors');
      } finally {
        setIsLoading(false);
      }
    };

    if (vendorId) {
      void loadVendor();
    }
  }, [vendorId, router]);

  /**
   * Handle toggle status
   */
  const handleToggleStatus = async () => {
    if (!vendor) return;

    try {
      const updatedVendor = await AdminSellersService.toggleSellerStatus(vendor._id);
      setVendor(updatedVendor);
      toast.success(`Vendor ${updatedVendor.isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Failed to toggle vendor status:', error);
      toast.error('Failed to update vendor status');
    }
  };

  /**
   * Handle delete vendor
   */
  const handleDeleteVendor = async () => {
    if (!vendor) return;

    try {
      setIsDeleting(true);
      await AdminSellersService.deleteSeller(vendor._id);
      toast.success('Vendor deleted successfully');
      router.push('/vendors');
    } catch (error) {
      console.error('Failed to delete vendor:', error);
      toast.error('Failed to delete vendor');
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Format currency
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  /**
   * Format date
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * Get vendor avatar
   */
  const getVendorAvatar = (vendor: AdminSeller) => {
    if (vendor.profile?.logo) {
      return vendor.profile.logo;
    }
    const name = `${vendor.firstName} ${vendor.lastName}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0d47a1&color=fff&size=120`;
  };

  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <PageLayout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Vendors', href: '/vendors' },
          { label: 'Loading...', isCurrent: true },
        ]}
      >
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading vendor details...</p>
        </div>
      </PageLayout>
    );
  }

  /**
   * Not found state
   */
  if (!vendor) {
    return (
      <PageLayout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Vendors', href: '/vendors' },
          { label: 'Not Found', isCurrent: true },
        ]}
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Vendor not found</h3>
          <p className="text-muted-foreground mb-4">
            The vendor you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/vendors')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vendors
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Vendors', href: '/vendors' },
        { label: `${vendor.firstName} ${vendor.lastName}`, isCurrent: true },
      ]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => router.push('/vendors')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Vendors
        </Button>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleToggleStatus}
            disabled={isDeleting}
          >
            {vendor.isActive ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Deactivate
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Activate
              </>
            )}
          </Button>
          
          <Button
            variant="destructive"
            onClick={handleDeleteVendor}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Vendor
          </Button>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Vendor Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={getVendorAvatar(vendor)}
                    alt={`${vendor.firstName} ${vendor.lastName}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">
                    {vendor.firstName} {vendor.lastName}
                  </h2>
                  <p className="text-muted-foreground mb-2">ID: {vendor._id}</p>
                  
                  <div className="flex items-center gap-4">
                    <Badge variant={vendor.isActive ? 'default' : 'secondary'}>
                      {vendor.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <Badge variant={vendor.isApproved ? 'default' : 'secondary'}>
                      {vendor.isApproved ? 'Approved' : 'Pending'}
                    </Badge>
                    {vendor.isEmailVerified && (
                      <Badge variant="outline">Email Verified</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                  <p className="font-medium">{vendor.companyName}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Business Type</label>
                  <p className="font-medium capitalize">{vendor.profile?.businessType || 'Not specified'}</p>
                </div>
                
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-sm">{vendor.profile?.description || 'No description provided'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{vendor.email}</p>
                  </div>
                </div>
                
                {vendor.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="font-medium">{vendor.phoneNumber}</p>
                    </div>
                  </div>
                )}
                
                {vendor.profile?.contactEmail && vendor.profile.contactEmail !== vendor.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Contact Email</label>
                      <p className="font-medium">{vendor.profile.contactEmail}</p>
                    </div>
                  </div>
                )}
                
                {vendor.profile?.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Contact Phone</label>
                      <p className="font-medium">{vendor.profile.contactPhone}</p>
                    </div>
                  </div>
                )}
                
                {vendor.profile?.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Website</label>
                      <p className="font-medium">{vendor.profile.website}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{vendor.profile?.address || 'No address provided'}</p>
                <p className="text-sm text-muted-foreground">
                  {vendor.profile?.city && vendor.profile?.state && vendor.profile?.postalCode 
                    ? `${vendor.profile.city}, ${vendor.profile.state} ${vendor.profile.postalCode}`
                    : 'Location not specified'
                  }
                </p>
                <p className="text-sm text-muted-foreground">{vendor.profile?.country || 'Country not specified'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Sales</span>
                <span className="font-medium">{formatCurrency(vendor.totalSales)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Products</span>
                <span className="font-medium">{vendor.totalProducts}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{vendor.profile?.rating?.toFixed(1) || '0.0'}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reviews</span>
                <span className="font-medium">{vendor.profile?.reviewCount || 0}</span>
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {vendor.profile?.categories && vendor.profile.categories.length > 0 ? (
                  vendor.profile.categories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No categories assigned</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm">{formatDate(vendor.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <p className="text-sm">{formatDate(vendor.updatedAt)}</p>
                </div>
              </div>
              
              {vendor.approvedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Approved At</label>
                    <p className="text-sm">{formatDate(vendor.approvedAt)}</p>
                  </div>
                </div>
              )}
              
              {vendor.rejectedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rejected At</label>
                    <p className="text-sm">{formatDate(vendor.rejectedAt)}</p>
                  </div>
                </div>
              )}
              
              {vendor.rejectionReason && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rejection Reason</label>
                  <p className="text-sm text-red-600">{vendor.rejectionReason}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
} 