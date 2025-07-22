'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearError, verifyResetCode } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useToast } from '@/hooks/use-toast';
import {
    verifyCodeSchema,
    type VerifyCodeFormData,
} from '@/utils/validation';

import { AuthLayout } from '@/components/layout';

/**
 * Verify code form component
 * Handles reset code verification
 */
export function VerifyCodeForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useAppSelector(state => state.auth);
  const { showSuccess, showError, showLoading, dismiss } = useToast();
  const isLoading = status === 'loading';

  // Get email from URL params
  const email = searchParams.get('email');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: '',
      email: email || '',
    },
  });

  /**
   * Handle form submission
   * @param data - Form data from React Hook Form
   */
  const onSubmit = async (data: VerifyCodeFormData) => {
    let loadingToastId: string | number | undefined;

    try {
      // Clear any previous errors
      dispatch(clearError());

      // Show loading toast
      loadingToastId = showLoading({
        message: 'Verifying code...',
        description: 'Please wait while we verify your code',
      });

      // Dispatch verify code action
      const result = await dispatch(verifyResetCode(data));

      // Dismiss loading toast
      if (loadingToastId) dismiss(loadingToastId);

      if (verifyResetCode.fulfilled.match(result)) {
        // Success
        showSuccess({
          message: 'Code verified successfully!',
          description: 'You can now reset your password.',
          duration: 3000,
        });
        
        // Reset form
        reset();
        
        // Redirect to reset password page with token
        const token = result.payload?.token || 'temp-token';
        router.push(`/reset-password?token=${token}`);
      } else if (verifyResetCode.rejected.match(result)) {
        // Error
        const errorMessage = result.payload?.message || 'Code verification failed';
        showError({
          message: 'Code verification failed',
          description: errorMessage,
          action: {
            label: 'Try again',
            onClick: () => {
              window.location.reload();
            },
          },
        });
      }
    } catch (error) {
      // Dismiss loading toast if still showing
      if (loadingToastId) dismiss(loadingToastId);

      console.error('Code verification error:', error);
      showError({
        message: 'Code verification failed',
        description: 'An unexpected error occurred. Please try again.',
        action: {
          label: 'Try again',
          onClick: () => {
            window.location.reload();
          },
        },
      });
    }
  };

  // If no email provided, show error
  if (!email) {
    return (
      <AuthLayout
        title="Invalid Request"
        subtitle="Please request a password reset first"
      >
        <div className="w-full max-w-md mx-auto text-center">
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please request a password reset first to receive a verification code.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> For testing purposes, the verification code is always <strong>1234</strong>.
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <Button asChild>
              <Link href="/forgot-password">Request Password Reset</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Verify Code"
      subtitle={`Enter the verification code sent to ${email}`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Static Code Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> For testing purposes, the verification code is always <strong>1234</strong>.
          </p>
        </div>

        {/* Code Field */}
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            placeholder="Enter verification code"
            {...register('code')}
            disabled={isLoading}
            maxLength={4}
          />
          {errors.code && (
            <p className="text-sm text-destructive">{errors.code.message}</p>
          )}
        </div>

        {/* Hidden Email Field */}
        <input type="hidden" {...register('email')} />

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Verifying Code...' : 'Verify Code'}
        </Button>

        {/* Back to Forgot Password Link */}
        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
          >
            Back to Forgot Password
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
} 