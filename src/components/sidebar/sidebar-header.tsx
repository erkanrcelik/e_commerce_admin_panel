import { useUserInfo } from '@/hooks';
import { Store } from 'lucide-react';

interface SidebarHeaderProps {
  title?: string;
  subtitle?: string;
  logo?: React.ComponentType<{ className?: string }>;
}

/**
 * Sidebar Header Component
 *
 * Displays the application logo, title, and subtitle in the sidebar header.
 * Uses purple and blue color scheme to match the application design.
 *
 * @param title - The main application title (default: 'PlayableFactory')
 * @param subtitle - The subtitle text (default: 'Admin Panel')
 * @param logo - The logo component to display
 */
export function SidebarHeader({
  title = 'PlayableFactory',
  subtitle = 'Admin Panel',
  logo: Logo = Store,
}: SidebarHeaderProps) {
  const { userProfile, isLoading } = useUserInfo();

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mx-2 mb-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
        <Logo className="h-5 w-5 text-white" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white">{title}</span>
        <span className="text-xs text-white/80">
          {isLoading
            ? 'Loading...'
            : userProfile?.role
              ? `${subtitle} - ${userProfile.role}`
              : subtitle}
        </span>
      </div>
    </div>
  );
}
