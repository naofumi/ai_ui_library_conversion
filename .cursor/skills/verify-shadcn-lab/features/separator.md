# Separator

Converted separators render horizontal and vertical dividers.

## Sub-features

- `separator-horizontal` Horizontal separator class present.
- `separator-vertical` At least two vertical separators present.

## How to get to it (user POV)

- Visit /shadcn/separator.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert orientations.** Find `.sc-separator--horizontal` and `.sc-separator--vertical`.

## Gotchas

- Decorative separators; no interaction.
