'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { ImageUpload } from '@/components/ui/image-upload';
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
import { X } from 'lucide-react';

import { AdminCategoriesService } from '@/services/admin-categories.service';
import type {
    AdminCampaign,
    CampaignCategory,
    CreatePlatformCampaignRequest,
    DiscountType,
    UpdateCampaignRequest,
} from '@/types/admin-campaigns';
import type { AdminCategory } from '@/types/admin-categories';
import {
    campaignFormSchema,
    type CampaignFormData,
} from '@/types/campaign-form';

interface CampaignFormProps {
  campaign?: AdminCampaign;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreatePlatformCampaignRequest | UpdateCampaignRequest
  ) => void;
  isLoading?: boolean;
}

/**
 * Campaign form component for creating and editing campaigns
 * Supports platform campaign creation and updates with Zod validation
 */
export function CampaignForm({
  campaign,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CampaignFormProps) {
  const isEditing = !!campaign;
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    CampaignCategory[]
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      discountType: 'percentage',
      discountValue: 0,
      startDate: '',
      endDate: '',
      productIds: [],
      categoryIds: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = form;

  /**
   * Load categories from API
   */
  const loadCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const response = await AdminCategoriesService.getCategories({
        page: 1,
        limit: 100,
        isActive: true, // Only active categories
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories:', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  /**
   * Handle category selection
   */
  const handleCategorySelect = (categoryId: string) => {
    const category = categories.find(c => c._id === categoryId);
    if (category && !selectedCategories.find(c => c._id === categoryId)) {
      const campaignCategory: CampaignCategory = {
        _id: category._id,
        name: category.name,
        productCount: 0, // Will be populated by API
      };
      setSelectedCategories(prev => [...prev, campaignCategory]);
    }
  };

  /**
   * Handle category removal
   */
  const handleCategoryRemove = (categoryId: string) => {
    setSelectedCategories(prev => prev.filter(c => c._id !== categoryId));
  };

  /**
   * Reset form and populate with campaign data when editing
   */
  useEffect(() => {
    if (isOpen) {
      // Load categories when form opens
      void loadCategories();

      if (campaign) {
        // Populate form with existing campaign data
        reset({
          name: campaign.name,
          description: campaign.description,
          imageUrl: campaign.imageUrl || '',
          discountType: campaign.discountType,
          discountValue: campaign.discountValue,
          startDate: campaign.startDate ? campaign.startDate.split('T')[0] : '',
          endDate: campaign.endDate ? campaign.endDate.split('T')[0] : '',
          productIds: campaign.products?.map(p => p._id) || [],
          categoryIds: campaign.categories?.map(c => c._id) || [],
        });

        // Set selected categories for editing
        if (campaign.categories) {
          setSelectedCategories(campaign.categories);
        }
      } else {
        // Reset form for new campaign
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);

        reset({
          name: '',
          description: '',
          imageUrl: '',
          discountType: 'percentage',
          discountValue: 0,
          startDate: tomorrow.toISOString().split('T')[0],
          endDate: nextWeek.toISOString().split('T')[0],
          productIds: [],
          categoryIds: [],
        });
        setSelectedCategories([]);
      }
    }
  }, [isOpen, campaign, reset]);

  /**
   * Handle form submission
   */
  const handleFormSubmit = (data: CampaignFormData) => {
    try {
      // Convert dates to ISO strings and add selected category IDs
      const formData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        categoryIds: selectedCategories.map(c => c._id), // Use selected categories
      };

      onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Failed to submit campaign:', error);
    }
  };

  /**
   * Reset form and close dialog
   */
  const handleClose = () => {
    reset();
    setSelectedCategories([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Campaign' : 'Create Platform Campaign'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={e => {
            e.preventDefault();
            void handleSubmit(handleFormSubmit)(e);
          }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter campaign name"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Enter campaign description"
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <ImageUpload
                label="Campaign Image"
                value={watch('imageUrl')}
                onChange={(value) => setValue('imageUrl', value)}
                maxSize={5}
                accept="image/*"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type *</Label>
                  <Select
                    value={watch('discountType')}
                    onValueChange={(value: DiscountType) =>
                      setValue('discountType', value, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      className={errors.discountType ? 'border-red-500' : ''}
                    >
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="amount">Fixed Amount (₺)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.discountType && (
                    <p className="text-sm text-red-600">
                      {errors.discountType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountValue">Discount Value *</Label>
                  <Input
                    id="discountValue"
                    type="number"
                    step="0.01"
                    min="0"
                    max={
                      watch('discountType') === 'percentage' ? '100' : undefined
                    }
                    {...register('discountValue', { valueAsNumber: true })}
                    placeholder={
                      watch('discountType') === 'percentage'
                        ? '0-100'
                        : 'Amount in ₺'
                    }
                    className={errors.discountValue ? 'border-red-500' : ''}
                  />
                  {errors.discountValue && (
                    <p className="text-sm text-red-600">
                      {errors.discountValue.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register('startDate')}
                    className={errors.startDate ? 'border-red-500' : ''}
                  />
                  {errors.startDate && (
                    <p className="text-sm text-red-600">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register('endDate')}
                    className={errors.endDate ? 'border-red-500' : ''}
                  />
                  {errors.endDate && (
                    <p className="text-sm text-red-600">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categorySelect">Categories</Label>
                <Select
                  value=""
                  onValueChange={handleCategorySelect}
                  disabled={isLoadingCategories}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        isLoadingCategories
                          ? 'Loading categories...'
                          : 'Select categories'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Select categories to apply the campaign to specific product
                  categories. Leave empty to apply to all products.
                </p>
              </div>

              {/* Selected Categories Display */}
              {selectedCategories.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map(category => (
                      <Badge
                        key={category._id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category.name}
                        <button
                          type="button"
                          onClick={() => handleCategoryRemove(category._id)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

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
