# Conversion Approach

## Goal
Convert shadcn/ui components into Rails ERB + Tailwind + Stimulus equivalents while preserving visual and behavioral parity.

## Core Principles
- Prioritize parity over refactoring.
- Keep source-panel React code close to real shadcn/ui patterns.
- Keep converted-panel markup portable HTML/CSS/JS patterns inside Rails showcases (not a separate framework).
- Use Stimulus only for runtime UI behavior (state changes/events), not for static presentation that can be expressed in ERB + CSS.
- Prefer small, focused commits per component or parity fix.

## Side-by-Side Contract
Each showcase page should include:
- Source-panel: real shadcn/ui React implementation (Radix-backed where applicable).
- Converted-panel: ERB + Tailwind + optional Stimulus.
- Code panels below: full React demo source vs extracted converted ERB snippet.

## Source of Truth
- Prefer local `app/javascript/components/ui/*` modules that follow current shadcn patterns.
- For interactive primitives, use official Radix React wrappers (dialog, dropdown menu, tabs, etc.).
- Match the source demo’s variants/states in the converted panel; do not invent extra demos unless needed for parity.

## New Component File Checklist
When adding a shadcn showcase component `<name>` (snake_case key, e.g. `dropdown_menu`):

1. **Route** — `get :<name>` in `config/routes.rb` under `scope :shadcn`.
2. **Controller** — empty action method in `ShadcnShowcaseController` (shared `set_component` / code extraction already handles demos).
3. **Registry** — add a hash to `ShadcnShowcaseComponent::COMPONENTS` in `app/models/shadcn_showcase_component.rb` (index cards are generated from this; do not hand-edit index cards).
4. **View** — `app/views/shadcn_showcase/<name>.html.erb`:
   - Left: `<div data-react="shadcn-<kebab-name>-demo">`
   - Right: converted markup between `<!-- CODE:converted:start -->` and `<!-- CODE:converted:end -->`
   - Bottom: `shared/code_panel` for source and converted code
5. **React demo** — `app/javascript/components/Shadcn<Name>Demo.jsx` (camelized action name).
6. **UI module(s)** — `app/javascript/components/ui/<kebab-name>.jsx` (and dependencies as needed).
7. **Mount** — import + `mountReactDemo("shadcn-<kebab-name>-demo", ...)` in `app/javascript/shadcn_preview.jsx`.
8. **Converted CSS** — `app/assets/stylesheets/components/<kebab-name>.css` with `sc-*` BEM classes; `@import` from `app/assets/stylesheets/application.tailwind.css`.
9. **Stimulus (if interactive)** — `app/javascript/controllers/<name>_preview_controller.js` and register in `app/javascript/controllers/index.js`.

MUI track is out of scope for this exercise (frozen comparison only). Do not modify `mu-*` styles, `mui_preview.jsx`, `MuiShowcaseComponent`, or `/mui` pages unless explicitly requested.

## Source-Panel Conventions
- Mount React demos via `data-react` attributes in ERB views.
- Keep mounting logic in `app/javascript/shadcn_preview.jsx`.
- Use shadcn-style `ui/*` component modules.
- For interactive primitives, prefer official Radix wrappers.

## Converted-Panel Conventions
- Use BEM-like component classes for reusable styling.
- Align class naming with shadcn component and variant vocabulary.
  - Example block: `sc-button`
  - Example variant: `sc-button--destructive`
  - Example size: `sc-button--sm`, `sc-button--lg`, `sc-button--icon`
  - Example element: `sc-alert__title`
- Keep utility classes minimal in views when a component stylesheet exists.
- Wrap only the converted demo markup in `CODE:converted` markers so the code panel stays clean.

## Styling Strategy
- Put reusable component styles in `app/assets/stylesheets/components/*.css`.
- Import component styles from `app/assets/stylesheets/application.tailwind.css`.
- Preserve existing variant names (`default`, `secondary`, `outline`, `destructive`, etc.) where practical.
- Rebuild CSS after stylesheet edits (`yarn build:css`).

## Complexity Tiers (Stimulus)
| Tier | When | Approach |
|------|------|----------|
| Static | No runtime behavior beyond native HTML | ERB + CSS only |
| Small Stimulus | Few toggles / open-close / simple selection | Small `*_preview_controller.js` with direct DOM updates |
| State-first | Multi-state, nontrivial keyboard, filtering, `aria-activedescendant` | Follow `docs/STIMULUS_STATE_FIRST_RENDERING.md`; reference `combobox_preview_controller.js` |

## Behavior Strategy
- If source is static, converted side should stay static.
- If source is interactive, replicate behavior with Stimulus.
- Do not add extra accessibility/behavior that diverges from source unless explicitly requested.
- Do not leave unused Stimulus controllers registered “for later.”

## Verification Strategy
Verification is tool-agnostic. Use the best available path in order:

1. **Playwright MCP** (if available in the session) for computed styles and DOM snapshots.
2. **In-session browser / computer-use tools** for side-by-side visual and interaction checks.
3. **Screenshot / screen-recording walkthrough** artifacts for representative states.
4. **Build checks** — always run `yarn build` and `yarn build:css` after JS/CSS changes.

Compare at least: default, hover, focus, disabled, and error (if present). For overlays/widgets, also exercise open/close, Escape, outside click, and keyboard paths that the source supports.

When mismatch appears, inspect source and converted computed values first, then patch CSS/ERB/Stimulus. Keep verification lightweight and iterative: inspect, patch, rebuild, re-check. Treat anti-aliasing noise as secondary.

## Component Workflow
1. Implement or verify real shadcn source demo (`ui/*` + `Shadcn*Demo.jsx`).
2. Add route, registry entry, and showcase view shell.
3. Implement converted ERB structure inside `CODE:converted` markers.
4. Add or update component stylesheet with BEM-like `sc-*` classes and import it.
5. Add Stimulus behavior only when needed for parity (choose tier above; read state-first doc when applicable).
6. Mount the React demo in `shadcn_preview.jsx`.
7. Compare source vs converted for visual/interaction parity.
8. Run build checks (`yarn build`, `yarn build:css`).
9. Commit focused changes.

## Review Checklist
- Registry entry exists so the component appears on `/`.
- Variant coverage matches source examples.
- Size/state combinations are represented where relevant.
- Converted markup uses component classes consistently and is wrapped in code markers.
- Stimulus behavior matches source interactions (or there is no Stimulus when source is static).
- No unnecessary abstractions or unrelated refactors.

## Anti-Patterns
- ID-based React mount points
- React on the converted panel
- Skipping `ShadcnShowcaseComponent` registry or `CODE:converted` markers
- Inventing a11y or behavior beyond the source demo
- Using Bun / letting bundling tasks prefer Bun over Yarn
- Large shared abstraction layers before several components need them
- Hand-maintaining index cards instead of the registry

## Documentation Sync
When approach changes, update:
- `docs/CONVERSION_APPROACH.md` (full methodology)
- `AGENTS.md` (concise operational summary + link)
- `docs/STIMULUS_STATE_FIRST_RENDERING.md` (when Stimulus complexity guidance changes)
- `README.md` (setup, page list pointers, add-component entrypoint)
