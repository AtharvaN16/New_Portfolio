/**
 * Environment Variables - Type-Safe Configuration
 *
 * This file validates and exports all environment variables with proper typing.
 * Prevents runtime errors from missing or invalid environment variables.
 *
 * Usage:
 *   import { env } from '@/lib/env'
 *   const siteUrl = env.NEXT_PUBLIC_SITE_URL
 */

import { z } from 'zod'

// Define the schema for environment variables
const envSchema = z.object({
  // Public variables (accessible in browser)
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_ENABLE_ANIMATIONS: z
    .enum(['true', 'false'])
    .default('true')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .enum(['true', 'false'])
    .default('false')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),

  // Server-side only variables
  GOOGLE_SHEETS_API_URL: z
    .string()
    .url()
    .optional()
    .or(z.literal('').transform(() => undefined)),

  // Node environment
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse({
      // Public variables
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_ENABLE_ANIMATIONS: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS,
      NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,

      // Server-side variables
      GOOGLE_SHEETS_API_URL: process.env.GOOGLE_SHEETS_API_URL,

      // Node environment
      NODE_ENV: process.env.NODE_ENV,
    })
  } catch (error) {
    console.error('❌ Invalid environment variables:')
    console.error(error)
    throw new Error('Invalid environment variables')
  }
}

// Export validated and typed environment variables
export const env = parseEnv()

// Type helper for environment variables
export type Env = z.infer<typeof envSchema>
