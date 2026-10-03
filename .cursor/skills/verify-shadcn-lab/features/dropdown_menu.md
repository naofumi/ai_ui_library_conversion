# Dropdown Menu

Converted dropdown opens a menu surface with grouped items and closes on item selection.

## Sub-features

- `menu-open` Open menu reveals `[role=menu]`.
- `menu-items` Profile, Billing, Settings, Log out items exist.
- `menu-close` Choosing an item hides the menu.

## How to get to it (user POV)

- Visit /shadcn/dropdown_menu.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Open.** Click Open menu. Menu is not `.hidden`.
- **Select.** Click Settings. Menu is `.hidden` again.

## Gotchas

- Trigger uses aria-haspopup=menu.
