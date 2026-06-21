'use server'

import { Resend } from 'resend'
import { z } from 'zod'

const ContactFormSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  linkedin: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
})

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

export async function sendMessage(formData: FormData) {
  const resend = getResendClient()
  if (!resend) {
    console.error(
      'RESEND_API_KEY is not configured. Add it to .env.local to enable the contact form.'
    )
    return {
      success: false,
      error:
        process.env.NODE_ENV === 'development'
          ? 'Contact form is not configured locally (missing RESEND_API_KEY).'
          : 'Unable to send message right now. Please try again later.',
    }
  }

  const rawData = {
    message: formData.get('message'),
    linkedin: formData.get('linkedin'),
    email: formData.get('email'),
  }

  const validatedData = ContactFormSchema.safeParse(rawData)

  if (!validatedData.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    }
  }

  const { message, linkedin, email } = validatedData.data

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['atharvanayak16@gmail.com'],
      subject: 'New Message from Portfolio Website',
      text: `
        Message: ${message}
        LinkedIn: ${linkedin || 'Not provided'}
        Email: ${email || 'Anonymous'}
      `,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2>New Message from Portfolio Website</h2>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr />
          <p><strong>Contact Details:</strong></p>
          <ul>
            <li><strong>LinkedIn:</strong> ${linkedin || 'Not provided'}</li>
            <li><strong>Email:</strong> ${email || 'Anonymous'}</li>
          </ul>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: 'Failed to send message.' }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error:', err)
    return {
      success: false,
      error: 'Something went wrong. Please try again later.',
    }
  }
}
