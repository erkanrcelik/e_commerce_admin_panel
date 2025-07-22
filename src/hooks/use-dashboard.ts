'use client';

import { adminDashboardService } from '@/services/admin-dashboard.service';
import type {
    DashboardActivities,
    DashboardCharts,
    DashboardHealth,
    DashboardStats,
} from '@/types/admin-dashboard';
import { useEffect, useState } from 'react';

/**
 * Custom hook for dashboard statistics
 */
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminDashboardService.getStats();
      setStats(data);
    } catch (err) {
      setError(err as Error);
      console.error('Dashboard stats error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
    refetch: fetchStats,
  };
}

/**
 * Custom hook for dashboard activities
 */
export function useDashboardActivities(limit: number = 10) {
  const [activities, setActivities] = useState<DashboardActivities | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminDashboardService.getActivities(limit);
      setActivities(data);
    } catch (err) {
      setError(err as Error);
      console.error('Dashboard activities error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchActivities();
  }, [limit]);

  return {
    activities,
    isLoading,
    error,
    refetch: fetchActivities,
  };
}

/**
 * Custom hook for dashboard charts
 */
export function useDashboardCharts(days: number = 30) {
  const [charts, setCharts] = useState<DashboardCharts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCharts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminDashboardService.getCharts(days);
      setCharts(data);
    } catch (err) {
      setError(err as Error);
      console.error('Dashboard charts error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchCharts();
  }, [days]);

  return {
    charts,
    isLoading,
    error,
    refetch: fetchCharts,
  };
}

/**
 * Custom hook for system health
 */
export function useDashboardHealth() {
  const [health, setHealth] = useState<DashboardHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHealth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminDashboardService.getHealth();
      setHealth(data);
    } catch (err) {
      setError(err as Error);
      console.error('Dashboard health error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchHealth();
  }, []);

  return {
    health,
    isLoading,
    error,
    refetch: fetchHealth,
  };
}

/**
 * Comprehensive dashboard hook that fetches all data
 */
export function useDashboard() {
  const stats = useDashboardStats();
  const activities = useDashboardActivities(5);
  const charts = useDashboardCharts(30);
  const health = useDashboardHealth();

  const isLoading = stats.isLoading || activities.isLoading || charts.isLoading || health.isLoading;
  const hasError = !!(stats.error || activities.error || charts.error || health.error);

  const refetchAll = () => {
    void stats.refetch();
    void activities.refetch();
    void charts.refetch();
    void health.refetch();
  };

  return {
    stats: stats.stats,
    activities: activities.activities,
    charts: charts.charts,
    health: health.health,
    isLoading,
    hasError,
    errors: {
      stats: stats.error,
      activities: activities.error,
      charts: charts.error,
      health: health.error,
    },
    refetch: refetchAll,
  };
} 