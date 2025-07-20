'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader as SidebarHeaderUI,
  SidebarRail,
} from '@/components/ui/sidebar';

import { SidebarHeader } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';
import { SidebarUser } from './sidebar-user';
import { sidebarConfig } from './sidebar-config';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onLogout?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
}

export function AppSidebar({
  onLogout,
  onProfile,
  onSettings,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeaderUI>
        <SidebarHeader />
      </SidebarHeaderUI>
      <SidebarContent>
        <SidebarNav items={sidebarConfig.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser
          user={sidebarConfig.user}
          onLogout={onLogout}
          onProfile={onProfile}
          onSettings={onSettings}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
