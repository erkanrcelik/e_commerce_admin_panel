'use client';

import { PageHeader } from '@/components/layout/page-header';

/**
 * Header component for customers page
 * Contains title and description
 */
export function UsersHeader() {
  return (
    <PageHeader
      title="Customers"
      description="Manage customer accounts, status updates and permissions"
    />
  );
} 