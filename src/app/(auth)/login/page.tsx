import { LoginForm } from '@/components/auth/login-form';

/**
 * Login page component
 * Renders the login form for user authentication
 */
export default function LoginPage() {
  return <LoginForm />;
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Login',
  description: 'Sign in to your account to access your profile and orders.',
};
