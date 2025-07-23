'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PageLayout } from '@/components/layout/page-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AdminCustomersService } from '@/services/admin-customers.service';
import type { AdminCustomer, CustomerOrder } from '@/types/admin-customers';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';

/**
 * Customer detail page
 * Shows comprehensive customer information and order history
 */
export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [customer, setCustomer] = useState<AdminCustomer | null>(null);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Fetch customer details and orders
   */
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        const [customerData, ordersData] = await Promise.all([
          AdminCustomersService.getCustomerById(customerId),
          AdminCustomersService.getCustomerOrders(customerId),
        ]);
        setCustomer(customerData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
        toast.error('Failed to load customer details', {
          description: 'Please try again later.',
        });
        router.push('/users');
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      void fetchCustomerData();
    }
  }, [customerId, router]);

  /**
   * Toggle customer status
   */
  const handleToggleStatus = async () => {
    if (!customer) return;

    try {
      setIsSubmitting(true);
      const updatedCustomer = await AdminCustomersService.toggleCustomerStatus(
        customer._id
      );
      setCustomer(updatedCustomer);

      toast.success('Customer status updated', {
        description: `${updatedCustomer.firstName} ${updatedCustomer.lastName} is now ${updatedCustomer.isActive ? 'active' : 'inactive'}.`,
      });
    } catch (error) {
      console.error('Failed to toggle customer status:', error);
      toast.error('Failed to update customer status', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Delete customer
   */
  const handleDeleteCustomer = async () => {
    if (!customer) return;

    try {
      setIsSubmitting(true);
      await AdminCustomersService.deleteCustomer(customer._id);

      toast.success('Customer deleted', {
        description: `${customer.firstName} ${customer.lastName} has been deleted.`,
      });

      router.push('/users');
    } catch (error) {
      console.error('Failed to delete customer:', error);
      toast.error('Failed to delete customer', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Format currency
   */
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  /**
   * Format date
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get customer avatar
   */
  const getCustomerAvatar = (customer: AdminCustomer) => {
    if (customer.avatar) {
      return customer.avatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.firstName + ' ' + customer.lastName)}&background=0d47a1&color=fff&size=120`;
  };

  /**
   * Get order status badge variant
   */
  const getOrderStatusVariant = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'confirmed':
        return 'outline';
      case 'pending':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (isLoading) {
    return (
      <PageLayout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Customers', href: '/users' },
          { label: 'Loading...', isCurrent: true },
        ]}
      >
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Loading customer details...</p>
        </div>
      </PageLayout>
    );
  }

  if (!customer) {
    return (
      <PageLayout
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Customers', href: '/users' },
          { label: 'Not Found', isCurrent: true },
        ]}
      >
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Customer not found</h3>
          <p className="text-muted-foreground mb-4">
            The customer you're looking for doesn't exist or has been deleted.
          </p>
          <Button onClick={() => router.push('/users')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Customers', href: '/users' },
        {
          label: `${customer.firstName} ${customer.lastName}`,
          isCurrent: true,
        },
      ]}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/users')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              void handleToggleStatus();
            }}
            disabled={isSubmitting}
          >
            {customer.isActive ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              void handleDeleteCustomer();
            }}
            disabled={isSubmitting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Customer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={getCustomerAvatar(customer)}
                    alt={`${customer.firstName} ${customer.lastName}`}
                    fill
                    className="object-cover rounded-full"
                    sizes="96px"
                  />
                </div>
                <h2 className="text-xl font-semibold">
                  {customer.firstName} {customer.lastName}
                </h2>
                <p className="text-muted-foreground">
                  Customer ID: {customer._id}
                </p>
                <Badge
                  variant={customer.isActive ? 'default' : 'secondary'}
                  className="mt-2"
                >
                  {customer.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-medium">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{customer.email}</span>
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Statistics */}
              <div className="space-y-3">
                <h3 className="font-medium">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">
                      {customer.orderCount}
                    </div>
                    <div className="text-xs text-muted-foreground">Orders</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Spent
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Information */}
              <div className="space-y-3">
                <h3 className="font-medium">Account Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since:</span>
                    <span>{formatDate(customer.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last updated:</span>
                    <span>{formatDate(customer.updatedAt)}</span>
                  </div>
                  {customer.lastLoginAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last login:</span>
                      <span>{formatDate(customer.lastLoginAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Addresses and Orders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Addresses */}
          {customer.addresses && customer.addresses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customer.addresses.map((address, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="font-medium">{address.street}</p>
                          <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state} {address.postalCode}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {address.country}
                          </p>
                          {address.isDefault && (
                            <Badge variant="outline" className="mt-1">
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground">
                    This customer hasn't placed any orders yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">
                            Order #{order.orderNumber}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(order.totalAmount)}
                          </p>
                          <Badge variant={getOrderStatusVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div
                            key={item._id}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.productName} x{item.quantity}
                            </span>
                            <span>{formatCurrency(item.total)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
