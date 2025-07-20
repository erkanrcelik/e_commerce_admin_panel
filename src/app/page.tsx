"use client"

import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Home() {
  const handleLogout = () => {
    // Logout işlemi burada yapılacak
    console.log("Logout clicked")
  }

  const handleProfile = () => {
    // Profil sayfasına yönlendirme
    console.log("Profile clicked")
  }

  const handleSettings = () => {
    // Ayarlar sayfasına yönlendirme
    console.log("Settings clicked")
  }

  return (
    <SidebarProvider>
      <AppSidebar 
        onLogout={handleLogout}
        onProfile={handleProfile}
        onSettings={handleSettings}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">
                    Admin Panel
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Toplam Satış</h3>
              <p className="text-2xl font-bold text-green-600">₺125,430</p>
              <p className="text-sm text-muted-foreground">+12% geçen aya göre</p>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Toplam Sipariş</h3>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-muted-foreground">+8% geçen aya göre</p>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Aktif Kullanıcı</h3>
              <p className="text-2xl font-bold text-purple-600">5,678</p>
              <p className="text-sm text-muted-foreground">+15% geçen aya göre</p>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Aktif Satıcı</h3>
              <p className="text-2xl font-bold text-orange-600">89</p>
              <p className="text-sm text-muted-foreground">+3% geçen aya göre</p>
            </div>
          </div>
          <div className="bg-muted/50 min-h-[400px] flex-1 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">Platform İstatistikleri</h2>
            <p className="text-muted-foreground">Grafikler ve detaylı istatistikler burada görüntülenecek...</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
