export interface AdminReview {
  _id: string;
  productId: {
    _id: string;
    name: string;
    imageUrls: string[];
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewListQuery {
  isApproved?: boolean;
  rating?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ReviewListResponse {
  data: AdminReview[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReviewApprovalResponse {
  _id: string;
  productId: {
    _id: string;
    name: string;
    imageUrls: string[];
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
} 