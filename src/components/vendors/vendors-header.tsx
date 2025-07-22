'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Plus } from 'lucide-react';

interface VendorsHeaderProps {
  onAddVendor?: () => void;
}

/**
 * Vendors page header component
 */
export function VendorsHeader({ onAddVendor }: VendorsHeaderProps) {
  return (
    <PageHeader
      title="Vendors"
      description="Manage vendor accounts, store approvals and seller permissions"
      actionButton={
        onAddVendor ? {
          label: 'Add Vendor',
          onClick: onAddVendor,
          icon: <Plus className="w-4 h-4 mr-2" />,
        } : undefined
      }
    />
  );
} 