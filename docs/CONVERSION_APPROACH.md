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
10. **Feature requirements** — add `.cursor/skills/verify-shadcn-lab/features/<name>.md` and link it from that skill’s `features/README.md`.
11. **Deterministic tests** — extend `test/system/shadcn_showcase/*` for sub-features that Capybara can assert reliably.

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
Verification is requirements-driven, then tool-agnostic.

### Requirements source
Per-component expectations live in the verification feature map:

- Index: `.cursor/skills/verify-shadcn-lab/features/README.md`
- One file per component: `.cursor/skills/verify-shadcn-lab/features/<component>.md`
- Skill entrypoint: `.cursor/skills/verify-shadcn-lab/SKILL.md`

Treat each feature file’s **Sub-features** as the definition of “done” for that converted panel (structure, variants/states, and interactions). Do not invent extra a11y or behavior beyond those requirements and the source demo.

When adding or changing a component:

1. Write or update its feature file first (or in the same change).
2. Cover deterministic sub-features with Rails system tests under `test/system/shadcn_showcase/`.
3. Use browser/visual tools for the rest (hover polish, anti-aliasing-sensitive styling, exploratory keyboard paths).

### How to verify
Prefer this order:

1. **Feature map + system tests** — `bin/rails test:system` (or `bin/verify-shadcn-lab-system-tests`) for converted-panel DOM/ARIA/interaction assertions listed in the feature file.
2. **Playwright MCP** (if available) for computed styles and DOM snapshots.
3. **In-session browser / computer-use tools** for side-by-side visual checks against the source panel.
4. **Screenshot / screen-recording walkthrough** artifacts for representative states.
5. **Build checks** — always run `yarn build` and `yarn build:css` after JS/CSS changes.

Compare at least the states named in the feature file. As a default floor when the feature file is thin: default, hover, focus, disabled, and error (if present). For overlays/widgets, also exercise open/close, Escape, outside click, and keyboard paths that the source supports—and record those as sub-features when they matter for parity.

When mismatch appears, inspect source and converted computed values first, then patch CSS/ERB/Stimulus (and update the feature file/tests if requirements were wrong). Keep verification lightweight and iterative: inspect, patch, rebuild, re-check. Treat anti-aliasing noise as secondary.

## Component Workflow
1. Sketch or update `.cursor/skills/verify-shadcn-lab/features/<name>.md` sub-features (what the converted panel must prove).
2. Implement or verify real shadcn source demo (`ui/*` + `Shadcn*Demo.jsx`).
3. Add route, registry entry, and showcase view shell.
4. Implement converted ERB structure inside `CODE:converted` markers.
5. Add or update component stylesheet with BEM-like `sc-*` classes and import it.
6. Add Stimulus behavior only when needed for parity (choose tier above; read state-first doc when applicable).
7. Mount the React demo in `shadcn_preview.jsx`.
8. Add/update system tests for deterministic sub-features; run `bin/rails test:system`.
9. Compare source vs converted for remaining visual/interaction parity.
10. Run build checks (`yarn build`, `yarn build:css`).
11. Commit focused changes.

## Review Checklist
- Registry entry exists so the component appears on `/`.
- Feature file exists under `.cursor/skills/verify-shadcn-lab/features/` and is linked from its README.
- Variant coverage matches source examples and feature sub-features.
- Size/state combinations are represented where relevant.
- Converted markup uses component classes consistently and is wrapped in code markers.
- Stimulus behavior matches source interactions (or there is no Stimulus when source is static).
- Deterministic sub-features have system-test coverage where practical.
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
- `.cursor/skills/verify-shadcn-lab/` (skill + feature map when verification requirements change)
