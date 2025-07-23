'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthService } from '@/services/auth.service';
import type { AdminSeller } from '@/types/admin-sellers';
import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Vendor form validation schema
 */
const vendorFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

type VendorFormData = z.infer<typeof vendorFormSchema>;

interface VendorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (vendor: AdminSeller) => void;
}

/**
 * Vendor registration form component
 * Uses react-hook-form with zod validation
 */
export function VendorForm({ isOpen, onClose, onSuccess }: VendorFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  /**
   * Handle form submission
   */
  const onSubmit = async (data: VendorFormData) => {
    try {
      setIsLoading(true);

      // Register new vendor using AuthService
      const registerData = {
        ...data,
        role: 'seller' as const, // Always set role to seller
      };

      await AuthService.register(registerData);

      toast.success('Vendor registered successfully');

      // Create a mock vendor object for the success callback
      const vendorData: AdminSeller = {
        _id: 'temp-id', // This will be replaced when the vendor list is refreshed
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        role: 'seller',
        isActive: false, // New vendors are typically inactive until verified
        isEmailVerified: false,
        companyName: `${data.firstName} ${data.lastName}`,
        isApproved: false,
        profile: {
          _id: 'temp-profile-id',
          companyName: `${data.firstName} ${data.lastName}`,
          description: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          businessType: 'individual',
          rating: 0,
          reviewCount: 0,
          productCount: 0,
          categories: [],
          businessCategories: [],
          isApproved: false,
          contactEmail: data.email,
          contactPhone: data.phoneNumber,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        totalSales: 0,
        totalProducts: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      onSuccess(vendorData);
      onClose();
      reset();
    } catch (error) {
      console.error('Vendor registration error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to register vendor'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset form and close dialog
   */
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
          <DialogDescription>
            Register a new vendor account. The vendor will receive an email to
            verify their account.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={e => {
            void handleSubmit(onSubmit)(e);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              placeholder="+1234567890"
              {...register('phoneNumber')}
              className={errors.phoneNumber ? 'border-red-500' : ''}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register('password')}
              className={errors.password ? 'border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value="Seller" disabled className="bg-gray-50" />
            <p className="text-xs text-gray-500">
              Vendors are automatically registered as sellers
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                handleClose();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register Vendor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
