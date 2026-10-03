# Radio Group

Converted radio group allows a single selection among options including a disabled item.

## Sub-features

- `radio-default` Comfortable is initially checked.
- `radio-change` Choosing Default moves the selection.
- `radio-disabled` Disabled option stays disabled.

## How to get to it (user POV)

- Visit /shadcn/radio_group.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Change selection.** Choose Default. #converted-r1 checked and #converted-r2 unchecked.

## Gotchas

- Use within_converted_panel so React radios are not selected.
