import React from 'react';

/**
 * Props for the AuthLayout component
 */
interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Authentication layout component
 * Provides consistent layout and styling for all auth pages
 * This layout is applied to all routes under the (auth) route group
 * Sidebar is completely hidden for auth pages
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Admin Panel Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Playable Factory
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Admin Panel
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Yönetim Paneli
            </div>
          </div>
        </div>
      </div>

      {/* Auth Content - Full width without sidebar */}
      <div className="flex items-center justify-center p-6 min-h-[calc(100vh-88px)]">
        <div className="w-full max-w-2xl">{children}</div>
      </div>
    </div>
  );
}

/**
 * Layout metadata
 */
export const metadata = {
  title: {
    template: '%s | Playable Factory Admin',
    default: 'Authentication | Playable Factory Admin',
  },
  description:
    'Playable Factory Admin Panel - Güvenli giriş ve yönetim sistemi.',
  keywords: ['admin', 'panel', 'yönetim', 'playable factory', 'authentication'],
  authors: [{ name: 'Playable Factory' }],
  robots: 'noindex, nofollow',
};

/**
 * Layout viewport
 */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
