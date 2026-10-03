# Avatar

Converted avatars show an image avatar and fallback initials including a large size.

## Sub-features

- `avatar-image` Image avatar uses `.sc-avatar__image`.
- `avatar-fallback` Fallback initials JD and AB render.
- `avatar-size` Large avatar uses `.sc-avatar--lg`.

## How to get to it (user POV)

- Visit /shadcn/avatar.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert image/fallback.** Find image avatar, JD fallback, and AB large fallback.

## Gotchas

- External image host may 404 in offline CI; assert img element presence, not network load.
