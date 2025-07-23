'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
import { useToast } from '@/hooks/use-toast';

import type {
  AdminCategory,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types/admin-categories';
import {
  categoryFormSchema,
  type CategoryFormData,
} from '@/types/category-form';

interface CategoryFormProps {
  category?: AdminCategory;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateCategoryRequest | UpdateCategoryRequest,
    imageFile?: File,
    shouldRemoveImage?: boolean
  ) => void;
  isLoading?: boolean;
}

/**
 * Category form component for creating and editing categories
 * Supports image upload with preview functionality and Zod validation
 */
export function CategoryForm({
  category,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: CategoryFormProps) {
  const isEditing = !!category;
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [shouldRemoveExistingImage, setShouldRemoveExistingImage] =
    useState(false);
  const { showError } = useToast();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      description: '',
      isActive: true,
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
   * Get the current image URL from category (API has image field)
   */
  const getCategoryImageUrl = () => {
    return category?.image || category?.imageUrl || null;
  };

  /**
   * Reset form and populate with category data when editing
   */
  useEffect(() => {
    if (isOpen) {
      if (category) {
        // Populate form with existing category data
        reset({
          name: category.name,
          description: category.description,
          isActive: category.isActive,
        });
        // Show existing image if available
        setSelectedImageFile(null);
        setImagePreview(getCategoryImageUrl());
        setShouldRemoveExistingImage(false);
      } else {
        // Reset form for new category
        reset({
          name: '',
          description: '',
          isActive: true,
        });
        setSelectedImageFile(null);
        setImagePreview(null);
        setShouldRemoveExistingImage(false);
      }
    }
  }, [isOpen, category, reset]);

  /**
   * Handle image file selection and preview generation
   */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showError({
          message: 'Invalid file type',
          description: 'Please select a valid image file (JPG, PNG, GIF)',
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showError({
          message: 'File too large',
          description: 'Image size should be less than 5MB',
        });
        return;
      }

      setSelectedImageFile(file);
      setShouldRemoveExistingImage(false); // Reset removal flag when new image selected

      // Generate preview
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handle form submission with image file
   */
  const handleFormSubmit = (data: CategoryFormData) => {
    try {
      // Pass image file or removal flag
      let imageFileToSubmit: File | undefined = undefined;
      let shouldRemoveImage = false;

      if (selectedImageFile) {
        // New image selected
        imageFileToSubmit = selectedImageFile;
      } else if (shouldRemoveExistingImage) {
        // Existing image should be removed
        shouldRemoveImage = true;
      }

      onSubmit(data, imageFileToSubmit, shouldRemoveImage);
      handleClose();
    } catch (error) {
      console.error('Failed to submit category:', error);
    }
  };

  /**
   * Reset form and close dialog
   */
  const handleClose = () => {
    reset();
    setSelectedImageFile(null);
    setImagePreview(null);
    setShouldRemoveExistingImage(false);
    onClose();
  };

  /**
   * Clear selected image
   */
  const clearImage = () => {
    setSelectedImageFile(null);
    setImagePreview(getCategoryImageUrl()); // Show existing image if available
    setShouldRemoveExistingImage(false);
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  /**
   * Remove existing image (for editing)
   */
  const removeExistingImage = () => {
    setImagePreview(null);
    setSelectedImageFile(null);
    setShouldRemoveExistingImage(true);
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  /**
   * Get current image URL for preview
   */
  const getCurrentImageUrl = () => {
    // If existing image should be removed, don't show it
    if (shouldRemoveExistingImage) return null;
    // Show selected new image preview or existing image
    if (imagePreview) return imagePreview;
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Edit Category' : 'Create Category'}
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
              <CardTitle>Category Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name *</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter category name"
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
                  placeholder="Enter category description"
                  rows={3}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="isActive">Status *</Label>
                <Select
                  value={watch('isActive') ? 'active' : 'inactive'}
                  onValueChange={value =>
                    setValue('isActive', value === 'active')
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {errors.isActive && (
                  <p className="text-sm text-red-600">
                    {errors.isActive.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Category Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: JPG, PNG, GIF. Maximum size: 5MB
                </p>

                {/* Show message if existing image will be removed */}
                {shouldRemoveExistingImage && getCategoryImageUrl() && (
                  <div className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive font-medium">
                      Current image will be removed
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      The category will have no image after saving. You can add
                      a new image by selecting a file above.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShouldRemoveExistingImage(false);
                        setImagePreview(getCategoryImageUrl());
                      }}
                      className="text-xs mt-2"
                    >
                      Keep Current Image
                    </Button>
                  </div>
                )}

                {/* Image Preview */}
                {getCurrentImageUrl() && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label>Preview</Label>
                      <div className="flex gap-2">
                        {/* Show different buttons based on image source */}
                        {selectedImageFile ? (
                          // New image selected
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={clearImage}
                            className="text-xs"
                          >
                            Remove New Image
                          </Button>
                        ) : getCategoryImageUrl() &&
                          imagePreview === getCategoryImageUrl() &&
                          !shouldRemoveExistingImage ? (
                          // Existing image from category (not marked for removal)
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeExistingImage}
                            className="text-xs text-destructive"
                          >
                            Remove Current Image
                          </Button>
                        ) : null}
                      </div>
                    </div>
                    <div className="relative w-full h-48 border rounded-lg overflow-hidden">
                      <Image
                        src={getCurrentImageUrl()!}
                        alt="Category preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {/* Show image source info */}
                    <p className="text-xs text-muted-foreground mt-2">
                      {selectedImageFile
                        ? `New image: ${selectedImageFile.name}`
                        : getCategoryImageUrl() &&
                            imagePreview === getCategoryImageUrl()
                          ? 'Current category image'
                          : 'Image preview'}
                    </p>
                  </div>
                )}
              </div>
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
                  ? 'Update Category'
                  : 'Create Category'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
