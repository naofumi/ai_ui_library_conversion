# Alert

Converted alerts show contextual messages in default and destructive variants.

## Sub-features

- `alert-default` Default alert shows Heads up! title and description.
- `alert-destructive` Destructive alert shows Error title and description.

## How to get to it (user POV)

- Visit /shadcn/alert.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert variants.** Find `.sc-alert--default` with Heads up! and `.sc-alert--destructive` with Error.

## Gotchas

- Dismiss behavior is intentionally absent; demos are static.
