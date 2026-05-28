# Color System

## Global Tokens
The project uses a design token system defined in `src/app/globals.css` and `src/styles/design-tokens.css`, mapping to Tailwind classes.

## Case Study Theme System (Seed & Derive)
Every case study uses a single **Seed Color** (`themeColor` in `case-studies.ts`) to automatically generate an adaptive 6-variant palette.

- **Purpose:** Automates consistent branding for progress bars, icons, and backgrounds.
- **Adaptive Highlights:** Cursor-dragged selections automatically shift for contrast in Light/Dark modes using `oklch` and `color-mix`.
- **Implementation:** Powered by the `ThemeScoper` component which broadcasts CSS variables from the layout level.
