# AGENTS.md

## Project Goal
Build a Rails app that converts shadcn/ui components into Rails ERB + Tailwind + Stimulus equivalents, with side-by-side comparison pages.

## Scope
- **Primary:** shadcn → Hotwire (ERB + Tailwind + Stimulus) showcase conversions.
- **Out of scope:** MUI showcase pages under `/mui` are a frozen comparison experiment only. Do not modify, expand, or convert MUI components unless explicitly requested.

## Comparison Pattern
Each component showcase page should render:
- Left panel: React source implementation using real shadcn/ui component patterns (Radix-backed where applicable).
- Right panel: Converted Rails implementation (ERB + Tailwind + Stimulus when interaction is needed).

Parity (visual and behavioral) is the priority.

## Stack and Tooling
- Rails 8.1
- jsbundling-rails (esbuild)
- cssbundling-rails (Tailwind Node CLI)
- React for source-panel
- Stimulus for converted-side behavior

## JavaScript Package Manager Policy
Use Yarn for this repo.

Reason: bun is installed on this machine and can be auto-selected by bundling tasks.

Keep these overrides in place unless intentionally changing package manager policy:
- `lib/tasks/jsbundling_yarn_override.rake`
- `lib/tasks/cssbundling_yarn_override.rake`

## React Mount Convention
Do not use ID-based React mount points.

Use data attributes in views with this naming rule:
- `data-react="shadcn-<kebab-component>-demo"`

Examples: `shadcn-button-demo`, `shadcn-dropdown-menu-demo`, `shadcn-native-select-demo`.

Mounting logic lives in `app/javascript/shadcn_preview.jsx`.

## Accessibility and Parity Note
For this exercise, prioritize parity with shadcn behavior/patterns.
Do not introduce additional a11y behavior that diverges from the source without explicit request.

## Commit Style
Keep commits small and focused.
Use descriptive commit messages that name the component or parity fix.

## Read Order
1. `AGENTS.md` (this file) — scope, conventions, definition of done
2. `docs/CONVERSION_APPROACH.md` — full conversion playbook and file checklist
3. `docs/STIMULUS_STATE_FIRST_RENDERING.md` — only when the converted side needs multi-state / nontrivial keyboard behavior

## Definition of Done (new shadcn component)
- [ ] Route + empty controller action under `shadcn_showcase`
- [ ] Entry in `ShadcnShowcaseComponent::COMPONENTS`
- [ ] Showcase view with left `data-react` mount and right `<!-- CODE:converted:* -->` markers
- [ ] React demo + `ui/*` source module(s); mount registered in `shadcn_preview.jsx`
- [ ] Converted stylesheet `sc-*` classes imported from `application.tailwind.css`
- [ ] Stimulus controller registered in `controllers/index.js` only if interaction is required
- [ ] Feature file under `.cursor/skills/verify-shadcn-lab/features/` (linked from its README)
- [ ] System tests for deterministic sub-features where practical (`test/system/shadcn_showcase/`)
- [ ] `yarn build` and `yarn build:css` succeed
- [ ] Side-by-side parity checked for relevant states

## Conversion Methodology
Detailed methodology lives in `docs/CONVERSION_APPROACH.md`.

Use it as the primary reference for:
- Source-vs-converted parity workflow
- BEM-like converted CSS naming aligned with shadcn variants
- Stimulus usage boundaries and verification checklist

## Verification
Converted Hotwire panel verification is documented in `.cursor/skills/verify-shadcn-lab/`.

- Feature requirements: `.cursor/skills/verify-shadcn-lab/features/`
- Deterministic checks: `bin/rails test:system` (see `test/system/shadcn_showcase/`)
- Helpers: `bin/verify-shadcn-lab-doctor`, `bin/verify-shadcn-lab-system-tests`
