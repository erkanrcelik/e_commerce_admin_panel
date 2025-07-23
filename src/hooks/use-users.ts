import { AdminCustomersService } from '@/services/admin-customers.service';
import type {
  AdminCustomer,
  CustomerListQuery,
  CustomerStats,
} from '@/types/admin-customers';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for managing customers (users)
 */
export function useUsers() {
  const [users, setUsers] = useState<AdminCustomer[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    total: 0,
    active: 0,
    inactive: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
  });
  const [filters, setFilters] = useState<CustomerListQuery>({
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deletingUser, setDeletingUser] = useState<AdminCustomer | undefined>(
    undefined
  );

  /**
   * Fetch customers from API
   */
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await AdminCustomersService.getCustomers(filters);
      setUsers(response.data);
    } catch {
      toast.error('Failed to load customers');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  /**
   * Fetch customer statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      const statsData = await AdminCustomersService.getCustomerStats();
      setStats(statsData);
    } catch {
      toast.error('Failed to load customer statistics');
    }
  }, []);

  /**
   * Toggle customer status
   */
  const toggleUserStatus = useCallback(async (user: AdminCustomer) => {
    try {
      const updatedUser = await AdminCustomersService.toggleCustomerStatus(
        user._id
      );

      // Update user in the list
      setUsers(prevUsers =>
        prevUsers.map(u => (u._id === user._id ? updatedUser : u))
      );

      toast.success(
        `Customer ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully`
      );
    } catch {
      toast.error('Failed to update customer status');
    }
  }, []);

  /**
   * Delete customer
   */
  const deleteUser = useCallback(async () => {
    if (!deletingUser) return;

    try {
      await AdminCustomersService.deleteCustomer(deletingUser._id);

      // Remove user from the list
      setUsers(prevUsers => prevUsers.filter(u => u._id !== deletingUser._id));

      setDeletingUser(undefined);
      toast.success('Customer deleted successfully');
    } catch {
      toast.error('Failed to delete customer');
    }
  }, [deletingUser]);

  /**
   * Update filters and refetch data
   */
  const updateFilters = useCallback(
    (newFilters: Partial<CustomerListQuery>) => {
      setFilters(prev => ({
        ...prev,
        ...newFilters,
        page: 1, // Reset to first page when filters change
      }));
    },
    []
  );

  // Fetch data on mount and when filters change
  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  // Fetch stats on mount
  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  return {
    users,
    stats,
    filters,
    isLoading,
    deletingUser,
    setDeletingUser,
    setFilters: updateFilters,
    deleteUser,
    toggleUserStatus,
  };
}
