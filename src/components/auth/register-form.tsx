'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearError, registerUser } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useToast } from '@/hooks/use-toast';
import { registerSchema, type RegisterFormData } from '@/utils/validation';

import { AuthLayout } from '../layout/auth-layout';

/**
 * Registration form component
 * Handles customer registration with validation
 */
export function RegisterForm() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(state => state.auth);
  const { showSuccess, showError, showLoading, dismiss } = useToast();
  const isLoading = status === 'loading';

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  /**
   * Handle form submission
   * @param data - Form data from React Hook Form
   */
  const onSubmit = async (data: RegisterFormData) => {
    let loadingToastId: string | number | undefined;

    try {
      // Clear any previous errors
      dispatch(clearError());

      // Show loading toast
      loadingToastId = showLoading({
        message: 'Creating your account...',
        description: 'Please wait while we set up your account',
      });

      // Dispatch register action
      const result = await dispatch(registerUser(data));

      // Dismiss loading toast
      if (loadingToastId) dismiss(loadingToastId);

      if (registerUser.fulfilled.match(result)) {
        // Success
        showSuccess({
          message: 'Account created successfully!',
          description: 'Welcome to our platform. You can now start shopping.',
          duration: 4000,
          action: {
            label: 'Start Shopping',
            onClick: () => {
              // Navigate to products or dashboard
              // This will be implemented when we add navigation
              // console.log('Navigate to products')
            },
          },
        });
        reset();
      } else if (registerUser.rejected.match(result)) {
        // Error
        const errorMessage = result.payload?.message || 'Registration failed';
        showError({
          message: 'Registration failed',
          description: errorMessage,
          action: {
            label: 'Try again',
            onClick: () => {
              // Focus on name field
              const nameInput = document.getElementById('name');
              nameInput?.focus();
            },
          },
        });
      }
    } catch (error) {
      // Dismiss loading toast if still showing
      if (loadingToastId) dismiss(loadingToastId);

      console.error('Registration error:', error);
      showError({
        message: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  const footerContent = (
    <>
      Already have an account?{' '}
      <Link
        href="/login"
        className="underline underline-offset-4 hover:text-primary"
      >
        Sign in
      </Link>
    </>
  );

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join our platform to start shopping"
      footerContent={footerContent}
    >
      <form
        onSubmit={e => {
          void handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
            className={errors.name ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            {...register('password')}
            className={errors.password ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? 'border-destructive' : ''}
            disabled={isLoading}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start space-x-2">
          <input
            id="acceptTerms"
            type="checkbox"
            {...register('acceptTerms')}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary mt-1"
            disabled={isLoading}
          />
          <Label
            htmlFor="acceptTerms"
            className="text-sm font-normal cursor-pointer leading-relaxed"
          >
            I agree to the{' '}
            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-sm text-destructive">
            {errors.acceptTerms.message}
          </p>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  );
}
