# Conversion Approach

## Goal
Convert shadcn/ui components into Rails ERB + Tailwind + Stimulus equivalents while preserving visual and behavioral parity.

## Core Principles
- Prioritize parity over refactoring.
- Keep source-panel React code close to real shadcn/ui patterns.
- Keep converted-panel implementation framework-agnostic where possible.
- Use Stimulus only for runtime UI behavior (state changes/events), not for static presentation that can be expressed in ERB + CSS.
- Prefer small, focused commits per component or parity fix.

## Side-by-Side Contract
Each showcase page should include:
- Source-panel: real shadcn/ui React implementation (Radix-backed where applicable).
- Converted-panel: ERB + Tailwind + optional Stimulus.

## Source-Panel Conventions
- Mount React demos via `data-react` attributes in ERB views.
- Keep mounting logic in `app/javascript/shadcn_preview.jsx`.
- Use shadcn-style `ui/*` component modules.
- For interactive primitives, prefer official Radix wrappers (for example: dialog, dropdown menu).

## Converted-Panel Conventions
- Use BEM-like component classes for reusable styling.
- Align class naming with shadcn component and variant vocabulary.
  - Example block: `sc-button`
  - Example variant: `sc-button--destructive`
  - Example size: `sc-button--sm`, `sc-button--lg`, `sc-button--icon`
  - Example element: `sc-alert__title`
- Keep utility classes minimal in views when a component stylesheet exists.

## Styling Strategy
- Put reusable component styles in `app/assets/stylesheets/components/*.css`.
- Import component styles from `app/assets/stylesheets/application.tailwind.css`.
- Preserve existing variant names (`default`, `secondary`, `outline`, `destructive`, etc.) where practical.

## Behavior Strategy
- If source is static, converted side should stay static.
- If source is interactive, replicate behavior with Stimulus.
- Do not add extra accessibility/behavior that diverges from source unless explicitly requested.

## Component Workflow
1. Implement or verify real shadcn source demo.
2. Implement converted ERB structure.
3. Add or update component stylesheet with BEM-like classes.
4. Add Stimulus behavior only when needed for parity.
5. Compare source vs converted for visual/interaction parity.
6. Run build checks (`yarn build`, `yarn build:css`).
7. Commit focused changes.

## Review Checklist
- Variant coverage matches source examples.
- Size/state combinations are represented where relevant.
- Converted markup uses component classes consistently.
- Stimulus behavior matches source interactions.
- No unnecessary abstractions or unrelated refactors.

## Documentation Sync
When approach changes, update:
- `docs/CONVERSION_APPROACH.md` (full methodology)
- `AGENTS.md` (concise operational summary + link)
