# Button

Converted buttons expose shadcn variants and sizes, and can toggle a disabled state via Stimulus.

## Sub-features

- `button-variants` Renders default, secondary, outline, and destructive variants.
- `button-sizes` Renders sm, default, lg, and icon sizes.
- `button-disabled` Toggle default disabled flips the Default button disabled attribute.

## How to get to it (user POV)

- From index open Button, or visit /shadcn/button.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Inspect variants.** In the Converted panel assert `.sc-button--default`, `.sc-button--secondary`, `.sc-button--outline`, `.sc-button--destructive`.
- **Toggle disabled.** Click Toggle default disabled. The Default button becomes disabled; click again to re-enable.

## Gotchas

- Only exercise the Converted panel; the left React mount is source parity reference.
