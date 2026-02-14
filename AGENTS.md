# AGENTS.md

## Project Goal
Build a Rails app that converts shadcn/ui components into Rails ERB + Tailwind + Stimulus equivalents, with side-by-side comparison pages.

## Comparison Pattern
Each component showcase page should render:
- Left panel: React source implementation using real shadcn/ui component patterns (Radix-backed where applicable).
- Right panel: Converted Rails implementation (ERB + Tailwind + Stimulus when interaction is needed).

Parity (visual and behavioral) is the priority.

## Stack and Tooling
- Rails 8.1
- jsbundling-rails (esbuild)
- cssbundling-rails (Tailwind Node CLI)
- React for source panel
- Stimulus for converted-side behavior

## JavaScript Package Manager Policy
Use Yarn for this repo.

Reason: bun is installed on this machine and can be auto-selected by bundling tasks.

Keep these overrides in place unless intentionally changing package manager policy:
- `lib/tasks/jsbundling_yarn_override.rake`
- `lib/tasks/cssbundling_yarn_override.rake`

## React Mount Convention
Do not use ID-based React mount points.

Use data attributes in views:
- `data-react="shadcn-button-demo"`
- `data-react="shadcn-badge-demo"`
- `data-react="shadcn-card-demo"`
- `data-react="shadcn-alert-demo"`

Mounting logic lives in `app/javascript/shadcn_preview.jsx`.

## Accessibility and Parity Note
For this exercise, prioritize parity with shadcn behavior/patterns.
Do not introduce additional a11y behavior that diverges from the source without explicit request.

## Commit Style
Keep commits small and focused.
Use descriptive commit messages that name the component or parity fix.
