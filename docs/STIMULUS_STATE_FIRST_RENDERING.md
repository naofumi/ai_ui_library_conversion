# Stimulus State-First Rendering Approach

## Why This Exists
For simple Stimulus controllers, direct DOM updates are fine.
For complex interactive components (like the combobox), ad-hoc updates can become hard to reason about.

This document captures a stricter pattern:
- one-way data flow
- explicit state mutation
- centralized rendering from state

Read this after `docs/CONVERSION_APPROACH.md` when the converted side needs multi-state or nontrivial keyboard behavior.

## Decision Tree
Use the simplest tier that preserves parity:

1. **Static** — source has no runtime UI behavior → no Stimulus.
2. **Small Stimulus** — a few toggles, open/close, or simple selection → small controller with direct DOM updates (see dialog / dropdown menu previews).
3. **State-first** — use this document when most of the following are true:
   - multiple interactive states (open, filter text, highlight index, selected value, empty results, …)
   - nontrivial keyboard handling (arrows, Enter, Escape, typeahead)
   - ARIA patterns that need a single source of truth (e.g. `aria-activedescendant`)
   - rich parity with a composed shadcn source (popover + command, etc.)

Overlays that only open/close (dialog, basic dropdown, tooltip) usually stay on the small-Stimulus tier.

## Core Idea
Treat the controller as a tiny state machine:

1. Event handler mutates state.
2. Call a single render entrypoint.
3. Apply non-state side effects (focus/scroll) after render.

The render layer should be a projection of current state, not a place that mutates state.

## Practical Rules
- Keep query methods pure when possible.
  - Example: `#filterOptionsWithString(inputValue)` returns results, does not mutate controller state.
- Keep mutation points explicit.
  - Example: `this.#filteredOptions = ...` happens at call sites.
- Keep rendering centralized.
  - Example: `#render()` calls `#renderPanel()`, `#renderOptions()`, `#renderActiveOption()`, etc.
- Keep non-state UI work outside render.
  - Example: `focus()` and `scrollIntoView()` happen in handlers after `#render()`.
- Avoid duplicated state unless necessary.
  - If hidden input is the selected value source, use `this.valueInputTarget.value` consistently rather than mirroring with another property.
- Prefer CSS for visual state over JS DOM querying where possible.
  - Example: selected checkmark visibility driven by `aria-selected` + Tailwind classes.

## Invariants
- Single render entrypoint after meaningful state changes.
- No state mutation inside render methods.
- Side effects (focus, scroll) run after render, not inside pure projections.

## Recommended Method Order
For readability, keep methods grouped in this order:

1. event handlers
2. event-handler-adjacent methods (methods handlers dispatch to directly - dispatchables)
3. state manipulation methods (model-ish methods)
4. render methods

## What This Improves
- Reduces missed partial updates.
- Makes handlers easier to read: mutate -> render -> side effects.
- Makes refactors safer because render paths are centralized.
- Makes intent clearer (CQS-friendly structure), even in non-React code.

## Tradeoff
This is intentionally more structured than typical small Stimulus controllers.
For trivial controllers, this can be unnecessary overhead.

## Reference Implementation
The combobox controller is the reference implementation of this pattern:

- Path: `app/javascript/controllers/combobox_preview_controller.js`
- Showcase: `/shadcn/combobox`
- Traits to copy: state-first updates, full render after each meaningful state change, explicit post-render focus/scroll handling, CSS-driven selection visuals

It is not meant to be the minimal Stimulus style; it is meant to be the maintainable style for complex widgets.

## Parity Scenarios (combobox-class widgets)
When verifying a state-first controller, exercise at least:
- open / close
- filter narrows options; empty state when no matches
- arrow keys move highlight; Enter selects
- Escape closes (and restores expected focus)
- selecting an option updates the visible value and closes
- reopening reflects the current selection
