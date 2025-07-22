'use client';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

import type { SidebarMenuItem as SidebarMenuItemType } from './types';

interface SidebarNavProps {
  items: SidebarMenuItemType[];
  groupLabel?: string;
}

/**
 * Sidebar Navigation Component
 * 
 * Renders the main navigation menu in the sidebar with purple and blue color scheme.
 * Displays navigation items with icons and labels in a grouped menu structure.
 * Highlights the active page with different styling.
 * 
 * @param items - Array of navigation menu items to display
 * @param groupLabel - Label for the navigation group (default: 'Platform')
 */
export function SidebarNav({
  items,
  groupLabel = 'Platform',
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-purple-600 font-semibold">
        {groupLabel}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => {
          const isActive = pathname === item.url;
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title}
                className={`transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                    : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20'
                }`}
              >
                <a href={item.url} className="flex items-center gap-3">
                  {item.icon && (
                    <item.icon className={`h-4 w-4 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-purple-600 group-hover:text-purple-700'
                    }`} />
                  )}
                  <span className={`font-medium ${
                    isActive ? 'text-white' : ''
                  }`}>
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
