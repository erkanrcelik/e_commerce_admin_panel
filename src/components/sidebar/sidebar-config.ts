import {
  BarChart3,
  Users,
  Store,
  Tag,
  Megaphone,
  Settings2,
} from "lucide-react"

import type { SidebarConfig } from "./types"

// E-ticaret admin paneli için sidebar konfigürasyonu
export const sidebarConfig: SidebarConfig = {
  user: {
    name: "Admin User",
    email: "admin@playablefactory.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Kategori Yönetimi",
      url: "/categories",
      icon: Tag,
    },
    {
      title: "Kullanıcı Yönetimi",
      url: "/users",
      icon: Users,
    },
    {
      title: "Satıcı Yönetimi",
      url: "/vendors",
      icon: Store,
    },
    {
      title: "Kampanya Yönetimi",
      url: "/campaigns",
      icon: Megaphone,
    },
    {
      title: "Ayarlar",
      url: "/settings",
      icon: Settings2,
    },
  ],
} 