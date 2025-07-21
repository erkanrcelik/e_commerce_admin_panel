'use client';

import { useEffect, useState } from 'react';

import { CategoryCard } from '@/components/categories/category-card';
import { CategoryForm } from '@/components/categories/category-form';
import { FilterBar } from '@/components/layout/filter-bar';
import { PageHeader } from '@/components/layout/page-header';
import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CategoriesService } from '@/services/categories.service';

import type {
  Category,
  CategoryFilters as CategoryFiltersType,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/types/categories';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<CategoryFiltersType>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [deletingCategory, setDeletingCategory] = useState<Category | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError, showLoading, dismiss } = useToast();

  // Load categories from API
  useEffect(() => {
    void loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const response = await CategoriesService.getCategories({
        page: 1,
        limit: 100, // Get all categories for now
        ...filters,
      });
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (error) {
      console.error('Failed to load categories:', error);
      showError({
        message: 'Failed to load categories',
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter categories
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

    // Sort
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (filters.sortBy) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'createdAt':
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case 'productCount':
            aValue = a.productCount || 0;
            bValue = b.productCount || 0;
            break;
          default:
            return 0;
        }

        if (filters.sortOrder === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    setFilteredCategories(filtered);
  }, [categories, filters]);

  const handleCreateCategory = async (data: CreateCategoryData) => {
    let loadingToastId: string | number | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = showLoading({
        message: 'Creating category...',
        description: 'Please wait while we create your category',
      });

      const newCategory = await CategoriesService.createCategory(data);
      setCategories(prev => [newCategory, ...prev]);

      showSuccess({
        message: 'Category created successfully!',
        description: `"${newCategory.name}" has been added to your categories.`,
      });
    } catch (error) {
      console.error('Failed to create category:', error);
      showError({
        message: 'Failed to create category',
        description: 'Please check your input and try again.',
      });
      throw error;
    } finally {
      setIsSubmitting(false);
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  const handleUpdateCategory = async (data: UpdateCategoryData) => {
    if (!editingCategory) return;

    let loadingToastId: string | number | undefined;

    try {
      setIsSubmitting(true);
      loadingToastId = showLoading({
        message: 'Updating category...',
        description: 'Please wait while we update your category',
      });

      const updatedCategory = await CategoriesService.updateCategory(editingCategory._id, data);
      setCategories(prev =>
        prev.map(cat => (cat._id === editingCategory._id ? updatedCategory : cat))
      );

      showSuccess({
        message: 'Category updated successfully!',
        description: `"${updatedCategory.name}" has been updated.`,
      });
    } catch (error) {
      console.error('Failed to update category:', error);
      showError({
        message: 'Failed to update category',
        description: 'Please check your input and try again.',
      });
      throw error;
    } finally {
      setIsSubmitting(false);
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deletingCategory) return;

    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Deleting category...',
        description: 'Please wait while we delete your category',
      });

      await CategoriesService.deleteCategory(deletingCategory._id);
      setCategories(prev => prev.filter(cat => cat._id !== deletingCategory._id));
      setDeletingCategory(undefined);

      showSuccess({
        message: 'Category deleted successfully!',
        description: `"${deletingCategory.name}" has been removed from your categories.`,
      });
    } catch (error) {
      console.error('Failed to delete category:', error);
      showError({
        message: 'Failed to delete category',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  const handleToggleStatus = async (category: Category) => {
    let loadingToastId: string | number | undefined;

    try {
      loadingToastId = showLoading({
        message: 'Updating status...',
        description: 'Please wait while we update the category status',
      });

      const updatedCategory = await CategoriesService.toggleCategoryStatus(category._id);
      setCategories(prev =>
        prev.map(cat => (cat._id === category._id ? updatedCategory : cat))
      );

      showSuccess({
        message: 'Status updated successfully!',
        description: `"${updatedCategory.name}" is now ${updatedCategory.isActive ? 'active' : 'inactive'}.`,
      });
    } catch (error) {
      console.error('Failed to toggle category status:', error);
      showError({
        message: 'Failed to update status',
        description: 'Please try again later.',
      });
    } finally {
      if (loadingToastId) dismiss(loadingToastId);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const handleFormSubmit = (
    data: CreateCategoryData | UpdateCategoryData
  ): void => {
    if (editingCategory) {
      void handleUpdateCategory(data as UpdateCategoryData);
    } else {
      void handleCreateCategory(data as CreateCategoryData);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCategory(undefined);
  };

  const filterFields = [
    {
      key: 'search',
      label: 'Search',
      type: 'search' as const,
      placeholder: 'Search categories...',
    },
    {
      key: 'isActive',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'active', label: 'Active Only' },
        { value: 'inactive', label: 'Inactive Only' },
      ],
    },
    {
      key: 'sortBy',
      label: 'Sort by',
      type: 'select' as const,
      width: 'w-40',
      options: [
        { value: 'default', label: 'Default' },
        { value: 'name', label: 'Name' },
        { value: 'createdAt', label: 'Date Created' },
        { value: 'productCount', label: 'Product Count' },
      ],
    },
    {
      key: 'sortOrder',
      label: 'Order',
      type: 'select' as const,
      width: 'w-24',
      options: [
        { value: 'desc', label: 'Desc' },
        { value: 'asc', label: 'Asc' },
      ],
    },
  ];

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Admin Panel', href: '/' },
        { label: 'Categories', isCurrent: true },
      ]}
    >
      <PageHeader
        title="Categories"
        description="Manage product categories and their settings"
        actionButton={{
          label: 'Add Category',
          onClick: () => setIsFormOpen(true),
        }}
      />

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        fields={filterFields}
        searchPlaceholder="Search categories..."
      />

      {/* Categories Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map(category => (
            <CategoryCard
              key={category._id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={() => {
                if (category) {
                  void handleToggleStatus(category);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Category Form */}
      <CategoryForm
        category={editingCategory}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={(data) => {
          void handleFormSubmit(data);
        }}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Category</h3>
            <p className="text-muted-foreground mb-4">
              Are you sure you want to delete "{deletingCategory.name}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeletingCategory(undefined)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  void handleDeleteCategory();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
