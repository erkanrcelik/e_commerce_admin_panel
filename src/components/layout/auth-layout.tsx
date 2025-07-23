import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils';

/**
 * Props for the AuthLayout component
 */
interface AuthLayoutProps {
  /** Title of the authentication form */
  title: string;
  /** Subtitle or description text */
  subtitle: string;
  /** Main form content */
  children: React.ReactNode;
  /** Footer content with links */
  footerContent?: React.ReactNode;
  /** Error message to display */
  error?: string | null;
  /** Success message to display */
  success?: string | null;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable authentication layout component
 * Provides consistent styling and structure for auth pages
 */
export function AuthLayout({
  title,
  subtitle,
  children,
  footerContent,
  error,
  success,
  className,
  ...props
}: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Playable Factory Admin</title>
        <meta name="description" content="Playable Factory Admin Panel - Authentication and account management." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={cn('flex flex-col gap-6 w-full max-w-5xl mx-auto', className)}
        {...props}
      >
        <Card className="overflow-hidden p-0 shadow-2xl border-0">
          <CardContent className="grid p-0 lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-8 lg:p-12 flex items-center">
              <div className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:mx-0 lg:max-w-none">
                {/* Header */}
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-3xl font-bold">{title}</h1>
                  <p className="text-muted-foreground text-balance mt-2">{subtitle}</p>
                  <span className="mt-3 inline-block px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">Admin Panel</span>
                </div>

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Success Alert */}
                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Main Form Content */}
                {children}

                {/* Footer Links */}
                {footerContent && (
                  <div className="text-center text-sm">{footerContent}</div>
                )}
              </div>
            </div>

            {/* Side Image Section */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/5 relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
              <div className="relative h-full flex items-center justify-center p-12">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    Secure & Trusted
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md text-lg">
                    Your data is protected with enterprise-grade security. Manage your platform with confidence.
                  </p>
                  <span className="inline-block px-4 py-2 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">Admin Panel</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Privacy */}
        <div className="text-muted-foreground text-center text-xs text-balance">
          By continuing, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </>
  );
}
