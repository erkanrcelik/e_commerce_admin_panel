import { useToast } from '@/hooks/use-toast';
import { AdminCategoriesService } from '@/services/admin-categories.service';
import type {
  AdminCategory,
  CategoryListQuery,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types/admin-categories';
import { useEffect, useState } from 'react';

/**
 * Custom hook for managing categories state and operations
 * Centralizes all categories-related logic and API calls
 */
export function useCategories() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<AdminCategory[]>(
    []
  );
  const [filters, setFilters] = useState<CategoryListQuery>({});
  const [editingCategory, setEditingCategory] = useState<
    AdminCategory | undefined
  >();
  const [deletingCategory, setDeletingCategory] = useState<
    AdminCategory | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError, showLoading, dismiss } = useToast();

  /**
   * Load categories from API with current filters
   */
  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const response = await AdminCategoriesService.getCategories({
        page: 1,
        limit: 100,
        ...filters,
      });
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch {
      showError({
        message: 'Failed to load categories',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Apply client-side filtering
   */
  useEffect(() => {
    let filtered = [...categories];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        category =>
          category.name.toLowerCase().includes(searchLower) ||
          category.description.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.isActive !== undefined) {
      filtered = filtered.filter(
        category => category.isActive === filters.isActive
      );
    }

    setFilteredCategories(filtered);
  }, [categories, filters]);

  /**
   * Load categories on mount
   */
  useEffect(() => {
    void loadCategories();
  }, []);

  /**
   * Handle category creation with form data and optional image
   */
  const createCategory = async (
    data: CreateCategoryRequest,
    imageFile?: File
  ) => {
    let loadingToastId: string | number | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = showLoading({
        message: 'Creating category...',
        description: 'Please wait while we create your category',
      });

      // Create category first
      const newCategory = await AdminCategoriesService.createCategory(data);

      // Upload image if provided
      if (imageFile) {
        try {
          const imageResponse =
            await AdminCategoriesService.uploadCategoryImage(
              newCategory._id,
              imageFile
            );
          // API has image field
          newCategory.image = imageResponse.imageUrl;
          newCategory.imageUrl = imageResponse.imageUrl; // Backward compatibility
          newCategory.imageKey = imageResponse.imageKey;
        } catch {
          showError({
            message: 'Category created but image upload failed',
            description:
              'You can upload an image later by editing the category.',
          });
        }
      }

      setCategories(prev => [newCategory, ...prev]);

      showSuccess({
        message: 'Category created successfully!',
        description: `"${newCategory.name}" has been added to your categories.`,
      });
    } catch {
      showError({
        message: 'Failed to create category',
        description: 'Please check your input and try again.',
      });
    } finally {
      setIsSubmitting(false);
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Handle category update with form data and optional image
   */
  const updateCategory = async (
    data: UpdateCategoryRequest,
    imageFile?: File,
    shouldRemoveImage?: boolean
  ) => {
    if (!editingCategory) return;

    let loadingToastId: string | number | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = showLoading({
        message: 'Updating category...',
        description: 'Please wait while we update your category',
      });

      // Update category data first
      const updatedCategory = await AdminCategoriesService.updateCategory(
        editingCategory._id,
        data
      );

      // Handle image operations
      if (imageFile) {
        // Upload new image
        try {
          const imageResponse =
            await AdminCategoriesService.uploadCategoryImage(
              updatedCategory._id,
              imageFile
            );
          // API has image field
          updatedCategory.image = imageResponse.imageUrl;
          updatedCategory.imageUrl = imageResponse.imageUrl; // Backward compatibility
          updatedCategory.imageKey = imageResponse.imageKey;
        } catch {
          showError({
            message: 'Category updated but image upload failed',
            description:
              'You can upload an image later by editing the category.',
          });
        }
      } else if (shouldRemoveImage) {
        // Remove existing image
        try {
          await AdminCategoriesService.deleteCategoryImage(updatedCategory._id);
          updatedCategory.image = undefined;
          updatedCategory.imageUrl = undefined;
          updatedCategory.imageKey = undefined;
        } catch {
          showError({
            message: 'Category updated but image removal failed',
            description:
              'You can remove the image later by editing the category.',
          });
        }
      }

      setCategories(prev =>
        prev.map(cat =>
          cat._id === editingCategory._id ? updatedCategory : cat
        )
      );

      showSuccess({
        message: 'Category updated successfully!',
        description: `"${updatedCategory.name}" has been updated.`,
      });

      // Clear editing state
      setEditingCategory(undefined);
    } catch {
      showError({
        message: 'Failed to update category',
        description: 'Please check your input and try again.',
      });
    } finally {
      setIsSubmitting(false);
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Handle category deletion with confirmation
   */
  const deleteCategory = async () => {
    if (!deletingCategory) return;

    let loadingToastId: string | number | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = showLoading({
        message: 'Deleting category...',
        description: 'Please wait while we delete this category',
      });

      await AdminCategoriesService.deleteCategory(deletingCategory._id);

      setCategories(prev =>
        prev.filter(cat => cat._id !== deletingCategory._id)
      );

      showSuccess({
        message: 'Category deleted successfully!',
        description: `"${deletingCategory.name}" has been deleted.`,
      });

      setDeletingCategory(undefined);
    } catch {
      showError({
        message: 'Failed to delete category',
        description: 'This category might be in use. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  /**
   * Handle category status toggle (active/inactive)
   */
  const toggleCategoryStatus = async (category: AdminCategory) => {
    try {
      const updatedCategory = await AdminCategoriesService.toggleCategoryStatus(
        category._id
      );

      setCategories(prev =>
        prev.map(cat => (cat._id === category._id ? updatedCategory : cat))
      );

      showSuccess({
        message: 'Category status updated!',
        description: `"${category.name}" is now ${updatedCategory.isActive ? 'active' : 'inactive'}.`,
      });
    } catch {
      showError({
        message: 'Failed to update category status',
        description: 'Please try again later.',
      });
    }
  };

  /**
   * Get category statistics
   */
  const getCategoryStats = () => {
    const total = categories.length;
    const active = categories.filter(c => c.isActive).length;
    const inactive = total - active;

    return {
      total,
      active,
      inactive,
    };
  };

  return {
    // State
    categories: filteredCategories,
    filters,
    editingCategory,
    deletingCategory,
    isLoading,
    isSubmitting,
    stats: getCategoryStats(),

    // Actions
    setFilters,
    setEditingCategory,
    setDeletingCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    loadCategories,
  };
}
