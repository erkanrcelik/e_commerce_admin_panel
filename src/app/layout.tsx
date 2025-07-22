import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { NProgressProvider } from '@/components/providers/nprogress-provider';
import { Toaster } from '@/components/ui/sonner';
import { ReduxProvider } from '@/providers/redux-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'PlayableFactory Admin Panel',
  description:
    'Comprehensive admin panel for managing e-commerce platform operations, users, vendors, campaigns, and system analytics.',
  keywords: [
    'admin panel',
    'e-commerce management',
    'user management',
    'vendor management',
    'campaign management',
    'analytics dashboard',
    'playable factory',
    'admin dashboard',
  ],
  authors: [{ name: 'PlayableFactory Admin Team' }],
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'PlayableFactory Admin Panel',
    description:
      'Comprehensive admin panel for managing e-commerce platform operations, users, vendors, campaigns, and system analytics.',
    type: 'website',
    siteName: 'PlayableFactory Admin',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlayableFactory Admin Panel',
    description:
      'Comprehensive admin panel for managing e-commerce platform operations, users, vendors, campaigns, and system analytics.',
  },
};

/**
 * Root Layout Component
 *
 * The main layout wrapper for the entire application.
 * Provides global providers, styling, and conditional layout rendering.
 *
 * Features:
 * - Global font configuration
 * - Redux state management
 * - Toast notifications
 * - Progress bar for page transitions
 * - Conditional header/footer rendering
 * - SEO metadata
 * - Dark mode support
 *
 * @param children - Page components to render
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <NProgressProvider>
            {children}
            <Toaster />
          </NProgressProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
