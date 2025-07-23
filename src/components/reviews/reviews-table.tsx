import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AdminReview } from '@/types';
import { Check, CheckCircle, Clock, MessageSquare, Star, X } from 'lucide-react';
import { useState } from 'react';

interface ReviewsTableProps {
  reviews: AdminReview[];
  onApprove: (reviewId: string) => Promise<void>;
  onReject: (reviewId: string) => Promise<void>;
  loading?: boolean;
}

export function ReviewsTable({ reviews, onApprove, onReject, loading }: ReviewsTableProps) {
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const handleAction = async () => {
    if (!selectedReview || !actionType) return;

    try {
      if (actionType === 'approve') {
        await onApprove(selectedReview._id);
      } else {
        await onReject(selectedReview._id);
      }
    } finally {
      setSelectedReview(null);
      setActionType(null);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getStatusBadge = (isApproved: boolean) => {
    if (isApproved) {
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          Onaylandı
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
        <Clock className="h-3 w-3 mr-1" />
        Onay Bekliyor
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Geçersiz tarih';
      }
      return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Geçersiz tarih';
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Yorum Bulunamadı</h3>
        <p className="text-gray-500">Seçilen kriterlere uygun yorum bulunamadı.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ürün
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Puan
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yorum
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarFallback>
                          {(() => {
                            const firstName = review.userId?.firstName;
                            const lastName = review.userId?.lastName;
                            return `${firstName?.[0] || 'U'}${lastName?.[0] || 'S'}`;
                          })()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {(() => {
                            if (!review.userId) return 'Kullanıcı Bilgisi Yok';
                            const firstName = review.userId.firstName || '';
                            const lastName = review.userId.lastName || '';
                            return `${firstName} ${lastName}`.trim() || 'Kullanıcı Bilgisi Yok';
                          })()}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {review.userId?._id || 'ID yok'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="min-w-0">
                      <div className="text-sm text-gray-900 truncate max-w-[150px]">
                        {(() => {
                          if (!review.productId) return 'Ürün adı bulunamadı';
                          return review.productId.name || 'Ürün adı bulunamadı';
                        })()}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[150px]">
                        {review.productId?._id || 'Ürün ID yok'}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-900">
                        {review.rating}/5
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 max-w-[200px] truncate">
                      {review.comment || 'Yorum metni yok'}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(review.isApproved)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-1">
                      {!review.isApproved && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50 text-xs"
                            onClick={() => {
                              setSelectedReview(review);
                              setActionType('approve');
                            }}
                            disabled={loading}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Onayla
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50 text-xs"
                            onClick={() => {
                              setSelectedReview(review);
                              setActionType('reject');
                            }}
                            disabled={loading}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Reddet
                          </Button>
                        </>
                      )}
                      {review.isApproved && (
                        <span className="text-xs text-gray-500">Onaylandı</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'approve' ? 'Yorumu Onayla' : 'Yorumu Reddet'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === 'approve'
                ? 'Bu yorumu onaylamak istediğinizden emin misiniz? Onaylanan yorumlar müşteriler tarafından görülebilir.'
                : 'Bu yorumu reddetmek istediğinizden emin misiniz? Reddedilen yorumlar müşteriler tarafından görülemez.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              void handleAction();
            }}>
              {actionType === 'approve' ? 'Onayla' : 'Reddet'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
} 