'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { DashboardHealth } from '@/types/admin-dashboard';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SystemHealthProps {
  health: DashboardHealth | null;
  isLoading?: boolean;
}

/**
 * System Health Component
 *
 * Displays system health metrics, alerts, and status indicators.
 * Shows loading states and handles empty data gracefully.
 *
 * @param health - Dashboard health data or null
 * @param isLoading - Whether to show loading skeleton (default: false)
 */
export function SystemHealth({ health, isLoading = false }: SystemHealthProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (!health) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  /**
   * Returns the appropriate status icon based on health status
   * @param status - Health status string
   * @returns React element with status icon
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  /**
   * Returns the appropriate badge variant based on severity level
   * @param severity - Severity level string
   * @returns Badge variant string
   */
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive' as const;
      case 'medium':
        return 'secondary' as const;
      case 'low':
        return 'outline' as const;
      default:
        return 'secondary' as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(health.status)}
          <span>System Health</span>
          <Badge
            variant={health.status === 'healthy' ? 'default' : 'destructive'}
          >
            {health.status === 'healthy'
              ? 'Healthy'
              : health.status === 'warning'
                ? 'Warning'
                : 'Critical'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* System Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Pending Seller Approvals
            </div>
            <div className="text-2xl font-bold">
              {health.systemHealth.pendingSellerApprovals}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Low Stock Products
            </div>
            <div className="text-2xl font-bold">
              {health.systemHealth.lowStockProducts}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Expired Campaigns
            </div>
            <div className="text-2xl font-bold">
              {health.systemHealth.expiredCampaigns}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">
              Unverified Users
            </div>
            <div className="text-2xl font-bold">
              {health.systemHealth.unverifiedUsers}
            </div>
          </div>
        </div>

        {/* Alerts */}
        {health.alerts.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">System Alerts</h4>
            {health.alerts.map((alert, index) => (
              <Alert key={index} className="border-l-4 border-l-yellow-500">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="flex items-center justify-between">
                  <span>{alert.message}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant={getSeverityVariant(alert.severity)}>
                      {alert.severity === 'high'
                        ? 'High'
                        : alert.severity === 'medium'
                          ? 'Medium'
                          : 'Low'}
                    </Badge>
                    {alert.actionRequired && (
                      <Badge variant="destructive">Action Required</Badge>
                    )}
                  </div>
                </AlertTitle>
                <AlertDescription>
                  {alert.count} items require attention.
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {health.alerts.length === 0 && health.status === 'healthy' && (
          <Alert className="border-l-4 border-l-green-500">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>System Healthy</AlertTitle>
            <AlertDescription>
              All system metrics are within normal ranges. No alerts found.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
