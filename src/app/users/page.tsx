'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Users as UsersIcon } from 'lucide-react';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { UserCard } from '@/components/users/user-card';
import { UserFilters } from '@/components/users/user-filters';

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

import type { User, UserFilters as UserFiltersType } from '@/types/users';

// Mock data for development - Only customers
const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@example.com',
    firstName: 'Mehmet',
    lastName: 'Kaya',
    phone: '+90 555 456 7890',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'customer',
    status: 'active',
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z',
    lastLoginAt: '2024-01-20T11:20:00Z',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 12,
    totalSpent: 3450,
    address: {
      street: 'Atatürk Caddesi No:123',
      city: 'İstanbul',
      state: 'İstanbul',
      zipCode: '34000',
      country: 'Türkiye',
    },
  },
  {
    id: '2',
    email: 'customer2@example.com',
    firstName: 'Zeynep',
    lastName: 'Arslan',
    phone: '+90 555 321 6547',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'customer',
    status: 'active',
    createdAt: '2024-01-11T06:00:00Z',
    updatedAt: '2024-01-11T06:00:00Z',
    lastLoginAt: '2024-01-15T09:30:00Z',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 8,
    totalSpent: 1890,
    address: {
      street: 'İstiklal Caddesi No:45',
      city: 'İzmir',
      state: 'İzmir',
      zipCode: '35000',
      country: 'Türkiye',
    },
  },
  {
    id: '3',
    email: 'customer3@example.com',
    firstName: 'Elif',
    lastName: 'Yıldız',
    phone: '+90 555 147 2583',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'customer',
    status: 'pending',
    createdAt: '2024-01-09T04:00:00Z',
    updatedAt: '2024-01-09T04:00:00Z',
    emailVerified: false,
    phoneVerified: false,
    totalOrders: 0,
    totalSpent: 0,
  },
  {
    id: '4',
    email: 'customer4@example.com',
    firstName: 'Ahmet',
    lastName: 'Demir',
    phone: '+90 555 789 1234',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'customer',
    status: 'active',
    createdAt: '2024-01-08T03:00:00Z',
    updatedAt: '2024-01-08T03:00:00Z',
    lastLoginAt: '2024-01-20T08:20:00Z',
    emailVerified: true,
    phoneVerified: true,
    totalOrders: 25,
    totalSpent: 5670,
    address: {
      street: 'Cumhuriyet Caddesi No:78',
      city: 'Ankara',
      state: 'Ankara',
      zipCode: '06000',
      country: 'Türkiye',
    },
  },
  {
    id: '5',
    email: 'customer5@example.com',
    firstName: 'Fatma',
    lastName: 'Özkan',
    phone: '+90 555 963 8527',
    role: 'customer',
    status: 'inactive',
    createdAt: '2024-01-07T02:00:00Z',
    updatedAt: '2024-01-07T02:00:00Z',
    lastLoginAt: '2024-01-15T14:30:00Z',
    emailVerified: true,
    phoneVerified: false,
    totalOrders: 3,
    totalSpent: 890,
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [filters, setFilters] = useState<UserFiltersType>({});
  const [deletingUser, setDeletingUser] = useState<User | undefined>();

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

    // Role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status);
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
          case 'lastLoginAt':
            aValue = a.lastLoginAt ? new Date(a.lastLoginAt).getTime() : 0;
            bValue = b.lastLoginAt ? new Date(b.lastLoginAt).getTime() : 0;
            break;
          case 'totalOrders':
            aValue = a.totalOrders;
            bValue = b.totalOrders;
            break;
          case 'totalSpent':
            aValue = a.totalSpent;
            bValue = b.totalSpent;
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

  const handleDeleteConfirm = () => {
    if (!deletingUser) return;

    try {
      // In real app: await UsersService.deleteUser(deletingUser.id)
      setUsers(prev => prev.filter(u => u.id !== deletingUser.id));
      setDeletingUser(undefined);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

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
                  <BreadcrumbPage>Users</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Users</h1>
              <p className="text-muted-foreground">
                Manage user accounts and permissions
              </p>
            </div>
            <Button onClick={handleAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">
                  Total Users
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">{users.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">
                  Active Users
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {users.filter(u => u.status === 'active').length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">
                  Customers
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {users.filter(u => u.role === 'customer').length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">
                  Vendors
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {users.filter(u => u.role === 'vendor').length}
              </div>
            </div>
          </div>

          {/* Filters */}
          <UserFilters filters={filters} onFiltersChange={setFilters} />

          {/* Users Grid */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-muted-foreground">No users found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredUsers.map(user => (
                <UserCard key={user.id} user={user} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation */}
        {deletingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">Delete User</h3>
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
