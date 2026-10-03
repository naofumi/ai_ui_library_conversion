# Skeleton

Converted skeletons show loading placeholders including circle and line shapes.

## Sub-features

- `skeleton-shapes` At least three `.sc-skeleton` placeholders render.
- `skeleton-circle` A rounded-full skeleton stands in for an avatar.

## How to get to it (user POV)

- Visit /shadcn/skeleton.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert placeholders.** Find `.sc-skeleton` count >= 3 including `.rounded-full`.

## Gotchas

- Pulse animation need not be timed; class presence is enough.
