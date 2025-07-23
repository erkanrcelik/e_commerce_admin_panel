import { z } from 'zod';

/**
 * Campaign form validation schema using Zod
 * Provides comprehensive validation for campaign creation and editing
 */
export const campaignFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Campaign name must be at least 3 characters')
      .max(100, 'Campaign name must be less than 100 characters')
      .trim(),

    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must be less than 500 characters')
      .trim(),

    discountType: z.union([z.literal('percentage'), z.literal('amount')]),

    discountValue: z
      .number()
      .min(0.01, 'Discount value must be greater than 0')
      .max(100000, 'Discount value is too large'),

    startDate: z
      .string()
      .min(1, 'Start date is required')
      .refine(date => {
        const startDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return startDate >= today;
      }, 'Start date cannot be in the past'),

    endDate: z.string().min(1, 'End date is required'),

    productIds: z.array(z.string()),

    categoryIds: z.array(z.string()),
  })
  .refine(
    data => {
      if (data.discountType === 'percentage' && data.discountValue > 100) {
        return false;
      }
      return true;
    },
    {
      message: 'Percentage discount cannot exceed 100%',
      path: ['discountValue'],
    }
  )
  .refine(
    data => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    }
  );

/**
 * Type inference from Zod schema
 */
export type CampaignFormData = z.infer<typeof campaignFormSchema>;
