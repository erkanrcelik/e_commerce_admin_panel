'use client';

import { PageLayout } from '@/components/layout';
import { ReviewsFilters, ReviewsHeader, ReviewsTable } from '@/components/reviews';
import { useReviews } from '@/hooks/use-reviews';

export default function ReviewsPage() {
  const {
    reviews,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    approveReview,
    rejectReview,
  } = useReviews();

  return (
    <PageLayout>
      <div className="space-y-6">
        <ReviewsHeader />
        
        <ReviewsFilters
          filters={filters}
          onFiltersChange={setFilters}
          loading={loading}
        />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}
        
        <ReviewsTable
          reviews={reviews}
          onApprove={approveReview}
          onReject={rejectReview}
          loading={loading}
        />
        
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-lg border p-4">
            <div className="text-sm text-gray-700">
              Toplam {pagination.total} yorum, sayfa {pagination.page} / {pagination.totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilters({ ...filters, page: pagination.page - 1 })}
                disabled={pagination.page <= 1 || loading}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Önceki
              </button>
              <button
                onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
                disabled={pagination.page >= pagination.totalPages || loading}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sonraki
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
} 