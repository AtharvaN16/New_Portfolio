# Design Doc: Empowering BLV Museum Visitors Case Study

**Date:** 2026-05-16
**Topic:** New Portfolio Case Study - Digital Accessibility
**Status:** Draft

## 1. Overview
This project involves creating a new long-form case study for Atharva Nayak's portfolio based on a research paper titled *"Who Decides What Art Means? Interpretive Authority, Cultural Equity, and Conversational Access for Blind and Low-Vision Museum Visitors"*.

The case study will be categorized under a new **"Digital Accessibility"** filter and will follow the visual and narrative standards of the existing portfolio (specifically the "NYC DCWP" project).

## 2. Goals & Success Criteria
- **Individual Storytelling**: Focus on Atharva's contribution and the "why" behind the design decisions.
- **Accessibility Critique**: Emphasize the shift from a technical audit to a lived-experience-based critique of interpretive authority.
- **Portfolio Integration**: Match the layout, typography (Satoshi, Vulf Mono), and interaction patterns (Lenis scroll, Framer Motion transitions) of the current site.
- **Academic Rigor**: Include proper citations (APA) and data visualizations from the research corpus.

## 3. Architecture & Structure

### 3.1 Metadata (CaseStudy Object)
- **Slug**: `blv-museum-accessibility`
- **Title**: `Who Decides What Art Means? Giving interpretive agency to blind and low-vision museum visitors.`
- **Category**: `digital-accessibility` (New Category)
- **Accent Color**: `orange` / `#FF8C00` (Approximate, will align with Tailwind palette)
- **Team**: Atharva Nayak, Arnav Sharma, Nisheta Gupta
- **Timeline**: Spring 2026

### 3.2 Narrative Flow (Long-form)
1.  **Abstract**: High-level summary of the problem and the proposed "Negotiable Interpretation" paradigm.
2.  **The Critique**: Contrast between "Accessibility Audit" (compliance) and "Accessibility Critique" (equity).
3.  **Lived Experience**: Primary/Secondary research quotes from BLV patrons regarding museum barriers.
4.  **The Analysis**: Findings from the 14-museum corpus analysis (Ordering, Certainty, Omission).
5.  **The Solution**: Introduction of "Negotiable Interpretation" and the Conversational Probe.
6.  **Interactive Elements**: Walkthrough of the Stances (Technical, Emotional, Contextual).
7.  **Impact & Reflection**: Conclusion on cultural sustainability and personal takeaways.
8.  **References**: Formal APA citation list.

## 4. Components & UI
- **CaseStudyContentRenderer**: Update to include the new slug.
- **EmpoweringBlvContent**: A new component in `src/components/case-study/content/` to hold the long-form content.
- **Custom Visuals**:
  - Data viz for "Interpretive Scores".
  - Interaction sequence diagrams for the conversational flow.
  - Image/Mockup placeholders for the museum context.

## 5. Technical Tasks
1.  **Data**: Add the new case study entry to `src/lib/data/case-studies.ts`.
2.  **Category**: Add `digital-accessibility` to the `CaseStudy` category type.
3.  **Content**: Create `src/components/case-study/content/EmpoweringBlvContent.tsx`.
4.  **Renderer**: Update `src/components/case-study/CaseStudyContentRenderer.tsx` to route the new slug.
5.  **Visuals**: Source or generate high-fidelity assets based on the research paper.

## 6. Self-Review
- [x] **Placeholder scan**: No TBDs. Narrative matches the paper contents.
- [x] **Internal consistency**: Sections follow the assignment requirements (Critique vs Audit).
- [x] **Scope check**: Well-defined for a single implementation plan.
- [x] **Ambiguity check**: Clear distinction between the "Paradigm" and the "Probe".

## 7. Next Steps
- User review of this design doc.
- Transition to `writing-plans` for execution.
