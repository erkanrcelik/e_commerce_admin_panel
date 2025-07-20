'use client';

import { useEffect, useState } from 'react';

import { CategoryCard } from '@/components/categories/category-card';
import { CategoryForm } from '@/components/categories/category-form';
import { FilterBar } from '@/components/layout/filter-bar';
import { PageHeader } from '@/components/layout/page-header';
import { PageLayout } from '@/components/layout/page-layout';
import { Button } from '@/components/ui/button';

import type {
  Category,
  CategoryFilters as CategoryFiltersType,
  CreateCategoryData,
  UpdateCategoryData,
} from '@/types/categories';

// Mock data for development
const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description:
      'Latest electronic devices and gadgets including smartphones, laptops, tablets, and accessories.',
    image:
      'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    productCount: 1250,
  },
  {
    id: '2',
    name: 'Clothing',
    description:
      'Fashion and apparel for men, women, and children including casual, formal, and sportswear.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-14T09:00:00Z',
    updatedAt: '2024-01-14T09:00:00Z',
    productCount: 890,
  },
  {
    id: '3',
    name: 'Home and Garden',
    description:
      'Everything for your home and garden including furniture, decor, tools, and outdoor equipment.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-13T08:00:00Z',
    updatedAt: '2024-01-13T08:00:00Z',
    productCount: 567,
  },
  {
    id: '4',
    name: 'Sports',
    description:
      'Sports equipment, athletic wear, and fitness gear for all types of sports and activities.',
    image:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-12T07:00:00Z',
    updatedAt: '2024-01-12T07:00:00Z',
    productCount: 423,
  },
  {
    id: '5',
    name: 'Books',
    description:
      "Books across all genres including fiction, non-fiction, academic, and children's literature.",
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-11T06:00:00Z',
    updatedAt: '2024-01-11T06:00:00Z',
    productCount: 2340,
  },
  {
    id: '6',
    name: 'Health and Beauty',
    description:
      'Health products, beauty supplies, skincare, makeup, and personal care items.',
    image:
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-10T05:00:00Z',
    updatedAt: '2024-01-10T05:00:00Z',
    productCount: 678,
  },
  {
    id: '7',
    name: 'Toys',
    description:
      'Toys and games for children of all ages including educational, outdoor, and electronic toys.',
    image:
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
    isActive: false,
    createdAt: '2024-01-09T04:00:00Z',
    updatedAt: '2024-01-09T04:00:00Z',
    productCount: 345,
  },
  {
    id: '8',
    name: 'Food',
    description:
      'Food and beverages including groceries, snacks, drinks, and specialty food items.',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    isActive: true,
    createdAt: '2024-01-08T03:00:00Z',
    updatedAt: '2024-01-08T03:00:00Z',
    productCount: 1567,
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [filteredCategories, setFilteredCategories] =
    useState<Category[]>(mockCategories);
  const [filters, setFilters] = useState<CategoryFiltersType>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<
    Category | undefined
  >();
  const [deletingCategory, setDeletingCategory] = useState<
    Category | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleCreateCategory = (data: CreateCategoryData) => {
    try {
      setIsSubmitting(true);
      // In real app: await CategoriesService.createCategory(data)
      const newCategory: Category = {
        id: Date.now().toString(),
        ...data,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        productCount: 0,
      };
      setCategories(prev => [newCategory, ...prev]);
    } catch (error) {
      console.error('Failed to create category:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = (data: UpdateCategoryData) => {
    if (!editingCategory) return;

    try {
      setIsSubmitting(true);
      // In real app: await CategoriesService.updateCategory(editingCategory.id, data)
      const updatedCategory: Category = {
        ...editingCategory,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      setCategories(prev =>
        prev.map(cat => (cat.id === editingCategory.id ? updatedCategory : cat))
      );
    } catch (error) {
      console.error('Failed to update category:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = () => {
    if (!deletingCategory) return;

    try {
      // In real app: await CategoriesService.deleteCategory(deletingCategory.id)
      setCategories(prev => prev.filter(cat => cat.id !== deletingCategory.id));
      setDeletingCategory(undefined);
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  const handleToggleStatus = (category: Category) => {
    try {
      // In real app: await CategoriesService.toggleCategoryStatus(category.id)
      const updatedCategory: Category = {
        ...category,
        isActive: !category.isActive,
        updatedAt: new Date().toISOString(),
      };
      setCategories(prev =>
        prev.map(cat => (cat.id === category.id ? updatedCategory : cat))
      );
    } catch (error) {
      console.error('Failed to toggle category status:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setDeletingCategory(category);
  };

  const handleFormSubmit = async (
    data: CreateCategoryData | UpdateCategoryData
  ) => {
    if (editingCategory) {
      handleUpdateCategory(data as UpdateCategoryData);
    } else {
      handleCreateCategory(data as CreateCategoryData);
    }
    return Promise.resolve();
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
      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {/* Category Form */}
      <CategoryForm
        category={editingCategory}
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
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
              <Button variant="destructive" onClick={handleDeleteCategory}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
