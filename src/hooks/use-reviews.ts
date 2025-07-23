import { AdminReviewsService } from '@/services';
import type {
    AdminReview,
    ReviewListQuery,
    ReviewListResponse,
} from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UseReviewsReturn {
  reviews: AdminReview[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: ReviewListQuery;
  setFilters: (filters: ReviewListQuery) => void;
  refreshReviews: () => Promise<void>;
  approveReview: (reviewId: string) => Promise<void>;
  rejectReview: (reviewId: string) => Promise<void>;
}

export const useReviews = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ReviewListQuery>({
    page: 1,
    limit: 10,
    // isApproved gönderilmezse onay bekleyen review'lar gelir
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const loadReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response: ReviewListResponse = await AdminReviewsService.getReviews(filters);

      setReviews(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Review\'lar yüklenirken hata oluştu';
      setError(errorMessage);
      toast.error('Hata', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const refreshReviews = useCallback(async () => {
    await loadReviews();
  }, [loadReviews]);

  const approveReview = useCallback(async (reviewId: string) => {
    try {
      setLoading(true);
      await AdminReviewsService.approveReview(reviewId);
      
      toast.success('Başarılı', {
        description: 'Review başarıyla onaylandı',
      });

      // Refresh reviews
      await refreshReviews();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Review onaylanırken hata oluştu';
      toast.error('Hata', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [refreshReviews]);

  const rejectReview = useCallback(async (reviewId: string) => {
    try {
      setLoading(true);
      await AdminReviewsService.rejectReview(reviewId);
      
      toast.success('Başarılı', {
        description: 'Review başarıyla reddedildi',
      });

      // Refresh reviews
      await refreshReviews();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Review reddedilirken hata oluştu';
      toast.error('Hata', {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, [refreshReviews]);

  useEffect(() => {
    void loadReviews();
  }, [loadReviews]);

  return {
    reviews,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    refreshReviews,
    approveReview,
    rejectReview,
  };
}; 