'use client';

import {
  KPICard,
  RecentActivities,
  SystemHealth,
} from '@/components/dashboard';
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
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useDashboard } from '@/hooks/use-dashboard';
import {
  Package,
  ShoppingCart,
  Star,
  Tag,
  TrendingUp,
  Users,
} from 'lucide-react';

/**
 * Dashboard Page Component
 *
 * Main dashboard page displaying key performance indicators, recent activities,
 * system health, and top categories. Uses purple and blue color scheme.
 *
 * Features:
 * - KPI cards showing users, orders, revenue, and products
 * - Secondary metrics for customers, sellers, campaigns, and ratings
 * - Recent activities feed
 * - System health monitoring
 * - Top categories overview
 * - Error handling and loading states
 */
export default function Home() {
  const { stats, activities, health, isLoading, hasError, refetch } =
    useDashboard();

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

  /**
   * Calculates growth percentage between current and previous values
   * @param current - Current value
   * @param previous - Previous value
   * @returns Growth percentage rounded to nearest integer
   */
  const calculateGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
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
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-4">
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Users"
              value={stats?.users.total || 0}
              subtitle={`This month +${stats?.users.newThisMonth || 0} new registrations`}
              icon={<Users className="h-4 w-4" />}
              trend={{
                value: calculateGrowthPercentage(
                  stats?.users.newThisMonth || 0,
                  50
                ),
                isPositive: (stats?.users.newThisMonth || 0) > 50,
              }}
              isLoading={isLoading}
            />

            <KPICard
              title="Total Orders"
              value={stats?.orders.total || 0}
              subtitle={`Today ${stats?.orders.todayOrders || 0} orders`}
              icon={<ShoppingCart className="h-4 w-4" />}
              trend={{
                value: calculateGrowthPercentage(
                  stats?.orders.thisMonthOrders || 0,
                  400
                ),
                isPositive: (stats?.orders.thisMonthOrders || 0) > 400,
              }}
              isLoading={isLoading}
            />

            <KPICard
              title="Total Revenue"
              value={stats?.orders.totalRevenue || 0}
              subtitle={`This month ${formatCurrency(stats?.orders.thisMonthRevenue || 0)}`}
              icon={<TrendingUp className="h-4 w-4" />}
              format="currency"
              trend={{
                value: calculateGrowthPercentage(
                  stats?.orders.thisMonthRevenue || 0,
                  40000
                ),
                isPositive: (stats?.orders.thisMonthRevenue || 0) > 40000,
              }}
              isLoading={isLoading}
            />

            <KPICard
              title="Active Products"
              value={stats?.products.active || 0}
              subtitle={`${stats?.products.total || 0} total products`}
              icon={<Package className="h-4 w-4" />}
              trend={{
                value: calculateGrowthPercentage(
                  stats?.products.newThisMonth || 0,
                  200
                ),
                isPositive: (stats?.products.newThisMonth || 0) > 200,
              }}
              isLoading={isLoading}
            />
          </div>

          {/* Secondary KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Customers"
              value={stats?.users.customers || 0}
              subtitle={`Today ${stats?.users.activeToday || 0} active`}
              icon={<Users className="h-4 w-4" />}
              isLoading={isLoading}
            />

            <KPICard
              title="Sellers"
              value={stats?.users.sellers || 0}
              subtitle="Approved sellers"
              icon={<Users className="h-4 w-4" />}
              isLoading={isLoading}
            />

            <KPICard
              title="Active Campaigns"
              value={stats?.campaigns.active || 0}
              subtitle={`${stats?.campaigns.expiringSoon || 0} expiring soon`}
              icon={<Tag className="h-4 w-4" />}
              isLoading={isLoading}
            />

            <KPICard
              title="Average Rating"
              value={stats?.reviews.averageRating || 0}
              subtitle={`${stats?.reviews.total || 0} total reviews`}
              icon={<Star className="h-4 w-4" />}
              format="percentage"
              isLoading={isLoading}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activities */}
            <RecentActivities activities={activities} isLoading={isLoading} />

            {/* System Health */}
            <SystemHealth health={health} isLoading={isLoading} />
          </div>

          {/* Top Categories */}
          {stats?.products.topCategories &&
            stats.products.topCategories.length > 0 && (
              <div className="bg-card rounded-xl border p-6">
                <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.products.topCategories
                    .slice(0, 3)
                    .map((category, index) => (
                      <div
                        key={category.categoryId}
                        className="p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">
                            {category.categoryName}
                          </h4>
                          <span className="text-sm text-muted-foreground">
                            #{index + 1}
                          </span>
                        </div>
                        <p className="text-2xl font-bold">
                          {category.productCount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          products
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

          {/* Error State */}
          {hasError && !isLoading && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
              <p className="text-destructive font-medium mb-2">
                Error loading data
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                There was a problem loading the dashboard data. Please try
                again.
              </p>
              <Button variant="outline" onClick={refetch}>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
