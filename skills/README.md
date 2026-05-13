# Project Skills

This directory contains specialized skills and procedural guides for AI agents (Claude, Codex, Gemini) working on this project. These skills are adapted from [Matt Pocock's skills repository](https://github.com/mattpocock/skills).

## 🛠 Engineering Skills

- **[TDD (Test-Driven Development)](engineering/tdd/SKILL.md)**: Disciplined red-green-refactor loop.
- **[Diagnose](engineering/diagnose/SKILL.md)**: A structured approach to debugging and root-cause analysis.
- **[Improve Codebase Architecture](engineering/improve-codebase-architecture/SKILL.md)**: Patterns for deepening the codebase and preventing "ball of mud" architecture.
- **[Zoom Out](engineering/zoom-out/SKILL.md)**: High-level perspective for understanding unfamiliar code.
- **[Grill with Docs](engineering/grill-with-docs/SKILL.md)**: Challenging plans against the domain model and updating documentation.
- **[To Issues](engineering/to-issues/SKILL.md)**: Synthesizing conversations into vertical-slice GitHub issues.
- **[To PRD](engineering/to-prd/SKILL.md)**: Synthesizing conversations into a Product Requirements Document.

## ⚡ Productivity Skills

- **[Caveman](productivity/caveman/SKILL.md)**: Ultra-compressed communication mode to save context/tokens.
- **[Grill Me](productivity/grill-me/SKILL.md)**: Relentless interview mode to resolve decision trees.
- **[Handoff](productivity/handoff/SKILL.md)**: Compact session state for another agent to resume.

## 🤖 Agent Instructions

Agents should reference these skills when performing relevant tasks. 

- **Claude**: Use `/tdd` or `/diagnose` to trigger these workflows. See `CLAUDE.md`.
- **Gemini**: Use `activate_skill` for relevant skills or reference them from `GEMINI.md`.
- **Codex**: Reference these files for proven patterns and workflows.
