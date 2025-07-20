'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Phone,
  Clock,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import type { UserDetails } from '@/types/users';

// Mock user details
const mockUserDetails: UserDetails = {
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
  orders: [
    {
      id: '1',
      orderNumber: 'ORD-001',
      status: 'delivered',
      total: 1250,
      items: 3,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-18T14:30:00Z',
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      status: 'shipped',
      total: 890,
      items: 2,
      createdAt: '2024-01-12T09:00:00Z',
      updatedAt: '2024-01-16T11:20:00Z',
    },
  ],
  recentActivity: [
    {
      type: 'login',
      description: 'User logged in',
      timestamp: '2024-01-20T14:30:00Z',
    },
    {
      type: 'order',
      description: 'Placed order #ORD-001',
      timestamp: '2024-01-15T10:00:00Z',
    },
    {
      type: 'profile_update',
      description: 'Updated profile information',
      timestamp: '2024-01-10T16:45:00Z',
    },
  ],
};

type UserDetailPageProps = { params: Promise<{ id: string }> };

export default async function UserDetailPage({ params }: UserDetailPageProps) {
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
                  <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>User Details</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
          <UserDetailContent userId={id} user={mockUserDetails} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// Client component for the content
function UserDetailContent({
  userId,
  user,
}: {
  userId: string;
  user: UserDetails;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [userId]);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

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

  const roleColors = {
    admin: 'bg-red-100 text-red-800',
    vendor: 'bg-blue-100 text-blue-800',
    customer: 'bg-green-100 text-green-800',
    moderator: 'bg-purple-100 text-purple-800',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">User not found</p>
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
            <h1 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground">User details and activity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/users/${userId}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit User
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // TODO: Implement delete functionality
              console.log('Delete user:', userId);
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={`${user.firstName} ${user.lastName}`}
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white text-lg font-semibold">
                      {getInitials(user.firstName, user.lastName)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      className={
                        roleColors[user.role as keyof typeof roleColors]
                      }
                    >
                      {user.role}
                    </Badge>
                    <Badge
                      className={
                        statusColors[user.status as keyof typeof statusColors]
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span>{user.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Member since:</span>
                    <span>{formatDate(user.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Last login:</span>
                    <span>
                      {user.lastLoginAt
                        ? formatDate(user.lastLoginAt)
                        : 'Never'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          {user.address && (
            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm">{user.address.street}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.address.city}, {user.address.state}{' '}
                      {user.address.zipCode}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.address.country}
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
                  <div className="text-2xl font-bold">{user.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">
                    Total Orders
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {formatCurrency(user.totalSpent)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Spent
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {user.emailVerified ? 'Yes' : 'No'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Email Verified
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          {user.orders && user.orders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.orders.slice(0, 5).map(order => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(order.createdAt)}
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
          {/* Verification Status */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Verification</span>
                <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                  {user.emailVerified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Phone Verification</span>
                <Badge variant={user.phoneVerified ? 'default' : 'secondary'}>
                  {user.phoneVerified ? 'Verified' : 'Not Verified'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          {user.recentActivity && user.recentActivity.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.recentActivity.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
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
