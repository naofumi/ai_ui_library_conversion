# Dropdown Menu

Converted dropdown opens a menu surface with grouped items, closes on item selection, and supports arrow-key navigation matching Radix/shadcn behavior.

## Sub-features

- `menu-open` Open menu reveals `[role=menu]`.
- `menu-items` Profile, Billing, Settings, Log out items exist.
- `menu-close` Choosing an item hides the menu.
- `keyboard-nav` ArrowDown/ArrowUp move focus across `[role=menuitem]`; Escape closes and returns focus to the trigger.

## How to get to it (user POV)

- Visit /shadcn/dropdown_menu.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Open.** Click Open menu. Menu is not `.hidden`.
- **Select.** Click Settings. Menu is `.hidden` again.
- **Keyboard open.** Focus Open menu and press ArrowDown. Menu opens and focus moves to Profile.
- **Keyboard move.** Press ArrowDown again → Billing; ArrowUp → Profile.
- **Keyboard close.** Press Escape. Menu is `.hidden` and focus returns to Open menu.

## Gotchas

- Trigger uses aria-haspopup=menu.
- Keyboard parity follows Radix: ArrowDown/Enter/Space on the trigger open and focus the first item; ArrowUp opens and focuses the last item; Home/End jump to ends; Tab is suppressed while open.
