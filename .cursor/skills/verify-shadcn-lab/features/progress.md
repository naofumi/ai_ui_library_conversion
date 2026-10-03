# Progress

Converted progress bars expose determinate values via ARIA.

## Sub-features

- `progress-values` Progressbars for 33, 66, and 100 exist.
- `progress-indicator` Each bar has `.sc-progress__indicator`.

## How to get to it (user POV)

- Visit /shadcn/progress.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert ARIA.** Find role=progressbar with aria-valuenow 33, 66, 100.

## Gotchas

- Static determinate demo; no animation assertion required.
