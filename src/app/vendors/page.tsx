'use client';

import { useState, useEffect } from 'react';
import { Plus, Building, Users, DollarSign, Star } from 'lucide-react';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { VendorCard } from '@/components/vendors/vendor-card';
import { VendorFilters } from '@/components/vendors/vendor-filters';
import { VendorDetailsModal } from '@/components/vendors/vendor-details-modal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import type {
  Vendor,
  VendorDetails,
  VendorFilters as VendorFiltersType,
} from '@/types/vendors';

// Mock data for development
const mockVendors: Vendor[] = [
  {
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
  },
  {
    id: '2',
    userId: '6',
    businessName: 'Mustafa Çelik',
    contactPerson: 'Mustafa Çelik',
    email: 'mustafa@example.com',
    phone: '+90 555 654 3210',
    type: 'individual',
    status: 'suspended',
    commissionRate: 12,
    commissionType: 'percentage',
    description:
      'Individual seller specializing in handmade crafts and accessories.',
    address: {
      street: 'El Sanatları Sokak No:12',
      city: 'Ankara',
      state: 'Ankara',
      zipCode: '06000',
      country: 'Türkiye',
    },
    documents: [
      {
        id: '3',
        type: 'identity_card',
        name: 'Identity Card.pdf',
        url: '#',
        uploadedAt: '2024-01-10T05:00:00Z',
      },
    ],
    createdAt: '2024-01-10T05:00:00Z',
    updatedAt: '2024-01-10T05:00:00Z',
    approvedAt: '2024-01-12T09:15:00Z',
    approvedBy: 'admin',
    totalProducts: 23,
    totalSales: 5670,
    totalCommission: 680,
    rating: 3.2,
    reviewCount: 8,
  },
  {
    id: '3',
    userId: '9',
    businessName: 'Fashion Forward',
    contactPerson: 'Zeynep Arslan',
    email: 'zeynep@fashionforward.com',
    phone: '+90 555 321 6547',
    type: 'company',
    status: 'pending',
    commissionRate: 18,
    commissionType: 'percentage',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop',
    description:
      'Premium fashion retailer offering the latest trends in clothing and accessories.',
    website: 'https://fashionforward.com',
    taxNumber: '9876543210',
    address: {
      street: 'Moda Caddesi No:78',
      city: 'İzmir',
      state: 'İzmir',
      zipCode: '35000',
      country: 'Türkiye',
    },
    documents: [
      {
        id: '4',
        type: 'business_license',
        name: 'Business License.pdf',
        url: '#',
        uploadedAt: '2024-01-20T11:00:00Z',
      },
    ],
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z',
    totalProducts: 0,
    totalSales: 0,
    totalCommission: 0,
    rating: 0,
    reviewCount: 0,
  },
  {
    id: '4',
    userId: '10',
    businessName: 'Home & Garden Plus',
    contactPerson: 'Ahmet Yılmaz',
    email: 'ahmet@homegarden.com',
    phone: '+90 555 147 2583',
    type: 'company',
    status: 'approved',
    commissionRate: 14,
    commissionType: 'percentage',
    logo: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
    description: 'Your one-stop shop for all home and garden needs.',
    website: 'https://homegarden.com',
    taxNumber: '1122334455',
    address: {
      street: 'Bahçe Sokak No:34',
      city: 'Bursa',
      state: 'Bursa',
      zipCode: '16000',
      country: 'Türkiye',
    },
    bankInfo: {
      bankName: 'İş Bankası',
      accountNumber: '87654321',
      iban: 'TR876543210987654321098765',
    },
    documents: [
      {
        id: '5',
        type: 'business_license',
        name: 'Business License.pdf',
        url: '#',
        uploadedAt: '2024-01-18T16:00:00Z',
      },
    ],
    createdAt: '2024-01-18T16:00:00Z',
    updatedAt: '2024-01-18T16:00:00Z',
    approvedAt: '2024-01-19T10:30:00Z',
    approvedBy: 'admin',
    totalProducts: 89,
    totalSales: 23450,
    totalCommission: 3283,
    rating: 4.5,
    reviewCount: 67,
  },
  {
    id: '5',
    userId: '11',
    businessName: 'Sports Equipment Pro',
    contactPerson: 'Mehmet Kaya',
    email: 'mehmet@sportsequipment.com',
    phone: '+90 555 963 8527',
    type: 'company',
    status: 'active',
    commissionRate: 16,
    commissionType: 'percentage',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
    description: 'Professional sports equipment and fitness gear supplier.',
    website: 'https://sportsequipment.com',
    taxNumber: '5566778899',
    address: {
      street: 'Spor Caddesi No:56',
      city: 'Antalya',
      state: 'Antalya',
      zipCode: '07000',
      country: 'Türkiye',
    },
    bankInfo: {
      bankName: 'Yapı Kredi',
      accountNumber: '11223344',
      iban: 'TR112233445566778899001122',
    },
    documents: [
      {
        id: '6',
        type: 'business_license',
        name: 'Business License.pdf',
        url: '#',
        uploadedAt: '2024-01-16T13:00:00Z',
      },
    ],
    createdAt: '2024-01-16T13:00:00Z',
    updatedAt: '2024-01-16T13:00:00Z',
    approvedAt: '2024-01-17T15:45:00Z',
    approvedBy: 'admin',
    totalProducts: 234,
    totalSales: 45670,
    totalCommission: 7307,
    rating: 4.7,
    reviewCount: 123,
  },
];

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(mockVendors);
  const [filters, setFilters] = useState<VendorFiltersType>({});
  const [selectedVendor, setSelectedVendor] = useState<VendorDetails | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [deletingVendor, setDeletingVendor] = useState<Vendor | undefined>();

  // Filter vendors
  useEffect(() => {
    let filtered = [...vendors];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        vendor =>
          vendor.businessName.toLowerCase().includes(searchLower) ||
          vendor.contactPerson.toLowerCase().includes(searchLower) ||
          vendor.email.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(vendor => vendor.status === filters.status);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(vendor => vendor.type === filters.type);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
          case 'businessName':
            aValue = a.businessName.toLowerCase();
            bValue = b.businessName.toLowerCase();
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'totalSales':
            aValue = a.totalSales;
            bValue = b.totalSales;
            break;
          case 'rating':
            aValue = a.rating;
            bValue = b.rating;
            break;
          case 'totalProducts':
            aValue = a.totalProducts;
            bValue = b.totalProducts;
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    setFilteredVendors(filtered);
  }, [vendors, filters]);

  const handleEdit = (vendor: Vendor) => {
    // TODO: Implement edit functionality
    console.log('Edit vendor:', vendor);
  };

  const handleDelete = (vendor: Vendor) => {
    setDeletingVendor(vendor);
  };

  const handleDeleteConfirm = () => {
    if (!deletingVendor) return;

    try {
      // In real app: await VendorsService.deleteVendor(deletingVendor.id)
      setVendors(prev => prev.filter(v => v.id !== deletingVendor.id));
      setDeletingVendor(undefined);
    } catch (error) {
      console.error('Failed to delete vendor:', error);
    }
  };

  const getStats = () => {
    const totalVendors = vendors.length;
    const activeVendors = vendors.filter(v => v.status === 'active').length;
    const pendingVendors = vendors.filter(v => v.status === 'pending').length;
    const totalSales = vendors.reduce((sum, v) => sum + v.totalSales, 0);
    const totalCommission = vendors.reduce(
      (sum, v) => sum + v.totalCommission,
      0
    );
    const averageRating =
      vendors.length > 0
        ? vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length
        : 0;

    return {
      totalVendors,
      activeVendors,
      pendingVendors,
      totalSales,
      totalCommission,
      averageRating,
    };
  };

  const stats = getStats();

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
                <BreadcrumbItem>
                  <BreadcrumbPage>Vendors</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Vendors</h1>
              <p className="text-muted-foreground">
                Manage vendor accounts and applications
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  Total Vendors
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {stats.totalVendors}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">
                  Active Vendors
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {stats.activeVendors}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">
                  Total Sales
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                }).format(stats.totalSales)}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-600">
                  Avg Rating
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {stats.averageRating.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Filters */}
          <VendorFilters filters={filters} onFiltersChange={setFilters} />

          {/* Vendors Grid */}
          {filteredVendors.length === 0 ? (
            <div className="text-center py-12">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">No vendors found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVendors.map(vendor => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Vendor Details Modal */}
        <VendorDetailsModal
          vendor={selectedVendor}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedVendor(null);
          }}
        />

        {/* Delete Confirmation */}
        {deletingVendor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">Delete Vendor</h3>
              <p className="text-muted-foreground mb-4">
                Are you sure you want to delete "{deletingVendor.businessName}"?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeletingVendor(undefined)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
