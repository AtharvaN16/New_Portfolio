/**
 * Theme Script - Prevents flash of wrong theme
 *
 * This script runs BEFORE React hydrates, setting the theme
 * immediately to prevent any flash of unstyled content.
 *
 * Place in root layout <head>
 */

export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const stored = localStorage.getItem('theme');
        if (stored) {
          document.documentElement.setAttribute('data-theme', stored);
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        }
      } catch (e) {
        console.error('Theme initialization error:', e);
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}
