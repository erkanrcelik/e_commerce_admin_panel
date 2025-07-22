'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { DashboardActivities } from '@/types/admin-dashboard';
import {
  Package,
  ShoppingCart,
  Tag,
  User
} from 'lucide-react';

interface RecentActivitiesProps {
  activities: DashboardActivities | null;
  isLoading?: boolean;
}

/**
 * Recent Activities Component
 * 
 * Displays recent activities across different categories (users, orders, products, campaigns)
 * in a tabbed interface. Shows loading states and handles empty data gracefully.
 * 
 * @param activities - Dashboard activities data or null
 * @param isLoading - Whether to show loading skeleton (default: false)
 */
export function RecentActivities({ activities, isLoading = false }: RecentActivitiesProps) {
  /**
   * Formats date strings to a readable format
   * @param dateString - ISO date string
   * @returns Formatted date string
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Formats currency values for display
   * @param amount - The amount to format
   * @returns Formatted currency string
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!activities) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4 mt-4">
            {activities.newUsers.length === 0 ? (
              <p className="text-muted-foreground text-sm">No new user registrations</p>
            ) : (
              activities.newUsers.map((user) => (
                <div key={user._id} className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <Badge variant="outline" className="text-xs">
                        {user.role === 'customer' ? 'Customer' : 
                         user.role === 'seller' ? 'Seller' : 'Admin'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 mt-4">
            {activities.recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No new orders</p>
            ) : (
              activities.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center space-x-4">
                  <div className="p-2 bg-green-100 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{order.customerName}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {order.itemCount} items • {formatCurrency(order.totalPrice)}
                      </p>
                      <Badge 
                        variant={
                          order.status === 'delivered' ? 'default' :
                          order.status === 'processing' ? 'secondary' :
                          order.status === 'pending' ? 'outline' : 'destructive'
                        }
                        className="text-xs"
                      >
                        {order.status === 'pending' ? 'Pending' :
                         order.status === 'processing' ? 'Processing' :
                         order.status === 'shipped' ? 'Shipped' :
                         order.status === 'delivered' ? 'Delivered' : 'Cancelled'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="products" className="space-y-4 mt-4">
            {activities.newProducts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No new products added</p>
            ) : (
              activities.newProducts.map((product) => (
                <div key={product._id} className="flex items-center space-x-4">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Package className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {product.sellerName} • {formatCurrency(product.price)}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(product.createdAt)}
                  </div>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4 mt-4">
            {activities.newCampaigns.length === 0 ? (
              <p className="text-muted-foreground text-sm">No new campaigns created</p>
            ) : (
              activities.newCampaigns.map((campaign) => (
                <div key={campaign._id} className="flex items-center space-x-4">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Tag className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{campaign.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        {campaign.discountValue}% discount
                        {campaign.sellerName && ` • ${campaign.sellerName}`}
                      </p>
                      <Badge 
                        variant={campaign.type === 'platform' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {campaign.type === 'platform' ? 'Platform' : 'Seller'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(campaign.createdAt)}
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 