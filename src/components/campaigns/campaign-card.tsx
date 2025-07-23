'use client';

import { Calendar, Edit, MoreVertical, Tag, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type {
    AdminCampaign,
    CampaignStatus,
    CampaignType,
} from '@/types/admin-campaigns';

interface CampaignCardProps {
  campaign: AdminCampaign;
  onEdit: (campaign: AdminCampaign) => void;
  onDelete: (campaign: AdminCampaign) => void;
  onStatusChange: (campaign: AdminCampaign, status: string) => void;
}

const statusColors: Record<CampaignStatus, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  expired: 'bg-red-100 text-red-800',
  scheduled: 'bg-blue-100 text-blue-800',
};

const typeColors: Record<CampaignType, string> = {
  platform: 'bg-purple-100 text-purple-800',
  seller: 'bg-orange-100 text-orange-800',
};

export function CampaignCard({
  campaign,
  onEdit,
  onDelete,
  onStatusChange,
}: CampaignCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    }).format(amount);
  };

  const getDiscountText = () => {
    if (campaign.discountType === 'percentage') {
      return `${campaign.discountValue}% Discount`;
    } else {
      return `${formatCurrency(campaign.discountValue)} Discount`;
    }
  };

  const getScopeText = () => {
    if (campaign.products && campaign.products.length > 0) {
      return `${campaign.products.length} Products`;
    } else if (campaign.categories && campaign.categories.length > 0) {
      return `${campaign.categories.length} Categories`;
    }
    return 'All Products';
  };

  const getCampaignTypeText = () => {
    if (campaign.type === 'platform') {
      return 'Platform Campaign';
    }
    return 'Seller Campaign';
  };

  const isActive = campaign.status === 'active';
  const isExpired = campaign.status === 'expired';
  const isScheduled = campaign.status === 'scheduled';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
              {campaign.imageUrl ? (
                <Image
                  src={campaign.imageUrl}
                  alt={campaign.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Tag className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{campaign.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {campaign.description}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(campaign)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(campaign)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Campaign
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status and Type */}
          <div className="flex items-center gap-2">
            <Badge className={statusColors[campaign.status]}>
              {campaign.status}
            </Badge>
            <Badge className={typeColors[campaign.type]}>
              {getCampaignTypeText()}
            </Badge>
            <Badge variant="outline">{getScopeText()}</Badge>
          </div>

          {/* Discount Info */}
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{getDiscountText()}</span>
          </div>

          {/* Date Range */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDate(campaign.startDate)} -{' '}
                {formatDate(campaign.endDate)}
              </span>
            </div>
          </div>

          {/* Product/Category Info */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {campaign.products?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {campaign.categories?.length || 0}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(campaign)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>

          {/* Status Actions */}
          {!isExpired && (
            <div className="flex gap-2">
              {isActive ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(campaign, 'inactive')}
                  className="flex-1"
                >
                  Pause
                </Button>
              ) : isScheduled ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(campaign, 'active')}
                  className="flex-1"
                >
                  Activate
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(campaign, 'active')}
                  className="flex-1"
                >
                  Activate
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
