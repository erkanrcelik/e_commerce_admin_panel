'use client';

import { PageHeader } from '@/components/layout/page-header';

interface CategoriesHeaderProps {
  onAddCategory: () => void;
}

/**
 * Header component for categories page
 * Contains title, description and add category action button
 */
export function CategoriesHeader({ onAddCategory }: CategoriesHeaderProps) {
  return (
    <PageHeader
      title="Categories"
      description="Manage product categories and their settings"
      actionButton={{
        label: 'Add Category',
        onClick: onAddCategory,
      }}
    />
  );
}
