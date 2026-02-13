# Handoff

## Current Baseline
Continue from commit: `ba6b447`

Recent follow-up commits:
- `1ca0299` - badge outline border color parity fix
- `a172ed8` - switched React mount points to `data-react` attributes

## Implemented Components
- Button (`/button`)
- Badge (`/badge`)
- Card (`/card`)
- Alert (`/alert`)
- Input (`/input`)
- Dialog (`/dialog`)

Each page uses side-by-side comparison:
- Left: React source using shadcn-style primitives.
- Right: Converted Rails ERB/Tailwind/Stimulus.

## Key Files
- `app/javascript/components/ui/button.jsx`
- `app/javascript/components/ui/badge.jsx`
- `app/javascript/components/ui/card.jsx`
- `app/javascript/components/ui/alert.jsx`
- `app/javascript/components/ui/input.jsx`
- `app/javascript/components/ui/dialog.jsx`
- `app/javascript/lib/utils.js`
- `app/javascript/shadcn_preview.jsx`
- `app/controllers/showcase_controller.rb`
- `app/views/showcase/*.html.erb`

## Working Conventions
- Keep React mount points on `data-react` attributes.
- Keep Yarn as package manager.
- Keep parity with shadcn as the primary goal.
- For now, alert behavior remains as implemented (no additional ARIA sync logic beyond current parity setup).

## Suggested Next Work
- Add next components (suggested order): `DropdownMenu`.
- Extract reusable comparison layout/partials to reduce duplicate page markup.
- Continue parity checks component-by-component with targeted commits.
