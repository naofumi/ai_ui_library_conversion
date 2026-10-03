# Label

Converted labels associate with inputs and can show a disabled appearance.

## Sub-features

- `label-for` Email label for=converted-email.
- `label-disabled` Disabled label/input pair is present.

## How to get to it (user POV)

- Visit /shadcn/label.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert association.** label[for=converted-email] and input#converted-email exist.

## Gotchas

- Static; click association is native browser behavior.
