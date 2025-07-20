'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import type {
  Campaign,
  CampaignScope,
  CampaignType,
  CreateCampaignData,
  DiscountType,
  UpdateCampaignData,
} from '@/types/campaigns';

interface CampaignFormProps {
  campaign?: Campaign;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCampaignData | UpdateCampaignData) => Promise<void>;
  isLoading?: boolean;
}

export function CampaignForm({
  campaign,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CampaignFormProps) {
  const isEditing = !!campaign;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateCampaignData | UpdateCampaignData>();

  const handleFormSubmit = async (
    data: CreateCampaignData | UpdateCampaignData
  ) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to submit campaign:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Campaign' : 'Create Campaign'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => {
          void handleSubmit(handleFormSubmit)(e);
        }} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name</Label>
                  <Input
                    id="name"
                    {...register('name', {
                      required: 'Campaign name is required',
                    })}
                    placeholder="Enter campaign name"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select
                    onValueChange={value => setValue('type', value as CampaignType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount</SelectItem>
                      <SelectItem value="flash_sale">Flash Sale</SelectItem>
                      <SelectItem value="free_shipping">
                        Free Shipping
                      </SelectItem>
                      <SelectItem value="buy_one_get_one">
                        Buy One Get One
                      </SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder="Enter campaign description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scope">Scope</Label>
                  <Select
                    onValueChange={value => setValue('scope', value as CampaignScope)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_products">All Products</SelectItem>
                      <SelectItem value="category">
                        Specific Category
                      </SelectItem>
                      <SelectItem value="specific_products">
                        Specific Products
                      </SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discount Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Discount Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type</Label>
                  <Select
                    onValueChange={value =>
                      setValue('discountType', value as DiscountType)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    {...register('discountValue', {
                      required: 'Discount value is required',
                      min: { value: 0, message: 'Discount must be positive' },
                    })}
                    placeholder="Enter discount value"
                  />
                  {errors.discountValue && (
                    <p className="text-sm text-red-600">
                      {errors.discountValue.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrderAmount">Minimum Order Amount</Label>
                  <Input
                    id="minOrderAmount"
                    type="number"
                    {...register('minOrderAmount', {
                      min: { value: 0, message: 'Amount must be positive' },
                    })}
                    placeholder="Enter minimum amount"
                  />
                  {errors.minOrderAmount && (
                    <p className="text-sm text-red-600">
                      {errors.minOrderAmount.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDiscountAmount">
                    Maximum Discount Amount
                  </Label>
                  <Input
                    id="maxDiscountAmount"
                    type="number"
                    {...register('maxDiscountAmount', {
                      min: { value: 0, message: 'Amount must be positive' },
                    })}
                    placeholder="Enter maximum discount"
                  />
                  {errors.maxDiscountAmount && (
                    <p className="text-sm text-red-600">
                      {errors.maxDiscountAmount.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    {...register('usageLimit', {
                      min: { value: 0, message: 'Limit must be positive' },
                    })}
                    placeholder="Enter usage limit (0 for unlimited)"
                  />
                  {errors.usageLimit && (
                    <p className="text-sm text-red-600">
                      {errors.usageLimit.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Date Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    {...register('startDate', {
                      required: 'Start date is required',
                    })}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-600">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    {...register('endDate', {
                      required: 'End date is required',
                    })}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-600">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Visual Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image">Campaign Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register('image')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bannerColor">Banner Color</Label>
                  <Input
                    id="bannerColor"
                    type="color"
                    {...register('bannerColor')}
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? 'Saving...'
                : isEditing
                  ? 'Update Campaign'
                  : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
