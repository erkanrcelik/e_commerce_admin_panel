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
