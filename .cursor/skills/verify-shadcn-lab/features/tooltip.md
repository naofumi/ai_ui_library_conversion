# Tooltip

Converted tooltip reveals hint content on hover/focus and hides on leave/blur.

## Sub-features

- `tooltip-show` Hovering Hover shows Add to library.
- `tooltip-hide` Leaving the trigger hides the tip.

## How to get to it (user POV)

- Visit /shadcn/tooltip.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Hover.** Hover the Converted Hover button. Tip text Add to library is visible.
- **Leave.** Move pointer away. Tip has class hidden.

## Gotchas

- Computer-use hover can miss; prefer Capybara hover or CDP for deterministic proof.
- Converted tip must stay one line (`w-max` + `whitespace-nowrap`); without that, absolute positioning shrinks to the trigger width and wraps unlike Radix portals.
