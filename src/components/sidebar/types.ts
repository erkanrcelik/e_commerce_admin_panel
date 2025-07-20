import { LucideIcon } from "lucide-react"

export interface SidebarUser {
  name: string
  email: string
  avatar: string
}

export interface SidebarMenuItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: SidebarSubItem[]
}

export interface SidebarSubItem {
  title: string
  url: string
}

export interface SidebarConfig {
  user: SidebarUser
  navMain: SidebarMenuItem[]
} 