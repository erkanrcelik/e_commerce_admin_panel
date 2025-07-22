import api, {
  getAuthToken,
  getRefreshToken,
  removeAuthTokens,
  setAuthToken,
  setRefreshToken,
} from '@/lib/axios';
import type {
  AuthResponse,
  ForgotPasswordFormData,
  LoginFormData,
  ResetPasswordFormData,
  VerifyCodeFormData
} from '@/types/auth';

/**
 * Authentication API service
 * Handles all authentication-related API calls
 */
export class AuthService {
  /**
   * Register new user
   */
  static async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role?: string;
  }): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  }

  /**
   * Login user with email and password
   */
  static async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>('/auth/login', {
        ...credentials,
        platform: 'admin'
      });
      
      console.log('Login response:', response.data);
      
      const { accessToken, refreshToken } = response.data;

      console.log('Access token:', accessToken);
      console.log('Refresh token:', refreshToken);

      // Store tokens in cookies
      setAuthToken(accessToken);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }

      console.log('Tokens stored in cookies');

      return response.data;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  }
  
  /**
   * Send forgot password email
   */
  static async forgotPassword(
    emailData: ForgotPasswordFormData
  ): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/forgot-password',
        emailData
      );
      return response.data;
    } catch (error) {
      console.error('Forgot password API error:', error);
      throw error;
    }
  }

  /**
   * Verify reset code
   */
  static async verifyResetCode(
    codeData: VerifyCodeFormData
  ): Promise<{ message: string; token: string }> {
    try {
      const response = await api.post<{ message: string; token: string }>(
        '/auth/verify-reset-code',
        codeData
      );
      return response.data;
    } catch (error) {
      console.error('Verify reset code API error:', error);
      throw error;
    }
  }

  /**
   * Reset password with token
   */
  static async resetPassword(
    resetData: ResetPasswordFormData
  ): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/reset-password',
        resetData
      );
      return response.data;
    } catch (error) {
      console.error('Reset password API error:', error);
      throw error;
    }
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const response = await api.get<{ message: string }>(
        `/auth/verify-email?token=${token}`
      );
      return response.data;
    } catch (error) {
      console.error('Email verification API error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    try {
      // Check if we have a valid token before making the API call
      const token = getAuthToken();
      if (token && token !== 'undefined') {
        // Call logout endpoint to invalidate token on server
        await api.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
      // This is important for offline scenarios or when backend is not available
    } finally {
      // Always remove tokens locally
      removeAuthTokens();
    }
  }

  /**
   * Refresh access token
   */
  static async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Store new tokens
      setAuthToken(accessToken);
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }

      return response.data;
    } catch (error) {
      console.error('Refresh token API error:', error);
      throw error;
    }
  }

  /**
   * Get user info
   */
  static async getUserInfo(): Promise<{
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
  }> {
    try {
      const response = await api.get<{
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
      }>('/auth/user-info');
      return response.data;
    } catch (error) {
      console.error('Get user info API error:', error);
      throw error;
    }
  }

  /**
   * Resend email verification
   */
  static async resendVerification(email: string): Promise<{ message: string }> {
    try {
      const response = await api.post<{ message: string }>(
        '/auth/resend-verification',
        { email }
      );
      return response.data;
    } catch (error) {
      console.error('Resend verification API error:', error);
      throw error;
    }
  }
}
