# Card

Converted cards provide title, description, content hierarchy, and an action control.

## Sub-features

- `card-structure` Card block includes title, description, and action button.

## How to get to it (user POV)

- Visit /shadcn/card.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert structure.** In Converted panel assert `.sc-card`, `.sc-card__title`, `.sc-card__description`, and a `.sc-button`.

## Gotchas

- Static layout parity; do not require interactivity beyond present controls.
