# Combobox

Converted combobox opens a searchable listbox, filters options, selects a value, and shows an empty state.

## Sub-features

- `combobox-open` Trigger expands aria-expanded and shows options.
- `combobox-filter` Typing filters visible options.
- `combobox-select` Selecting updates trigger label and hidden value.
- `combobox-empty` No matches shows No framework found.

## How to get to it (user POV)

- Visit /shadcn/combobox.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Open and select.** Click the combobox, filter `astro`, click Astro. Trigger label is Astro and hidden value is astro.
- **Empty state.** Re-open, filter `zzzz-no-match`. Empty message appears.

## Gotchas

- Uses state-first Stimulus (combobox-preview). Prefer role=combobox/option selectors.
- Complex keyboard paths are covered lightly; visual/selection parity is the bar.
