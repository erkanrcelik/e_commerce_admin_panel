'use client';

import { useRouter } from 'next/navigation';

import { AppSidebar } from '@/components/sidebar/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { logoutUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/hooks/redux';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSuccess, showLoading, dismiss } = useToast();

  const handleLogout = () => {
    void (async () => {
      let loadingToastId: string | number | undefined;

      try {
        // Show loading toast
        loadingToastId = showLoading({
          message: 'Signing out...',
          description: 'Please wait',
        });

        // Dispatch logout action
        await dispatch(logoutUser());

        // Dismiss loading toast
        if (loadingToastId) dismiss(loadingToastId);

        // Show success message
        showSuccess({
          message: 'Successfully signed out',
          description: 'You have been safely logged out',
          duration: 2000,
        });

        // Redirect to login page
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } catch (error) {
        // Dismiss loading toast if still showing
        if (loadingToastId) dismiss(loadingToastId);

        console.error('Logout error:', error);
        
        // Even if there's an error, we should still logout locally
        // This handles cases where the backend is not available
        showSuccess({
          message: 'Signed out',
          description: 'Local session terminated',
          duration: 2000,
        });

        // Redirect to login page
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    })();
  };

  const handleProfile = () => {
    // Profil sayfasına yönlendirme
    console.log('Profile clicked');
  };

  const handleSettings = () => {
    // Ayarlar sayfasına yönlendirme
    console.log('Settings clicked');
  };

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
                  <BreadcrumbLink href="/">Admin Panel</BreadcrumbLink>
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
              <h3 className="font-semibold mb-2">Total Sales</h3>
              <p className="text-2xl font-bold text-green-600">₺125,430</p>
              <p className="text-sm text-muted-foreground">
                +12% from last month
              </p>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Total Orders</h3>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-muted-foreground">
                +8% from last month
              </p>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Active Users</h3>
              <p className="text-2xl font-bold text-purple-600">5,678</p>
              <p className="text-sm text-muted-foreground">
                +15% from last month
              </p>
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl p-4">
              <h3 className="font-semibold mb-2">Active Vendors</h3>
              <p className="text-2xl font-bold text-orange-600">89</p>
              <p className="text-sm text-muted-foreground">
                +3% from last month
              </p>
            </div>
          </div>
          <div className="bg-muted/50 min-h-[400px] flex-1 rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-4">
              Platform Statistics
            </h2>
            <p className="text-muted-foreground">
              Charts and detailed statistics will be displayed here...
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
