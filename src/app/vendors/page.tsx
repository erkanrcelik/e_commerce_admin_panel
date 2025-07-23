'use client';

import { PageLayout } from '@/components/layout/page-layout';
import {
  VendorDeleteDialog,
  VendorForm,
  VendorsFilters,
  VendorsHeader,
  VendorsTable,
} from '@/components/vendors';
import { useVendors } from '@/hooks/use-vendors';
import type { AdminVendor } from '@/types/admin-vendors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * Vendors management page for admin panel
 * Handles vendor account management, store approvals and seller permissions
 */
export default function VendorsPage() {
  const router = useRouter();
  const [showAddVendor, setShowAddVendor] = useState(false);
  const {
    vendors,
    filters,
    deletingVendor,
    isLoading,
    stats,
    setFilters,
    setDeletingVendor,
    deleteVendor,
    toggleVendorStatus,
    loadVendors,
  } = useVendors();

  /**
   * Navigate to vendor detail page
   */
  const handleViewDetails = (vendor: AdminVendor) => {
    router.push(`/vendors/${vendor._id}`);
  };

  /**
   * Handle add vendor success
   */
  const handleAddVendorSuccess = async () => {
    // Refresh vendors list
    await loadVendors();
    setShowAddVendor(false);
  };

  /**
   * Open add vendor dialog
   */
  const handleAddVendor = () => {
    setShowAddVendor(true);
  };

  /**
   * Close add vendor dialog
   */
  const handleCloseAddVendor = () => {
    setShowAddVendor(false);
  };

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteVendor = (vendor: AdminVendor) => {
    setDeletingVendor(vendor);
  };

  /**
   * Close delete confirmation dialog
   */
  const handleCloseDeleteDialog = () => {
    setDeletingVendor(undefined);
  };

  /**
   * Handle toggle status
   */
  const handleToggleStatus = (vendor: AdminVendor) => {
    void toggleVendorStatus(vendor);
  };

  /**
   * Handle delete confirmation with void wrapper
   */
  const handleConfirmDelete = () => {
    void deleteVendor();
  };

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Vendors', isCurrent: true },
      ]}
    >
      {/* Page Header */}
      <VendorsHeader onAddVendor={handleAddVendor} />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">🏪</span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              Total Vendors
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">✅</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Approved</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.approved}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm font-medium">⏳</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Pending</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.pending}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-medium">🛍️</span>
            </div>
            <span className="text-sm font-medium text-gray-600">
              Active Stores
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.active}</div>
        </div>
      </div>

      {/* Filters */}
      <VendorsFilters filters={filters} onFiltersChange={setFilters} />

      {/* Vendors Table */}
      <VendorsTable
        vendors={vendors}
        isLoading={isLoading}
        onDelete={vendor => {
          void handleDeleteVendor(vendor);
        }}
        onToggleStatus={vendor => {
          void handleToggleStatus(vendor);
        }}
        onViewDetails={vendor => {
          void handleViewDetails(vendor);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <VendorDeleteDialog
        vendor={deletingVendor || null}
        isOpen={!!deletingVendor}
        onClose={() => {
          handleCloseDeleteDialog();
        }}
        onConfirm={() => {
          void handleConfirmDelete();
        }}
        isLoading={false}
      />

      {/* Add Vendor Dialog */}
      <VendorForm
        isOpen={showAddVendor}
        onClose={() => {
          handleCloseAddVendor();
        }}
        onSuccess={() => {
          void handleAddVendorSuccess();
        }}
      />
    </PageLayout>
  );
}
