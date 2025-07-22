'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { AdminVendor } from '@/types/admin-vendors';

interface VendorDeleteDialogProps {
  vendor: AdminVendor | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

/**
 * Delete confirmation dialog for vendors
 * Provides clear warning about irreversible action
 */
export function VendorDeleteDialog({
  vendor,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: VendorDeleteDialogProps) {
  if (!vendor) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete vendor{' '}
            <span className="font-medium">"{vendor.firstName} {vendor.lastName}"</span> 
            and their store <span className="font-medium">"{vendor.profile?.storeName}"</span>? 
            This action cannot be undone and will permanently remove the vendor account,
            their store profile, and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? 'Deleting...' : 'Delete Vendor'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 