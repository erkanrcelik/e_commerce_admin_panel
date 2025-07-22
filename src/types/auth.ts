/**
 * Authentication status states
 */
export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated';

/**
 * User data structure
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'customer' | 'vendor' | 'seller';
  isEmailVerified: boolean;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Register form data structure
 */
export interface RegisterFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role?: 'admin' | 'seller' | 'customer';
}

/**
 * Password reset request form data
 */
export interface ForgotPasswordFormData {
  email: string;
}

/**
 * Verify code form data
 */
export interface VerifyCodeFormData {
  code: string;
  email: string;
}

/**
 * Password reset form data
 */
export interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
  token: string;
}

/**
 * Email verification data
 */
export interface EmailVerificationData {
  token: string;
}

/**
 * API response structure for authentication
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  message?: string;
}

/**
 * API error response structure
 */
export interface AuthError {
  message: string;
  field?: string;
  code?: string;
}
