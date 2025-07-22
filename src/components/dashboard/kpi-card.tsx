'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface KPICardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  format?: 'number' | 'currency' | 'percentage';
  isLoading?: boolean;
}

/**
 * KPI Card Component
 * 
 * Displays key performance indicators in a card format with optional trend indicators.
 * Supports different value formats (number, currency, percentage) and loading states.
 * 
 * @param title - The title of the KPI metric
 * @param value - The numeric value to display
 * @param subtitle - Optional subtitle text below the value
 * @param icon - Optional icon to display in the header
 * @param trend - Optional trend data showing growth/decline percentage
 * @param format - Format type for the value display (default: 'number')
 * @param isLoading - Whether to show loading skeleton (default: false)
 */
export function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  format = 'number',
  isLoading = false,
}: KPICardProps) {
  /**
   * Formats the value according to the specified format type
   * @param val - The value to format
   * @param fmt - The format type
   * @returns Formatted string representation of the value
   */
  const formatValue = (val: number, fmt: string) => {
    switch (fmt) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(val);
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString('en-US');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[100px] mb-2" />
          <Skeleton className="h-3 w-[80px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value, format)}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 