import { z } from 'zod';

/**
 * Category form validation schema using Zod
 * Provides comprehensive validation for category creation and editing
 */
export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must be less than 50 characters')
    .trim(),
  
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .trim(),
  
  isActive: z
    .boolean(),
});

/**
 * Type inference from Zod schema
 */
export type CategoryFormData = z.infer<typeof categoryFormSchema>; 