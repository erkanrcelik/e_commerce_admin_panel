'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { AdminCampaign } from '@/types/admin-campaigns';
import { Calendar, Edit, Eye, EyeOff, Target, Trash2, TrendingUp } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: AdminCampaign[];
  isLoading: boolean;
  onEdit: (campaign: AdminCampaign) => void;
  onDelete: (campaign: AdminCampaign) => void;
  onToggleStatus: (campaign: AdminCampaign) => void;
}

/**
 * Table component for displaying campaigns
 * Handles loading states, empty states, and campaign rows
 */
export function CampaignsTable({
  campaigns,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: CampaignsTableProps) {
  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /**
   * Get status badge variant
   */
  const getStatusVariant = (isActive: boolean) => {
    return isActive ? 'default' : 'secondary';
  };

  /**
   * Get campaign type badge variant
   */
  const getTypeVariant = (type: string) => {
    return type === 'platform' ? 'default' : 'outline';
  };

  /**
   * Format discount value for display
   */
  const formatDiscount = (type: string, value: number) => {
    return type === 'percentage' ? `${value}%` : `₺${value}`;
  };

  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading campaigns...</p>
      </div>
    );
  }

  /**
   * Empty state
   */
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">No campaigns found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first campaign
        </p>
      </div>
    );
  }

  /**
   * Campaigns table
   */
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {campaigns.map(campaign => (
            <TableRow key={campaign._id}>
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {campaign.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getTypeVariant(campaign.type)}>
                  {campaign.type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">
                    {formatDiscount(campaign.discountType, campaign.discountValue)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(campaign.isActive)}>
                  {campaign.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onToggleStatus(campaign)}
                    className="h-8 w-8 p-0"
                    title={campaign.isActive ? 'Deactivate campaign' : 'Activate campaign'}
                  >
                    {campaign.isActive ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(campaign)}
                    className="h-8 w-8 p-0"
                    title="Edit campaign"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(campaign)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    title="Delete campaign"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 