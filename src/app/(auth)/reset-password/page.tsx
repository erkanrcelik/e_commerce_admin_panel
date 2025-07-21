import { ResetPasswordForm } from '@/components/auth/reset-password-form';

/**
 * Reset password page component
 * Renders the reset password form for password reset with token
 */
export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account.',
}; 