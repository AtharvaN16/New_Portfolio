import localFont from 'next/font/local'

/**
 * Satoshi Font Family
 * Using variable font for optimal performance and file size.
 */
export const satoshi = localFont({
  src: '../../public/fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '300 900',
  style: 'normal',
})

/**
 * Vulf Mono Font Family
 */
export const vulfMono = localFont({
  src: [
    {
      path: '../../public/fonts/VulfMonoDemo-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VulfMonoDemo-Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/VulfMonoDemo-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VulfMonoDemo-LightItalic.woff2', // Prefer woff2 for the most common weight/style
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/VulfMonoDemo-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/VulfMonoDemo-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-vulf-mono',
  display: 'swap',
})
