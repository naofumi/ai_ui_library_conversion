# Native Select

Converted native select styles the platform select with options and optgroups.

## Sub-features

- `select-control` `.sc-native-select__control` is present.
- `select-options` Status options include Todo.
- `select-groups` Engineering optgroup exists.

## How to get to it (user POV)

- Visit /shadcn/native_select.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert markup.** Find select control, Todo option, and Engineering optgroup.

## Gotchas

- Uses native select, not a custom listbox.
