'use client';

import {
    ArrowLeft,
    Building,
    Clock,
    Edit,
    FileText,
    Mail,
    MapPin,
    Phone,
    Star,
    Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { Badge } from '@/components/ui/badge';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import type { VendorDetails } from '@/types/vendors';

// Mock vendor details
const mockVendorDetails: VendorDetails = {
  id: '1',
  userId: '2',
  businessName: 'TechMart Electronics',
  contactPerson: 'Fatma Demir',
  email: 'fatma@techmart.com',
  phone: '+90 555 987 6543',
  type: 'company',
  status: 'active',
  commissionRate: 15,
  commissionType: 'percentage',
  logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
  description:
    'Leading electronics retailer with over 10 years of experience in consumer electronics.',
  website: 'https://techmart.com',
  taxNumber: '1234567890',
  address: {
    street: 'Teknoloji Caddesi No:45',
    city: 'İstanbul',
    state: 'İstanbul',
    zipCode: '34000',
    country: 'Türkiye',
  },
  bankInfo: {
    bankName: 'Garanti BBVA',
    accountNumber: '12345678',
    iban: 'TR123456789012345678901234',
  },
  documents: [
    {
      id: '1',
      type: 'business_license',
      name: 'Business License.pdf',
      url: '#',
      uploadedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      type: 'tax_certificate',
      name: 'Tax Certificate.pdf',
      url: '#',
      uploadedAt: '2024-01-15T10:00:00Z',
    },
  ],
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z',
  approvedAt: '2024-01-16T14:30:00Z',
  approvedBy: 'admin',
  totalProducts: 1250,
  totalSales: 125000,
  totalCommission: 18750,
  rating: 4.8,
  reviewCount: 156,
  stats: {
    totalProducts: 1250,
    totalSales: 125000,
    totalCommission: 18750,
    totalOrders: 156,
    activeProducts: 1200,
    averageRating: 4.8,
    reviewCount: 156,
    monthlySales: [
      {
        month: 'January',
        sales: 15000,
        orders: 45,
      },
      {
        month: 'February',
        sales: 18000,
        orders: 52,
      },
    ],
    topProducts: [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        sales: 45,
        revenue: 67500,
      },
      {
        id: '2',
        name: 'Samsung Galaxy S24',
        sales: 32,
        revenue: 48000,
      },
    ],
  },
  recentOrders: [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'Ahmet Yılmaz',
      status: 'delivered',
      total: 1250,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Zeynep Arslan',
      status: 'shipped',
      total: 890,
      createdAt: '2024-01-12T09:00:00Z',
    },
  ],
  recentReviews: [
    {
      id: '1',
      rating: 5,
      comment: 'Excellent service and fast delivery!',
      customerName: 'Ahmet Yılmaz',
      createdAt: '2024-01-20T14:30:00Z',
    },
    {
      id: '2',
      rating: 4,
      comment: 'Good quality products, recommended.',
      customerName: 'Zeynep Arslan',
      createdAt: '2024-01-19T11:20:00Z',
    },
  ],
};

type VendorDetailPageProps = { params: Promise<{ id: string }> };

export default async function VendorDetailPage({
  params,
}: VendorDetailPageProps) {
  const { id } = await params;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Admin Panel</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/vendors">Vendors</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Vendor Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <VendorDetailContent vendorId={id} vendor={mockVendorDetails} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Client component for the content
function VendorDetailContent({
  vendorId,
  vendor,
}: {
  vendorId: string;
  vendor: VendorDetails;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [vendorId]);

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

  const typeColors = {
    company: 'bg-blue-100 text-blue-800',
    individual: 'bg-green-100 text-green-800',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">
            Loading vendor details...
          </p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Vendor not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{vendor.businessName}</h1>
            <p className="text-muted-foreground">
              Vendor details and performance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/vendors/${vendorId}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Vendor
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // TODO: Implement delete functionality
              console.log('Delete vendor:', vendorId);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendor Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  {vendor.logo ? (
                    <Image
                      src={vendor.logo}
                      alt={vendor.businessName}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <Building className="h-8 w-8 text-white" />
                  )}
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
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Joined:</span>
                    <span>{formatDate(vendor.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Rating:</span>
                    <span>
                      {vendor.rating}/5 ({vendor.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {vendor.description && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {vendor.description}
                  </p>
                </div>
              )}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          {vendor.recentOrders && vendor.recentOrders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendor.recentOrders.slice(0, 5).map(order => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerName} • {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(order.total)}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Commission Information */}
          <Card>
            <CardHeader>
              <CardTitle>Commission Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Commission Rate</span>
                <span className="font-medium">{vendor.commissionRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Commission Type</span>
                <span className="font-medium capitalize">
                  {vendor.commissionType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Commission</span>
                <span className="font-medium">
                  {formatCurrency(vendor.totalCommission)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Bank Information */}
          {vendor.bankInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Bank Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {vendor.bankInfo.bankName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Account: {vendor.bankInfo.accountNumber}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    IBAN: {vendor.bankInfo.iban}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Documents */}
          {vendor.documents && vendor.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendor.documents.map(doc => (
                    <div
                      key={doc.id}
                      className="flex items-center gap-3 p-2 border rounded"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(doc.uploadedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Reviews */}
          {vendor.recentReviews && vendor.recentReviews.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vendor.recentReviews.slice(0, 3).map(review => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.customerName}
                        </span>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
