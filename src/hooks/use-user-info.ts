import { AuthService } from '@/services/auth.service';
import { useEffect, useState } from 'react';

/**
 * User profile interface (matches API response)
 */
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Custom hook for managing user profile information
 */
export function useUserInfo() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load user profile from API
   */
  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const profile = await AuthService.getUserInfo();
      setUserProfile(profile);
    } catch (err) {
      console.error('Failed to load user profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear user profile data (for logout)
   */
  const clearUserProfile = () => {
    setUserProfile(null);
    setError(null);
  };

  /**
   * Utility functions
   */
  const getUserAvatar = () => {
    // For now, return empty string - avatar functionality can be added later
    return '';
  };

  const getUserDisplayName = (user: UserProfile) => {
    return `${user.firstName} ${user.lastName}`;
  };

  const getUserInitials = (user: UserProfile) => {
    return `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`;
  };

  // Load user profile on mount
  useEffect(() => {
    void loadUserProfile();
  }, []);

  return {
    userProfile,
    isLoading,
    error,
    loadUserProfile,
    clearUserProfile,
    getUserAvatar,
    getUserDisplayName,
    getUserInitials,
  };
} 