# Component index

The index lists every registered shadcn conversion so a user can open a side-by-side comparison page.

## Sub-features

- `index-list` Shows a card for each registered component with name and description.
- `index-open` Open comparison navigates to /shadcn/<key>.
- `index-complete` Every component in ShadcnShowcaseComponent appears exactly once.

## How to get to it (user POV)

- Open http://127.0.0.1:3000/ (root).

## Driving it with Rails system tests / browser

Preconditions:

- App healthy (`scripts/doctor` passes) or `bin/rails test:system` with built assets.
- Converted panel is the only target.

- **Scan cards.** Visit `/`. Assert headings for Button, Tabs, Combobox, Skeleton, and every other registered name.
- **Open a comparison.** Click Open comparison on Checkbox. URL becomes `/shadcn/checkbox` and the page title contains Checkbox Conversion.

## Gotchas

- Index cards come only from ShadcnShowcaseComponent. Hand-edited cards are not used.
- MUI index at /mui is out of scope for this skill.
