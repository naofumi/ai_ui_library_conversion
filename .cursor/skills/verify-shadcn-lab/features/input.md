# Input

Converted inputs cover email, disabled, and file field states.

## Sub-features

- `input-email` Email input uses `.sc-input`.
- `input-disabled` A disabled input is present.
- `input-file` File input uses `.sc-input--file`.

## How to get to it (user POV)

- Visit /shadcn/input.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert states.** In Converted panel assert email, disabled, and file inputs with sc-input classes.

## Gotchas

- Native validation beyond presence is out of scope.
