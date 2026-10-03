# ShadCN Hotwire conversion verification map

This directory is the maintained source for verifying converted (Hotwire) shadcn showcase components. Read this index before driving the app, then use the matching feature file as the recipe.

## Baseline preconditions

- Primary surface: Rails showcase web UI at `http://127.0.0.1:$PORT` (default `3000`).
- Converted panels only: never treat the left React `data-react` mount as the system under test.
- Assets must be built (`yarn build` and `yarn build:css`) before browser or system-test runs.
- Prefer deterministic Rails system tests for requirements that can be asserted in Capybara.
- MUI track (`/mui`) is out of scope.
- Run `scripts/doctor` before driving if anything looks off.

## Driving conventions

- Start from a fresh visit to the component path unless a recipe says otherwise.
- Prefer `role`, `aria-*`, `data-*-target`, and `.sc-*` classes over coordinates.
- Scope interactions with the Converted panel heading / `within_converted_panel` helper.
- Proof = user action + resulting DOM/ARIA state. Screenshots optional for visual spot-checks.

## Proof and skip reporting

- Record the feature ID and URL used with every artifact under `tmp/verify-shadcn-lab/<run-id>/`.
- System-test output and Capybara failure screenshots in `tmp/screenshots` count as proof.
- Do not claim React-panel behavior as converted parity proof.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with Rails system tests / browser`
4. `Gotchas`

## Features

- [Component index](./index.md) — The index lists every registered shadcn conversion so a user can open a side-by-side comparison page.
- [Button](./button.md) — Converted buttons expose shadcn variants and sizes, and can toggle a disabled state via Stimulus.
- [Badge](./badge.md) — Converted badges show compact status labels across semantic variants.
- [Card](./card.md) — Converted cards provide title, description, content hierarchy, and an action control.
- [Alert](./alert.md) — Converted alerts show contextual messages in default and destructive variants.
- [Input](./input.md) — Converted inputs cover email, disabled, and file field states.
- [Dialog](./dialog.md) — Converted dialog opens a modal overlay, shows titled content, and closes via Cancel, Escape, or backdrop.
- [Dropdown Menu](./dropdown_menu.md) — Converted dropdown opens a menu surface with grouped items and closes on item selection.
- [Combobox](./combobox.md) — Converted combobox opens a searchable listbox, filters options, selects a value, and shows an empty state.
- [Native Select](./native_select.md) — Converted native select styles the platform select with options and optgroups.
- [Label](./label.md) — Converted labels associate with inputs and can show a disabled appearance.
- [Textarea](./textarea.md) — Converted textareas cover enabled and disabled multi-line inputs.
- [Separator](./separator.md) — Converted separators render horizontal and vertical dividers.
- [Avatar](./avatar.md) — Converted avatars show an image avatar and fallback initials including a large size.
- [Checkbox](./checkbox.md) — Converted checkboxes cover checked, unchecked, and disabled states with associated labels.
- [Switch](./switch.md) — Converted switches use role=switch for on, off, and disabled states.
- [Radio Group](./radio_group.md) — Converted radio group allows a single selection among options including a disabled item.
- [Tabs](./tabs.md) — Converted tabs switch visible panels and keep a disabled tab inert.
- [Accordion](./accordion.md) — Converted accordion keeps a single open section and toggles content visibility.
- [Tooltip](./tooltip.md) — Converted tooltip reveals hint content on hover/focus and hides on leave/blur.
- [Progress](./progress.md) — Converted progress bars expose determinate values via ARIA.
- [Skeleton](./skeleton.md) — Converted skeletons show loading placeholders including circle and line shapes.
