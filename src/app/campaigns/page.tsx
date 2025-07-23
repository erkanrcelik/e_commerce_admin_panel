'use client';

import {
  CampaignCard,
  CampaignDeleteDialog,
  CampaignFilters,
  CampaignForm
} from '@/components/campaigns';
import { PageLayout } from '@/components/layout/page-layout';
import { useCampaigns } from '@/hooks/use-campaigns';
import { AdminCampaignsService } from '@/services/admin-campaigns.service';
import type { AdminCampaign, CreatePlatformCampaignRequest, UpdateCampaignRequest } from '@/types/admin-campaigns';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Campaigns management page for admin panel
 * Handles platform and seller campaign management with CRUD operations
 */
export default function CampaignsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<AdminCampaign | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    campaigns,
    filters,
    deletingCampaign,
    isLoading,
    stats,
    setFilters,
    setDeletingCampaign,
    deleteCampaign,
    toggleCampaignStatus,
    loadCampaigns,
  } = useCampaigns();

  /**
   * Open create campaign form
   */
  const handleCreateCampaign = () => {
    setShowCreateForm(true);
  };

  /**
   * Close create campaign form
   */
  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  /**
   * Open edit form with selected campaign
   */
  const handleEditCampaign = (campaign: AdminCampaign) => {
    setEditingCampaign(campaign);
  };

  /**
   * Close edit form
   */
  const handleCloseEditForm = () => {
    setEditingCampaign(null);
  };

  /**
   * Handle form submission for create or edit
   */
  const handleFormSubmit = async (data: CreatePlatformCampaignRequest | UpdateCampaignRequest) => {
    let loadingToastId: string | number | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = toast.loading(
        editingCampaign ? 'Updating campaign...' : 'Creating campaign...'
      );

      if (editingCampaign) {
        // Update existing campaign
        await AdminCampaignsService.updateCampaign(editingCampaign._id, data as UpdateCampaignRequest);
        toast.success('Campaign updated successfully!');
      } else {
        // Create new platform campaign
        await AdminCampaignsService.createPlatformCampaign(data as CreatePlatformCampaignRequest);
        toast.success('Campaign created successfully!');
      }

      // Refresh campaigns list
      await loadCampaigns();

      // Close form
      if (editingCampaign) {
        handleCloseEditForm();
      } else {
        handleCloseCreateForm();
      }
    } catch (error) {
      console.error('Campaign operation failed:', error);
      toast.error(
        editingCampaign 
          ? 'Failed to update campaign' 
          : 'Failed to create campaign'
      );
    } finally {
      setIsSubmitting(false);
      if (loadingToastId) toast.dismiss(loadingToastId);
    }
  };

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteCampaign = (campaign: AdminCampaign) => {
    setDeletingCampaign(campaign);
  };

  /**
   * Close delete confirmation dialog
   */
  const handleCloseDeleteDialog = () => {
    setDeletingCampaign(undefined);
  };

  /**
   * Handle delete confirmation with void wrapper
   */
  const handleConfirmDelete = () => {
    void deleteCampaign();
  };

  /**
   * Reset filters
   */
  const handleResetFilters = () => {
    setFilters({});
  };

  /**
   * Handle campaign status toggle
   */
  const handleStatusToggle = (campaign: AdminCampaign) => {
    void toggleCampaignStatus(campaign);
  };

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Campaigns', isCurrent: true },
      ]}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaign Management</h1>
          <p className="text-muted-foreground">
            Manage platform and seller campaigns, discounts, and promotions
          </p>
        </div>
        <button
          onClick={handleCreateCampaign}
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
        >
          Create Campaign
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">🎯</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Total Campaigns</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">✅</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Active Campaigns</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.active}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-medium">🏢</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Platform Campaigns</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.platform}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm font-medium">⚠️</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Expiring Soon</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.expiringSoon}</div>
        </div>
      </div>

      {/* Filters */}
      <CampaignFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={handleResetFilters}
      />

      {/* Campaigns Grid */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">No campaigns found</h3>
            <p className="text-muted-foreground mb-4">
              {Object.keys(filters).length > 0 
                ? "Try adjusting your filters to see more campaigns."
                : "Get started by creating your first campaign."}
            </p>
            <button
              onClick={() => { handleCreateCampaign(); }}
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
            >
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                onEdit={(campaign) => { void handleEditCampaign(campaign); }}
                onDelete={(campaign) => { void handleDeleteCampaign(campaign); }}
                onStatusChange={(campaign) => { void handleStatusToggle(campaign); }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <CampaignDeleteDialog
        campaign={deletingCampaign || null}
        isOpen={!!deletingCampaign}
        onClose={() => { handleCloseDeleteDialog(); }}
        onConfirm={() => { void handleConfirmDelete(); }}
        isLoading={false}
      />

      {/* Create Campaign Form */}
      <CampaignForm
        isOpen={showCreateForm}
        onClose={() => { handleCloseCreateForm(); }}
        onSubmit={(data) => { void handleFormSubmit(data); }}
        isLoading={isSubmitting}
      />

      {/* Edit Campaign Form */}
      <CampaignForm
        campaign={editingCampaign || undefined}
        isOpen={!!editingCampaign}
        onClose={() => { handleCloseEditForm(); }}
        onSubmit={(data) => { void handleFormSubmit(data); }}
        isLoading={isSubmitting}
      />
    </PageLayout>
  );
}
