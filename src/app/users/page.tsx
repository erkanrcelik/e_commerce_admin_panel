'use client';

import { PageLayout } from '@/components/layout/page-layout';
import {
  UserDeleteDialog,
  UsersFilters,
  UsersHeader,
  UsersTable,
} from '@/components/users';
import { useUsers } from '@/hooks';
import type { AdminCustomer } from '@/types/admin-customers';
import { useRouter } from 'next/navigation';

/**
 * Customers management page for admin panel
 * Handles customer account management, status updates and permissions
 */
export default function UsersPage() {
  const {
    users,
    filters,
    deletingUser,
    isLoading,
    stats,
    setFilters,
    setDeletingUser,
    deleteUser,
    toggleUserStatus,
  } = useUsers();

  const router = useRouter();

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteUser = (user: AdminCustomer) => {
    setDeletingUser(user);
  };

  /**
   * Close delete confirmation dialog
   */
  const handleCloseDeleteDialog = () => {
    setDeletingUser(undefined);
  };

  /**
   * Handle toggle status with void wrapper
   */
  const handleToggleStatus = (user: AdminCustomer) => {
    void toggleUserStatus(user);
  };

  /**
   * Handle delete confirmation with void wrapper
   */
  const handleConfirmDelete = () => {
    void deleteUser();
  };

  /**
   * Handle view customer details
   */
  const handleViewDetails = (user: AdminCustomer) => {
    router.push(`/users/${user._id}`);
  };

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Customers', isCurrent: true },
      ]}
    >
      {/* Page Header */}
      <UsersHeader />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">👥</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Total Customers</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm font-medium">✅</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Active</span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats.active}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm font-medium">💰</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Total Revenue</span>
          </div>
          <div className="text-2xl font-bold mt-1">
            ${(stats.totalRevenue || 0).toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm font-medium">📊</span>
            </div>
            <span className="text-sm font-medium text-gray-600">Avg Order Value</span>
          </div>
          <div className="text-2xl font-bold mt-1">
            ${(stats.averageOrderValue || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filters */}
      <UsersFilters
        filters={filters}
        onFiltersChange={setFilters}
        onReset={() => setFilters({ page: 1, limit: 10 })}
      />

      {/* Users Table */}
      <UsersTable
        users={users}
        isLoading={isLoading}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
        onViewDetails={handleViewDetails}
      />

      {/* Delete Confirmation Dialog */}
      <UserDeleteDialog
        user={deletingUser || null}
        isOpen={!!deletingUser}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        isLoading={false}
      />
    </PageLayout>
  );
}
