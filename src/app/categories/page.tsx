'use client';

import { useState } from 'react';

import {
  CategoriesFilters,
  CategoriesGrid,
  CategoriesHeader,
  CategoryDeleteDialog,
  CategoryForm,
} from '@/components/categories';
import { PageLayout } from '@/components/layout/page-layout';
import { useCategories } from '@/hooks/use-categories';
import type {
  AdminCategory,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types/admin-categories';

/**
 * Categories management page for admin panel
 * Handles CRUD operations for product categories with image upload support
 */
export default function CategoriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const {
    categories,
    filters,
    editingCategory,
    deletingCategory,
    isLoading,
    isSubmitting,
    setFilters,
    setEditingCategory,
    setDeletingCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
  } = useCategories();

  /**
   * Open add category form
   */
  const handleAddCategory = () => {
    setIsFormOpen(true);
  };

  /**
   * Open edit form with selected category
   */
  const handleEditCategory = (category: AdminCategory) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  /**
   * Open delete confirmation dialog
   */
  const handleDeleteCategory = (category: AdminCategory) => {
    setDeletingCategory(category);
  };

  /**
   * Close delete confirmation dialog
   */
  const handleCloseDeleteDialog = () => {
    setDeletingCategory(undefined);
  };

  /**
   * Handle form submission for both create and update
   */
  const handleFormSubmit = (
    data: CreateCategoryRequest | UpdateCategoryRequest,
    imageFile?: File,
    shouldRemoveImage?: boolean
  ) => {
    void (async () => {
      try {
        if (editingCategory) {
          await updateCategory(data as UpdateCategoryRequest, imageFile, shouldRemoveImage);
        } else {
          await createCategory(data as CreateCategoryRequest, imageFile);
        }
        handleFormClose();
      } catch (error) {
        // Error handling is done in the hook
        console.error('Form submission error:', error);
      }
    })();
  };

  /**
   * Handle toggle status with void wrapper
   */
  const handleToggleStatus = (category: AdminCategory) => {
    void toggleCategoryStatus(category);
  };

  /**
   * Handle delete confirmation with void wrapper
   */
  const handleConfirmDelete = () => {
    void deleteCategory();
  };

  /**
   * Close form and reset editing state
   */
  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCategory(undefined);
  };

  return (
    <PageLayout
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'Categories', isCurrent: true },
      ]}
    >
      {/* Page Header */}
      <CategoriesHeader onAddCategory={handleAddCategory} />

      {/* Filters */}
      <CategoriesFilters
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Categories Grid */}
      <CategoriesGrid
        categories={categories}
        isLoading={isLoading}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        onToggleStatus={handleToggleStatus}
      />

      {/* Category Form Modal */}
      <CategoryForm
        category={editingCategory}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        isLoading={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <CategoryDeleteDialog
        category={deletingCategory || null}
        isOpen={!!deletingCategory}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        isLoading={isSubmitting}
      />
    </PageLayout>
  );
}
