/**
 * Authentication status states
 */
export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'

/**
 * User data structure
 */
export interface User {
  id: string
  email: string
  name: string
  isEmailVerified: boolean
  avatar?: string
  createdAt: string
  updatedAt: string
}

/**
 * Authentication state interface
 */
export interface AuthState {
  user: User | null
  status: AuthStatus
  error: string | null
}

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

/**
 * Registration form data structure
 */
export interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

/**
 * Password reset request form data
 */
export interface ForgotPasswordFormData {
  email: string
}

/**
 * Password reset form data
 */
export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
  token: string
}

/**
 * Email verification data
 */
export interface EmailVerificationData {
  token: string
}

/**
 * API response structure for authentication
 */
export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
  message?: string
}

/**
 * API error response structure
 */
export interface AuthError {
  message: string
  field?: string
  code?: string
}
