# Checkbox

Converted checkboxes cover checked, unchecked, and disabled states with associated labels.

## Sub-features

- `checkbox-checked` Terms checkbox is checked.
- `checkbox-unchecked` Marketing checkbox is unchecked.
- `checkbox-disabled` Disabled checkbox cannot be used.

## How to get to it (user POV)

- Visit /shadcn/checkbox.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert states.** Verify #converted-terms checked, #converted-marketing unchecked, disabled checkbox disabled.

## Gotchas

- Native checkbox with `.sc-checkbox` styling.
