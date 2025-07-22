/**
 * API Error Types
 */
export type ApiErrorType =
  | 'network'
  | 'not_found'
  | 'server'
  | 'auth'
  | 'unknown';

/**
 * API Error Response
 */
export interface ApiErrorResponse {
  type: ApiErrorType;
  message: string;
  retry?: boolean;
  redirect?: string;
}

/**
 * Simple API Error Handler
 *
 * Handles common API errors and returns user-friendly messages
 */
export function handleApiError(error: unknown): ApiErrorResponse {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: 'network',
      message: 'Please check your internet connection and try again.',
      retry: true,
    };
  }

  // Axios errors
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response: { status: number } };

    switch (axiosError.response.status) {
      case 404:
        return {
          type: 'not_found',
          message: 'The requested content was not found.',
          redirect: '/404',
        };
      case 401:
      case 403:
        return {
          type: 'auth',
          message: 'You do not have permission for this operation.',
          redirect: '/auth/login',
        };
      case 500:
      case 502:
      case 503:
        return {
          type: 'server',
          message: 'Server error occurred. Please try again later.',
          retry: true,
        };
      default:
        return {
          type: 'unknown',
          message: 'An error occurred. Please try again.',
          retry: true,
        };
    }
  }

  // Generic errors
  if (error instanceof Error) {
    return {
      type: 'unknown',
      message: error.message || 'An unexpected error occurred.',
      retry: true,
    };
  }

  // Default error
  return {
    type: 'unknown',
    message: 'An error occurred. Please try again.',
    retry: true,
  };
}

/**
 * Throw API Error
 *
 * Throws a standardized API error
 */
export function throwApiError(message: string, status = 500): never {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  throw error;
}
