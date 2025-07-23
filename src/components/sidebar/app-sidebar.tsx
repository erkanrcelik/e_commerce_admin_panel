'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader as SidebarHeaderUI,
  SidebarRail,
} from '@/components/ui/sidebar';

import { sidebarConfig } from './sidebar-config';
import { SidebarHeader } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';
import { SidebarUser } from './sidebar-user';

/**
 * App Sidebar Component
 *
 * Main sidebar component for the admin panel with purple and blue color scheme.
 * Includes header with logo and title, navigation menu, and user section.
 *
 * @param props - React component props extending Sidebar component props
 */
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeaderUI>
        <SidebarHeader />
      </SidebarHeaderUI>
      <SidebarContent>
        <SidebarNav items={sidebarConfig.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
