'use client';

import { Users as UsersIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FilterBar } from '@/components/layout/filter-bar';
import { PageHeader } from '@/components/layout/page-header';
import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/users/user-card';
import { useToast } from '@/hooks/use-toast';
import { UsersService } from '@/services/users.service';

import type { User, UserFilters as UserFiltersType, UserStats } from '@/types/users';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFiltersType>({});
  const [deletingUser, setDeletingUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<UserStats | null>(null);
  const { showSuccess, showError, showLoading, dismiss } = useToast();

  // Load users from API
  useEffect(() => {
    void loadUsers();
    void loadStats();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const response = await UsersService.getUsers({
        page: 1,
        limit: 100, // Get all users for now
        ...filters,
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
      showError({
        message: 'Failed to load users',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await UsersService.getUserStats();
      setStats(response);
    } catch (error) {
      console.error('Failed to load user stats:', error);
    }
  };

  // Filter users
  useEffect(() => {
    let filtered = [...users];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.firstName.toLowerCase().includes(searchLower) ||
          user.lastName.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.isActive !== undefined) {
      filtered = filtered.filter(user => user.isActive === filters.isActive);
    }

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
          case 'name':
            aValue = `${a.firstName} ${a.lastName}`.toLowerCase();
            bValue = `${b.firstName} ${b.lastName}`.toLowerCase();
            break;
          case 'email':
            aValue = a.email.toLowerCase();
            bValue = b.email.toLowerCase();
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
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

    setFilteredUsers(filtered);
  }, [users, filters]);

  const handleAddUser = () => {
    router.push('/users/new');
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;

    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Deleting user...',
        description: 'Please wait while we delete the user',
      });

      await UsersService.deleteUser(deletingUser._id);
      setUsers(prev => prev.filter(u => u._id !== deletingUser._id));
      setDeletingUser(undefined);

      showSuccess({
        message: 'User deleted successfully!',
        description: `"${deletingUser.firstName} ${deletingUser.lastName}" has been removed.`,
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
      showError({
        message: 'Failed to delete user',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  const handleToggleStatus = async (user: User) => {
    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Updating status...',
        description: 'Please wait while we update the user status',
      });

      const updatedUser = await UsersService.toggleUserStatus(user._id);
      setUsers(prev =>
        prev.map(u => (u._id === user._id ? updatedUser : u))
      );

      showSuccess({
        message: 'Status updated successfully!',
        description: `"${updatedUser.firstName} ${updatedUser.lastName}" is now ${updatedUser.isActive ? 'active' : 'inactive'}.`,
      });
    } catch (error) {
      console.error('Failed to toggle user status:', error);
      showError({
        message: 'Failed to update status',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  const filterFields = [
    {
      key: 'search',
      label: 'Search',
      type: 'search' as const,
      placeholder: 'Search users...',
    },
    {
      key: 'isActive',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Users' },
        { value: 'active', label: 'Active Only' },
        { value: 'inactive', label: 'Inactive Only' },
      ],
    },
    {
      key: 'sortBy',
      label: 'Sort by',
      type: 'select' as const,
      width: 'w-40',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'name', label: 'Name' },
        { value: 'email', label: 'Email' },
        { value: 'createdAt', label: 'Created Date' },
      ],
    },
    {
      key: 'sortOrder',
      label: 'Order',
      type: 'select' as const,
      width: 'w-24',
      options: [
        { value: 'desc', label: 'Desc' },
        { value: 'asc', label: 'Asc' },
      ],
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Admin Panel', href: '/' },
        { label: 'Users', isCurrent: true },
      ]}
    >
      <PageHeader
        title="Users"
        description="Manage user accounts and permissions"
        actionButton={{
          label: 'Add User',
          onClick: handleAddUser,
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              Total Users
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">{stats?.total || users.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">
              Active Users
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">
            {stats?.active || users.filter(u => u.isActive).length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">
              Inactive Users
            </span>
          </div>
          <div className="text-2xl font-bold mt-1">
            {stats?.inactive || users.filter(u => !u.isActive).length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        fields={filterFields}
        searchPlaceholder="Search users..."
      />

      {/* Users Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map(user => (
            <UserCard 
              key={user._id} 
              user={user} 
              onDelete={handleDelete}
              onToggleStatus={(user) => {
                void handleToggleStatus(user);
              }}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete User</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete "{deletingUser.firstName}{' '}
              {deletingUser.lastName}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeletingUser(undefined)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  void handleDeleteConfirm();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
