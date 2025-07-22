'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/features/auth/authSlice';
import { useUserInfo } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Sidebar User Component
 * 
 * Displays user information in the sidebar footer with a dropdown menu for user actions.
 * Uses purple and blue color scheme to match the application design.
 * Handles user logout functionality with proper error handling and loading states.
 */
export function SidebarUser() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { userProfile, isLoading, getUserAvatar, getUserDisplayName, getUserInitials, clearUserProfile } = useUserInfo();

  /**
   * Handles user logout with proper error handling and loading states
   */
  const handleLogout = async () => {
    try {
      // Show loading state
      toast.loading('Logging out...');
      
      // Clear user profile data
      clearUserProfile();
      
      // Dispatch logout action
      await dispatch(logoutUser()).unwrap();
      
      // Success message
      toast.success('Logged out successfully');
      
      // Redirect to login page directly
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
      
      // Force redirect even if logout fails
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  };

  // Use user profile data if available, otherwise fall back to auth user
  const displayUser = userProfile || user;
  const displayName = userProfile ? getUserDisplayName(userProfile) : (user ? `${user.firstName} ${user.lastName}` : 'User');
  const displayEmail = userProfile ? userProfile.email : (user?.email || '');
  const displayAvatar = userProfile ? getUserAvatar() : (user?.avatar || '');
  const displayInitials = userProfile ? getUserInitials(userProfile) : (user ? `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}` : 'U');

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg mx-2">
        <Avatar className="h-8 w-8 border-2 border-purple-200">
          <AvatarFallback className="bg-purple-100 text-purple-600">...</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-purple-600">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!displayUser) {
    return (
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg mx-2">
        <Avatar className="h-8 w-8 border-2 border-purple-200">
          <AvatarFallback className="bg-purple-100 text-purple-600">U</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-purple-600">
            Not signed in
          </p>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 p-4 h-auto bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/20 dark:hover:to-blue-900/20 rounded-lg mx-2 transition-all duration-200"
        >
          <Avatar className="h-8 w-8 border-2 border-purple-200">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback className="bg-purple-100 text-purple-600">{displayInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 text-left">
            <span className="truncate font-medium text-purple-900 dark:text-purple-100">{displayName}</span>
            <p className="text-xs text-purple-600 dark:text-purple-300 truncate">
              {displayEmail}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-purple-200" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-purple-900">
              {displayName}
            </p>
            <p className="text-xs leading-none text-purple-600">
              {displayEmail}
            </p>
            {userProfile?.role && (
              <p className="text-xs leading-none text-purple-500 capitalize">
                {userProfile.role}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-purple-200" />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 focus:text-red-700 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
