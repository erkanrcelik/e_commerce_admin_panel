import api from '@/lib/axios';
import type {
    ReviewApprovalResponse,
    ReviewListQuery,
    ReviewListResponse
} from '@/types';

export class AdminReviewsService {
  /**
   * Tüm review'ları listele
   */
  static async getReviews(query: ReviewListQuery = {}): Promise<ReviewListResponse> {
    const params = new URLSearchParams();
    
    // isApproved sadece true olduğunda gönder (false veya undefined ise gönderme)
    if (query.isApproved === true) {
      params.append('isApproved', 'true');
    }
    if (query.rating !== undefined) {
      params.append('rating', query.rating.toString());
    }
    if (query.search) {
      params.append('search', query.search);
    }
    if (query.page) {
      params.append('page', query.page.toString());
    }
    if (query.limit) {
      params.append('limit', query.limit.toString());
    }

    const response = await api.get(`/reviews/admin?${params.toString()}`);
    return response.data;
  }

  /**
   * Review onayla
   */
  static async approveReview(reviewId: string): Promise<ReviewApprovalResponse> {
    const response = await api.put<ReviewApprovalResponse>(`/reviews/admin/${reviewId}/approve`);
    return response.data;
  }

  /**
   * Review reddet
   */
  static async rejectReview(reviewId: string): Promise<ReviewApprovalResponse> {
    const response = await api.put<ReviewApprovalResponse>(`/reviews/admin/${reviewId}/reject`);
    return response.data;
  }
} 