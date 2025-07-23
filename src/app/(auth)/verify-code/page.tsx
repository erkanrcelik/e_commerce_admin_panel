import { VerifyCodeForm } from '@/components/auth/verify-code-form';

/**
 * Verify code page component
 * Renders the code verification form for password reset
 */
export default function VerifyCodePage() {
  return <VerifyCodeForm />;
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Verify Code',
  description: 'Enter the verification code sent to your email.',
};
