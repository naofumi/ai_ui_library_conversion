# Switch

Converted switches use role=switch for on, off, and disabled states.

## Sub-features

- `switch-on` Airplane switch is checked.
- `switch-off` Notifications switch is unchecked and toggleable.
- `switch-disabled` Disabled switch is disabled.

## How to get to it (user POV)

- Visit /shadcn/switch.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Assert states.** Find checked airplane, unchecked notifications, disabled switch.
- **Toggle.** Click #converted-notifications; it becomes checked.

## Gotchas

- Implemented as checkbox inputs with role=switch.
