# Accordion

Converted accordion keeps a single open section and toggles content visibility.

## Sub-features

- `accordion-default` First item starts open.
- `accordion-toggle` Opening another item closes the previous one.

## How to get to it (user POV)

- Visit /shadcn/accordion.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Toggle.** Click Is it styled?. That item data-state=open; accessible item becomes closed.

## Gotchas

- Single collapsible type only in the demo.
