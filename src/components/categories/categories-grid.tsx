'use client';

import type { AdminCategory } from '@/types/admin-categories';
import { CategoryCard } from './category-card';

interface CategoriesGridProps {
  categories: AdminCategory[];
  isLoading: boolean;
  onEdit: (category: AdminCategory) => void;
  onDelete: (category: AdminCategory) => void;
  onToggleStatus: (category: AdminCategory) => void;
}

/**
 * Grid component for displaying categories
 * Handles loading states, empty states, and category cards
 */
export function CategoriesGrid({
  categories,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: CategoriesGridProps) {
  /**
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground">Loading categories...</p>
      </div>
    );
  }

  /**
   * Empty state
   */
  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">No categories found</h3>
        <p className="text-muted-foreground">
          Get started by creating your first category
        </p>
      </div>
    );
  }

  /**
   * Categories grid
   */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map(category => (
        <CategoryCard
          key={category._id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={() => onToggleStatus(category)}
        />
      ))}
    </div>
  );
} 