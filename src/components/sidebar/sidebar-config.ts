import { BarChart3, Megaphone, MessageSquare, Store, Tag, Users } from 'lucide-react';

import type { SidebarConfig } from './types';

/**
 * E-commerce admin panel sidebar configuration
 *
 * Defines the navigation structure and user information for the admin sidebar.
 * Uses purple and blue color scheme to match the application design.
 */
export const sidebarConfig: SidebarConfig = {
  user: {
    name: 'Admin User',
    email: 'admin@playablefactory.com',
    avatar: '/avatars/admin.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: BarChart3,
      isActive: true,
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: Tag,
    },
    {
      title: 'Users',
      url: '/users',
      icon: Users,
    },
    {
      title: 'Vendors',
      url: '/vendors',
      icon: Store,
    },
    {
      title: 'Campaigns',
      url: '/campaigns',
      icon: Megaphone,
    },
    {
      title: 'Reviews',
      url: '/reviews',
      icon: MessageSquare,
    },
  ],
};
