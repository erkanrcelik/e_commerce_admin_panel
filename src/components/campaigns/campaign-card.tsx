'use client';

import {
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Calendar,
  Tag,
  Copy,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Campaign } from '@/types/campaigns';

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onDelete: (campaign: Campaign) => void;
  onViewDetails: (campaign: Campaign) => void;
  onDuplicate: (campaign: Campaign) => void;
  onStatusChange: (campaign: Campaign, status: string) => void;
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  paused: 'bg-yellow-100 text-yellow-800',
  ended: 'bg-red-100 text-red-800',
  scheduled: 'bg-blue-100 text-blue-800',
};

const typeColors = {
  discount: 'bg-purple-100 text-purple-800',
  free_shipping: 'bg-blue-100 text-blue-800',
  buy_one_get_one: 'bg-orange-100 text-orange-800',
  flash_sale: 'bg-red-100 text-red-800',
  seasonal: 'bg-green-100 text-green-800',
};

const scopeColors = {
  all_products: 'bg-indigo-100 text-indigo-800',
  category: 'bg-pink-100 text-pink-800',
  specific_products: 'bg-teal-100 text-teal-800',
  vendor: 'bg-amber-100 text-amber-800',
};

export function CampaignCard({
  campaign,
  onEdit,
  onDelete,
  onViewDetails,
  onDuplicate,
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
      return `%${campaign.discountValue} İndirim`;
    } else {
      return `${formatCurrency(campaign.discountValue)} İndirim`;
    }
  };

  const getScopeText = () => {
    switch (campaign.scope) {
      case 'all_products':
        return 'Tüm Ürünler';
      case 'category':
        return 'Kategori';
      case 'specific_products':
        return 'Belirli Ürünler';
      case 'vendor':
        return 'Satıcı';
      default:
        return campaign.scope;
    }
  };

  const getTypeText = () => {
    switch (campaign.type) {
      case 'discount':
        return 'İndirim';
      case 'free_shipping':
        return 'Ücretsiz Kargo';
      case 'buy_one_get_one':
        return '1 Al 1 Bedava';
      case 'flash_sale':
        return 'Flash Satış';
      case 'seasonal':
        return 'Sezonluk';
      default:
        return campaign.type;
    }
  };

  const isActive = campaign.status === 'active';
  const isEnded = campaign.status === 'ended';
  const isScheduled = campaign.status === 'scheduled';

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              {campaign.image ? (
                <Image
                  src={campaign.image}
                  alt={campaign.name}
                  fill
                  className="object-cover rounded-lg"
                />
              ) : (
                <Tag className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{campaign.name}</h3>
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
              <DropdownMenuItem onClick={() => onViewDetails(campaign)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(campaign)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(campaign)}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(campaign)}
                className="text-destructive"
              >
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
            <Badge className={typeColors[campaign.type]}>{getTypeText()}</Badge>
            <Badge className={scopeColors[campaign.scope]}>
              {getScopeText()}
            </Badge>
          </div>

          {/* Discount Info */}
          <div className="flex items-center gap-2 text-sm">
            <Tag className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{getDiscountText()}</span>
            {campaign.minOrderAmount && (
              <span className="text-muted-foreground">
                • Min {formatCurrency(campaign.minOrderAmount)}
              </span>
            )}
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
            {campaign.usageLimit && (
              <div className="text-sm text-muted-foreground">
                Kullanım: {campaign.usedCount}/{campaign.usageLimit}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {campaign.totalOrders}
              </div>
              <div className="text-xs text-muted-foreground">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {formatCurrency(campaign.totalRevenue)}
              </div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {formatCurrency(campaign.averageOrderValue)}
              </div>
              <div className="text-xs text-muted-foreground">Avg Order</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(campaign)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
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
          {!isEnded && (
            <div className="flex gap-2">
              {isActive ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onStatusChange(campaign, 'paused')}
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
