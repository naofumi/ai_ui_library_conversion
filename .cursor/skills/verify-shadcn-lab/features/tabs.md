# Tabs

Converted tabs switch visible panels and keep a disabled tab inert.

## Sub-features

- `tabs-default` Account panel visible initially.
- `tabs-switch` Password tab reveals password panel copy.
- `tabs-disabled` Disabled tab remains disabled.

## How to get to it (user POV)

- Visit /shadcn/tabs.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Switch.** Click Password in Converted panel. Password copy appears; Account copy is gone.

## Gotchas

- Active trigger uses `.sc-tabs__trigger--active`.
