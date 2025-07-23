'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { clearError, loginUser } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useToast } from '@/hooks/use-toast';
import { loginSchema, type LoginFormData } from '@/utils/validation';

import { AuthLayout } from '@/components/layout';

/**
 * Login form component
 * Handles user authentication with email and password
 */
export function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector(state => state.auth);
  const { showSuccess, showError, showLoading, dismiss } = useToast();
  const isLoading = status === 'loading';
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  /**
   * Handle form submission
   * @param data - Form data from React Hook Form
   */
  const onSubmit = async (data: LoginFormData) => {
    let loadingToastId: string | number | undefined;

    try {
      // Clear any previous errors
      dispatch(clearError());

      // Show loading toast
      loadingToastId = showLoading({
        message: 'Signing in...',
        description: 'Please wait while we verify your credentials',
      });

      // Dispatch login action
      const result = await dispatch(loginUser(data));

      // Dismiss loading toast
      if (loadingToastId) dismiss(loadingToastId);

      if (loginUser.fulfilled.match(result)) {
        // Success
        showSuccess({
          message: 'Welcome back!',
          description: 'You have been successfully signed in',
          duration: 3000,
        });

        // Reset form
        reset();

        // Redirect to dashboard
        router.push('/');
      } else if (loginUser.rejected.match(result)) {
        // Error
        const errorMessage = result.payload?.message || 'Login failed';
        showError({
          message: 'Sign in failed',
          description: errorMessage,
          action: {
            label: 'Try again',
            onClick: () => {
              // Focus on email field
              const emailInput = document.getElementById('email');
              emailInput?.focus();
            },
          },
        });
      }
    } catch (error) {
      // Dismiss loading toast if still showing
      if (loadingToastId) dismiss(loadingToastId);

      console.error('Login error:', error);
      showError({
        message: 'Unexpected error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
    >
      <form
        onSubmit={e => {
          void handleSubmit(onSubmit)(e);
        }}
        className="space-y-4"
      >
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm underline-offset-2 hover:underline text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
              className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            id="rememberMe"
            type="checkbox"
            {...register('rememberMe')}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <Label
            htmlFor="rememberMe"
            className="text-sm font-normal cursor-pointer"
          >
            Remember me for 30 days
          </Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
}
