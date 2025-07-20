'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Tag,
  TrendingUp,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Copy,
} from 'lucide-react';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { CampaignFilters } from '@/components/campaigns/campaign-filters';
import { CampaignForm } from '@/components/campaigns/campaign-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import type {
  Campaign,
  CampaignFilters as CampaignFiltersType,
  CreateCampaignData,
  UpdateCampaignData,
} from '@/types/campaigns';

// Mock data for development
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Yaz Sezonu İndirimi',
    description:
      'Tüm yaz ürünlerinde %25 indirim fırsatı! Yaz sezonu boyunca geçerli.',
    type: 'discount',
    status: 'active',
    scope: 'category',
    discountType: 'percentage',
    discountValue: 25,
    minOrderAmount: 100,
    maxDiscountAmount: 500,
    usageLimit: 1000,
    usedCount: 342,
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
    createdBy: 'admin',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=150&fit=crop',
    bannerColor: '#f59e0b',
    isActive: true,
    totalRevenue: 125000,
    totalOrders: 342,
    averageOrderValue: 365,
    categoryIds: ['summer', 'clothing'],
  },
  {
    id: '2',
    name: 'Elektronik Flash Satış',
    description: "Sadece 24 saat! Elektronik ürünlerde %40'a varan indirimler.",
    type: 'flash_sale',
    status: 'active',
    scope: 'category',
    discountType: 'percentage',
    discountValue: 40,
    minOrderAmount: 50,
    usageLimit: 500,
    usedCount: 156,
    startDate: '2024-01-20T00:00:00Z',
    endDate: '2024-01-21T00:00:00Z',
    createdAt: '2024-01-19T15:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    createdBy: 'admin',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    bannerColor: '#ef4444',
    isActive: true,
    totalRevenue: 89000,
    totalOrders: 156,
    averageOrderValue: 571,
    categoryIds: ['electronics'],
  },
  {
    id: '3',
    name: 'Ücretsiz Kargo Kampanyası',
    description:
      '100₺ üzeri alışverişlerde ücretsiz kargo! Tüm ürünlerde geçerli.',
    type: 'free_shipping',
    status: 'active',
    scope: 'all_products',
    discountType: 'fixed_amount',
    discountValue: 0,
    minOrderAmount: 100,
    usageLimit: 0,
    usedCount: 1234,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2023-12-20T10:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'admin',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop',
    bannerColor: '#10b981',
    isActive: true,
    totalRevenue: 456000,
    totalOrders: 1234,
    averageOrderValue: 370,
  },
  {
    id: '4',
    name: '1 Al 1 Bedava - Kitap Kampanyası',
    description: 'Kitap kategorisinde 1 al 1 bedava kampanyası! Sınırlı stok.',
    type: 'buy_one_get_one',
    status: 'paused',
    scope: 'category',
    discountType: 'percentage',
    discountValue: 50,
    minOrderAmount: 0,
    usageLimit: 200,
    usedCount: 89,
    startDate: '2024-01-10T00:00:00Z',
    endDate: '2024-02-10T23:59:59Z',
    createdAt: '2024-01-05T14:00:00Z',
    updatedAt: '2024-01-15T16:30:00Z',
    createdBy: 'admin',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop',
    bannerColor: '#8b5cf6',
    isActive: false,
    totalRevenue: 15600,
    totalOrders: 89,
    averageOrderValue: 175,
    categoryIds: ['books'],
  },
  {
    id: '5',
    name: 'Sezonluk Spor Ürünleri',
    description: 'Spor ve fitness ürünlerinde sezonluk indirimler başladı!',
    type: 'seasonal',
    status: 'scheduled',
    scope: 'category',
    discountType: 'percentage',
    discountValue: 30,
    minOrderAmount: 75,
    usageLimit: 800,
    usedCount: 0,
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-01-25T09:00:00Z',
    createdBy: 'admin',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop',
    bannerColor: '#06b6d4',
    isActive: false,
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    categoryIds: ['sports', 'fitness'],
  },
];

export default function CampaignsPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] =
    useState<Campaign[]>(mockCampaigns);
  const [filters, setFilters] = useState<CampaignFiltersType>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<
    Campaign | undefined
  >();
  const [deletingCampaign, setDeletingCampaign] = useState<
    Campaign | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter campaigns
  useEffect(() => {
    let filtered = [...campaigns];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        campaign =>
          campaign.name.toLowerCase().includes(searchLower) ||
          campaign.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(
        campaign => campaign.status === filters.status
      );
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(campaign => campaign.type === filters.type);
    }

    // Scope filter
    if (filters.scope) {
      filtered = filtered.filter(campaign => campaign.scope === filters.scope);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'startDate':
            aValue = new Date(a.startDate).getTime();
            bValue = new Date(b.startDate).getTime();
            break;
          case 'endDate':
            aValue = new Date(a.endDate).getTime();
            bValue = new Date(b.endDate).getTime();
            break;
          case 'totalRevenue':
            aValue = a.totalRevenue;
            bValue = b.totalRevenue;
            break;
          case 'totalOrders':
            aValue = a.totalOrders;
            bValue = b.totalOrders;
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

    setFilteredCampaigns(filtered);
  }, [campaigns, filters]);

  const handleCreateCampaign = (data: CreateCampaignData) => {
    try {
      setIsSubmitting(true);
      // In real app: const newCampaign = await CampaignsService.createCampaign(data)
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        ...data,
        status: 'draft',
        usedCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        isActive: false,
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      };
      setCampaigns(prev => [newCampaign, ...prev]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCampaign = (data: UpdateCampaignData) => {
    if (!editingCampaign) return;

    try {
      setIsSubmitting(true);
      // In real app: const updatedCampaign = await CampaignsService.updateCampaign(editingCampaign.id, data)
      const updatedCampaign: Campaign = {
        ...editingCampaign,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setCampaigns(prev =>
        prev.map(c => (c.id === editingCampaign.id ? updatedCampaign : c))
      );
      setEditingCampaign(undefined);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to update campaign:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const handleDelete = (campaign: Campaign) => {
    setDeletingCampaign(campaign);
  };

  const handleDeleteConfirm = () => {
    if (!deletingCampaign) return;

    try {
      // In real app: await CampaignsService.deleteCampaign(deletingCampaign.id)
      setCampaigns(prev => prev.filter(c => c.id !== deletingCampaign.id));
      setDeletingCampaign(undefined);
    } catch (error) {
      console.error('Failed to delete campaign:', error);
    }
  };

  const handleDuplicate = (campaign: Campaign) => {
    try {
      // In real app: const duplicatedCampaign = await CampaignsService.duplicateCampaign(campaign.id)
      const duplicatedCampaign: Campaign = {
        ...campaign,
        id: Date.now().toString(),
        name: `${campaign.name} (Copy)`,
        status: 'draft',
        usedCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: false,
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
      };
      setCampaigns(prev => [duplicatedCampaign, ...prev]);
    } catch (error) {
      console.error('Failed to duplicate campaign:', error);
    }
  };

  const handleFormSubmit = async (
    data: CreateCampaignData | UpdateCampaignData
  ) => {
    if (editingCampaign) {
      handleUpdateCampaign(data as UpdateCampaignData);
    } else {
      handleCreateCampaign(data as CreateCampaignData);
    }
    return Promise.resolve();
  };

  const getStats = () => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const draftCampaigns = campaigns.filter(c => c.status === 'draft').length;
    const totalRevenue = campaigns.reduce((sum, c) => sum + c.totalRevenue, 0);
    const totalOrders = campaigns.reduce((sum, c) => sum + c.totalOrders, 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalCampaigns,
      activeCampaigns,
      draftCampaigns,
      totalRevenue,
      totalOrders,
      averageOrderValue,
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
                  <BreadcrumbPage>Campaigns</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Campaigns</h1>
              <p className="text-muted-foreground">
                Manage platform campaigns and promotions
              </p>
            </div>
            <Button onClick={() => router.push('/campaigns/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  Total Campaigns
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {stats.totalCampaigns}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">
                  Active Campaigns
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {stats.activeCampaigns}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">
                  Total Revenue
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {new Intl.NumberFormat('tr-TR', {
                  style: 'currency',
                  currency: 'TRY',
                }).format(stats.totalRevenue)}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">
                  Total Orders
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">{stats.totalOrders}</div>
            </div>
          </div>

          {/* Filters */}
          <CampaignFilters filters={filters} onFiltersChange={setFilters} />

          {/* Campaigns Table */}
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">No campaigns found</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map(campaign => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                            {campaign.image ? (
                              <img
                                src={campaign.image}
                                alt={campaign.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <Tag className="h-5 w-5 text-gray-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{campaign.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {campaign.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            campaign.status === 'active'
                              ? 'default'
                              : 'secondary'
                          }
                          className={
                            campaign.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : ''
                          }
                        >
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {campaign.scope.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {campaign.discountValue}
                          {campaign.discountType === 'percentage' ? '%' : '₺'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {campaign.usedCount} / {campaign.usageLimit || '∞'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {new Intl.NumberFormat('tr-TR', {
                            style: 'currency',
                            currency: 'TRY',
                          }).format(campaign.totalRevenue)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(campaign)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate(campaign)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(campaign)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Campaign Form */}
        <CampaignForm
          campaign={editingCampaign}
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCampaign(undefined);
          }}
          onSubmit={handleFormSubmit}
          isLoading={isSubmitting}
        />

        {/* Delete Confirmation */}
        {deletingCampaign && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">Delete Campaign</h3>
              <p className="text-muted-foreground mb-4">
                Are you sure you want to delete "{deletingCampaign.name}"? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setDeletingCampaign(undefined)}
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
