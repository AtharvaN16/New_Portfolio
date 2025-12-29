## Coding Rules and Best Practices (2025)

This document defines actionable rules for day-to-day development to produce maintainable, scalable, responsive, and secure software. Use these rules as a checklist in reviews and CI gates.

### Core Principles
- **Clarity first**: Prefer readability over cleverness. Small, composable functions; early returns; minimal nesting.
- **Least surprise**: Follow project conventions (formatter, linter, folder layout, commit style) before personal preference.
- **Single responsibility**: Each module/class/function does one thing well; avoid implicit side-effects.
- **Add complexity only if needed**: Are you adding unnecessary complexity to a code that could be written simpler
- **Fail fast, fail loud**: Validate inputs; throw meaningful errors; avoid silent catch-all blocks.
- **Automate quality**: Enforce formatting, linting, typing, tests, and security scans in CI.

## 🔑 Ways to Avoid Spaghetti Code

### 1. Modularize Everything
- Break big chunks of logic into small, focused functions/classes.
- Each function should "do one thing well" (Single Responsibility Principle).

### 2. Use Clear Abstractions
- Group related logic together (modules, services, components).
- Don't scatter similar functionality across unrelated files.

### 3. Follow Consistent Naming & Conventions
- Use descriptive variable/function names that reveal intent.
- Stick to one naming style (camelCase, PascalCase, snake_case) consistently.

### 4. Avoid Deep Nesting
- Too many `if/else` or nested loops = tangled flow.
- Use guard clauses, early returns, and helper functions to simplify logic.

### 5. DRY (Don't Repeat Yourself)
- Extract reusable functions/utilities instead of copy-pasting code.
- Centralize constants and configuration.

### 6. Use Proper Architecture Patterns
- **Small apps:** MVC or MVVM keep logic clean.
- **Larger systems:** consider domain-driven design, modular monolith, or microservices (only if justified).

### 7. Write Tests
- Testable code is naturally modular and less tangled.
- Unit tests force you to separate concerns.

### 8. Document as You Go
- Add comments when logic isn't obvious.
- Don't keep adding markdown files unnecessarily, always ask permission before adding a .md file

### 9. Refactor Regularly
- Don't let technical debt pile up.
- Revisit messy sections and clean them before adding new features.

### 10. Code Reviews & Collaboration
- Fresh eyes catch complexity you might miss.
- Encourage team feedback on readability and structure.

### ✅ Simple Mantra
**Small pieces, clear boundaries, consistent structure.**
If you can explain the flow of your code to a new teammate in 5 minutes, it's probably not spaghetti.

## 🚀 Scalable & Future-Proof Code Guidelines

### 1. Design for Modularity
- Break functionality into independent, reusable components.
- Ensure modules have clear boundaries and minimal coupling.

### 2. Embrace Abstraction
- Use interfaces or abstract classes for extensibility.
- Hide implementation details; expose only what's necessary.

### 3. Follow SOLID Principles
- **S**ingle Responsibility: one reason to change.
- **O**pen/Closed: open for extension, closed for modification.
- **L**iskov Substitution: interchangeable implementations.
- **I**nterface Segregation: keep interfaces small and specific.
- **D**ependency Inversion: depend on abstractions, not concretes.

### 4. Plan for Growth
- Write code as if it will need to handle 10x the load tomorrow.
- Avoid hardcoded limits (e.g., array sizes, static configs).
- Parameterize values, use configs or environment variables.

### 5. Keep Dependencies Flexible
- Use well-maintained libraries with active support.
- Abstract external dependencies behind an adapter layer.
- Document how to upgrade or swap them in the future.

### 6. Prioritize Readability
- Readable code scales better with teams.
- Follow consistent coding standards and style guides.

### 7. Automate Testing
- Add unit, integration, and regression tests.
- Ensure changes don't break existing functionality.

### 8. Build for Maintainability
- Refactor regularly, don't let technical debt accumulate.
- Keep functions small and codebase clean.

### 9. Document for the Future
- Document APIs, data flows, and module responsibilities.
- Update docs when major changes occur.
- Don't keep adding markdown files unnecessarily, always ask permission before adding a .md file

### 10. Anticipate Change
- Think of what's likely to evolve (e.g., business logic, APIs).
- Keep those parts decoupled and easy to replace.

## Project Structure
- **Source of truth**: All development happens in `portfolio-new/`. This is where `node_modules` and the dev server run from.
- **Do NOT create or edit files** in the root-level `src/` folder (if it exists). Always use `portfolio-new/src/`.
- **Dev server**: Run from `portfolio-new/` directory (`cd portfolio-new && npm run dev`).

## Development Workflow Rules
- **When uncertain**: Always consult with user before proceeding.
- **When discussing approaches**: Guide toward the best option to take.
- **When in doubt**: Consult the latest documentation or online web sources (as of 2025).
- **File size limit**: No file should be larger than 300 lines of code.
- **Post-feature review**: After finishing a feature, look up best practices online to ensure we're following all best practices and avoiding common mistakes.

## Maintainability
- **Naming**: Use descriptive, intention‑revealing names; avoid abbreviations and 1–2 character identifiers.
- **Function size**: Aim for ≤50 lines; extract helper functions when branching/concerns multiply.
- **Comments**: Document non‑obvious rationale, invariants, and edge cases—not the obvious. Keep comments current.
- **Types**: Prefer static typing or strong type hints. Avoid `any`/unsafe casts; model domain types explicitly.
- **Immutability**: Prefer immutable data patterns to reduce side-effects and cognitive load.
- **Dead code**: Remove unused code/feature flags; keep repo lean.
- **Consistency**: One style per repo (formatter + linter). Do not mix tabs/spaces or divergent patterns.
- **Docs**: Update README, migration notes, and ADRs with every notable change.

## Scalability (Performance and Architecture)
- **Complexity**: Choose appropriate algorithms/data structures; avoid N+1 queries; measure before optimizing.
- **Caching**: Add memoization or distributed caches where results are stable; set TTLs and invalidation strategies.
- **Asynchrony**: Use queues/batch jobs for non‑interactive work; keep request handlers fast.
- **Horizontal readiness**: Stateless services; externalize state; idempotent handlers; collision‑safe keys.
- **Data access**: Use pagination/streaming for large datasets; avoid loading everything into memory.
- **Concurrency**: Protect shared resources; timeouts; retry with backoff + jitter; circuit breakers.
- **Config**: All tunables via environment/config, not hardcoded; document sane defaults and limits.

## Responsiveness (Frontend/UI and APIs)
- **Performance budgets**: Define budgets (TTFB, LCP, JS size) and enforce in CI where possible.
- **Progressive enhancement**: Core features work without JS where feasible; defer non‑critical JS.
- **Lazy loading**: Code‑split routes/components; defer off‑screen work; prioritize above‑the‑fold.
- **Perceived speed**: Use skeletons/placeholders; optimistic UI only when safe and reversible.
- **Accessibility**: Meet WCAG 2.2 AA; semantic HTML; labels; focus management; color contrast.
- **Mobile first**: Responsive layouts/grids; pointer/keyboard users supported; test at multiple DPRs.
- **API responsiveness**: Keep endpoints predictable; return partials/streams for long tasks; include `Retry‑After`.

## Reliability and Error Handling
- **Defensive inputs**: Validate at boundaries; reject early with actionable messages.
- **Time limits**: Timeouts on all external calls; resource ceilings (memory/cpu) where supported.
- **Idempotency**: Idempotent endpoints for create/retry flows; use idempotency keys.
- **Fallbacks**: Graceful degradation for optional features; feature flags around risky paths.
- **Observability**: Structured logs (no secrets), metrics (SLI/SLO), and traces; correlate with request IDs.

## Security and Privacy
- **Secrets**: Never hardcode. Use a secrets manager; rotate; least‑privilege credentials.
- **Input handling**: Sanitize/encode outputs; parameterized queries; avoid eval/dynamic code execution.
- **Dependencies**: Pin versions; run SCA/SBOM; avoid unmaintained or unvetted libraries; remove unused deps.
- **AuthN/Z**: Enforce at the boundary; default‑deny; check object‑level access; log auth decisions.
- **Data minimization**: Collect only what’s needed; encrypt in transit/at rest; redact PII from logs.

## Testing and Quality Gates
- **Coverage with purpose**: Unit tests for logic; integration for boundaries; E2E for flows. Target meaningful coverage, not 100%.
- **Determinism**: Tests must be hermetic and deterministic; control time, randomness, and network via fakes.
- **Assertions**: Clear, behavior‑focused assertions including edge and failure cases.
- **CI gates**: Format, lint, type‑check, tests, SAST, secret scan must pass before merge.
- **Fixtures**: Reusable, realism‑balanced fixtures. Reset shared state between tests.

## API and Schema Design
- **Stability**: Version externally consumed APIs; document breaking changes; provide deprecation paths.
- **Principle of least surprise**: Predictable status codes, pagination, filtering, and error shapes.
- **Contracts**: Use OpenAPI/GraphQL SDL/Protobuf; generate clients/validators; keep schemas authoritative.
- **Idempotency and ordering**: Clarify guarantees; include cursors/timestamps; avoid ambiguous sorting.

## Data and Migrations
- **Backward compatibility**: Expand‑then‑migrate‑then‑contract. Write code that tolerates old/new schema.
- **Reversible**: Provide roll‑forward and rollback scripts; practice on staging snapshots.
- **Indices**: Add appropriate indexes with concurrency; monitor query plans post‑deploy.

## Dependencies and Build
- **Lockfiles**: Commit lockfiles; reproduce builds; verify integrity where supported.
- **Minimalism**: Prefer stdlib and well‑known libs; justify every new dep; remove transitive bloat.
- **Build speed**: Cache, incremental builds, and parallelization; measure and keep under budgets.

## CI/CD and Release Management
- **Small PRs**: Atomic, reviewable changes with clear descriptions and acceptance criteria.
- **Semantic versioning**: Follow SemVer; changelog entries per user‑visible change.
- **Rollout safety**: Blue/green or canary; health checks; automated rollback triggers.
- **Provenance**: Generate SBOM; sign artifacts; attest builds.

## Code Review Checklist (Quick)
- Readability: names, structure, comments (non‑obvious rationale only)
- Correctness: tests included and passing; edge cases handled
- Security: input validation, authZ checks, secret handling
- Performance: obvious hot paths, N+1, memory usage
- UX/Accessibility: responsive, keyboard navigable, semantic markup
- Ops: logs/metrics/traces in place; error messages actionable
- Scope: minimal surface area; avoids unnecessary new dependencies

## Example Snippets

### Early returns and guard clauses
```ts
function generateReport(input: ReportInput): Report {
  if (!isValidInput(input)) {
    throw new Error('Invalid report input');
  }
  if (input.items.length === 0) {
    return createEmptyReport();
  }
  // happy path logic...
}
```

### Idempotent handler with timeout and retries
```ts
async function createOrder(req: Request): Promise<Response> {
  const idempotencyKey = req.headers.get('Idempotency-Key');
  if (!idempotencyKey) return badRequest('Missing Idempotency-Key');

  return withTimeout(3000, async () =>
    withRetry({ retries: 2, backoffMs: 200, jitter: true }, async () => {
      const existing = await orders.findByKey(idempotencyKey);
      if (existing) return ok(existing);
      const created = await orders.create(req.body);
      await orders.remember(idempotencyKey, created.id);
      return ok(created);
    })
  );
}
```

### Pagination contract
```json
{
  "data": [ /* items */ ],
  "nextCursor": "opaque-string-or-null",
  "total": 1234
}
```

---
Adopt, adapt, and enforce these rules via tooling (formatter/linter/types/tests/scans) and reviews. Keep this file current as the codebase evolves.