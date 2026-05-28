# Project Hub

Overview of the portfolio's architecture, systems, and documentation.

## 📚 Documentation Index
- [Start Here](./docs/00-START-HERE.md) - The primary entry point for developers.
- [Architecture](./docs/01-ARCHITECTURE.md) - Deep dive into folder structure and patterns.
- [Component Guidelines](./docs/02-COMPONENT-GUIDELINES.md) - Standards for building UI.
- [Color System](./docs/COLOR.md) - Design tokens and case study themes.
- [Decisions Log](./docs/04-DECISIONS-LOG.md) - Historical context for technical choices.

## 🚀 Key Systems

### Case Study Theme Engine
A "Seed & Derive" system that generates a full adaptive palette from a single brand color. 
- **Broadcast:** Handled by `ThemeScoper`.
- **Highlights:** Custom `::selection` styles that adjust for readability in Light/Dark modes.
- **Cleanup:** Unused MDX infrastructure has been fully removed in favor of `.tsx` components.

### Animation Strategy
Uses a combination of **Lenis** (smooth scroll), **GSAP** (complex timelines), and **Framer Motion** (declarative transitions). See [Animation Strategy](./docs/03-ANIMATION-STRATEGY.md).
