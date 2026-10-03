# Dialog

Converted dialog opens a modal overlay, shows titled content, and closes via Cancel, Escape, or backdrop.

## Sub-features

- `dialog-open` Edit profile opens the dialog panel.
- `dialog-close-button` Cancel hides the overlay.
- `dialog-close-escape` Escape hides the overlay.

## How to get to it (user POV)

- Visit /shadcn/dialog.

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Open.** Click Edit profile in Converted panel. `[role=dialog]` appears with Edit profile.
- **Close button.** Click Cancel. Overlay has class `hidden`.
- **Escape.** Re-open, press Escape. Overlay is hidden again.

## Gotchas

- Scope clicks to Converted panel so React dialog is not driven.
