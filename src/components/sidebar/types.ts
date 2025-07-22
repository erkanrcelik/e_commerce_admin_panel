import { LucideIcon } from 'lucide-react';

/**
 * Sidebar user information interface
 * 
 * Defines the structure for user data displayed in the sidebar footer
 */
export interface SidebarUser {
  name: string;
  email: string;
  avatar: string;
}

/**
 * Sidebar menu item interface
 * 
 * Defines the structure for navigation items in the sidebar menu
 */
export interface SidebarMenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SidebarSubItem[];
}

/**
 * Sidebar sub-item interface
 * 
 * Defines the structure for nested navigation items
 */
export interface SidebarSubItem {
  title: string;
  url: string;
}

/**
 * Sidebar configuration interface
 * 
 * Defines the complete structure for sidebar configuration including
 * user information and navigation menu items
 */
export interface SidebarConfig {
  user: SidebarUser;
  navMain: SidebarMenuItem[];
}
