# Textarea

Converted textareas cover enabled and disabled multi-line inputs.

## Sub-features

- `textarea-enabled` Enabled `.sc-textarea` exists.
- `textarea-disabled` Disabled `.sc-textarea` exists.

## How to get to it (user POV)

- Visit /shadcn/textarea.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert states.** Find enabled and disabled textareas with `.sc-textarea`.

## Gotchas

- Static component.
