import { RegisterForm } from '@/components/auth/register-form'

/**
 * Register page component  
 * Renders the registration form for new user signup
 */
export default function RegisterPage() {
  return <RegisterForm />
}

/**
 * Page metadata
 */
export const metadata = {
  title: 'Register',
  description: 'Create a new account to start shopping with exclusive deals and fast delivery.',
}
