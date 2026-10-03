# Badge

Converted badges show compact status labels across semantic variants.

## Sub-features

- `badge-variants` default, secondary, outline, and destructive badges render.

## How to get to it (user POV)

- Visit /shadcn/badge.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert variants.** In Converted panel find `.sc-badge--default`, `--secondary`, `--outline`, `--destructive`.

## Gotchas

- Static component: no Stimulus required.
