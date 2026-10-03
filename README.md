# ShadCN Conversion Lab

Rails app for comparing real shadcn/ui React components against converted Rails HTML/CSS/JS (Hotwire) implementations.

## Demo

Side-by-side click-through of Source (React) and Converted (Hotwire) panels for dialog, tabs, accordion, tooltip, combobox, and checkbox:

<video src="docs/media/shadcn_hotwire_demo.mp4" controls playsinline width="100%" title="ShadCN React vs Hotwire demo">
  <a href="docs/media/shadcn_hotwire_demo.mp4">Download the demo video</a>
</video>

Recording path: [`docs/media/shadcn_hotwire_demo.mp4`](docs/media/shadcn_hotwire_demo.mp4).

## Goal

Each showcase page renders two panels side by side:

- `Source (React)`: a React implementation using real shadcn/ui patterns and Radix primitives.
- `Converted (Rails + Tailwind + Stimulus)`: the target implementation using ERB, Tailwind classes, and Stimulus only when interaction is needed.

## Stack

- Rails 8.1 (`jsbundling-rails`, `cssbundling-rails`)
- React + esbuild
- Tailwind CSS (Node toolchain)
- Stimulus for interaction behavior

## Local setup

```bash
bundle install
yarn install
bin/rails db:prepare
```

## Run the app

```bash
bin/dev
```

Then open `http://localhost:3000`.

## Showcase tracks

**Primary — shadcn → Hotwire** (`/`): component index driven by `ShadcnShowcaseComponent`. Pages live under `/shadcn/<component>` (button, badge, card, alert, input, dialog, dropdown_menu, combobox, native_select, and others as they are added).

**Out of scope — MUI** (`/mui`): a small parallel experiment (button, input, dropdown_menu) kept only to show that denser closed libraries are harder to convert. Do not modify this track.

## File map

- `app/models/shadcn_showcase_component.rb`: shadcn component registry (index cards)
- `app/controllers/shadcn_showcase_controller.rb`: shadcn showcase pages + code extraction
- `app/views/shadcn_showcase/*`: side-by-side comparison pages
- `app/javascript/components/Shadcn*Demo.jsx`: React source demos
- `app/javascript/components/ui/*`: shadcn-style React UI modules (Radix-backed where applicable)
- `app/javascript/shadcn_preview.jsx`: React mount points (`data-react`)
- `app/assets/stylesheets/components/*.css`: converted `sc-*` (and frozen `mu-*`) styles
- `app/javascript/controllers/*_preview_controller.js`: Stimulus behavior for converted demos
- `docs/CONVERSION_APPROACH.md`: full conversion playbook for humans and agents
- `docs/STIMULUS_STATE_FIRST_RENDERING.md`: pattern for complex Stimulus widgets
- `AGENTS.md`: concise agent operating notes

MUI equivalents live under `mui_showcase_*`, `mui_preview.jsx`, and `MUI*Demo.jsx`.

## Important note on package manager selection

Because `bun` may be installed, bundling tasks can prefer Bun unexpectedly.

This project forces Yarn via:

- `lib/tasks/jsbundling_yarn_override.rake`
- `lib/tasks/cssbundling_yarn_override.rake`

## Adding a new component comparison

Follow the checklist in [`docs/CONVERSION_APPROACH.md`](docs/CONVERSION_APPROACH.md). In short:

1. Add route + controller action under `shadcn_showcase`.
2. Register the component in `ShadcnShowcaseComponent::COMPONENTS` (do not hand-edit index cards).
3. Create the showcase ERB with source/converted panels and `CODE:converted` markers.
4. Add React `ui/*` module + `Shadcn*Demo.jsx`, mount from `shadcn_preview.jsx`.
5. Add converted `sc-*` CSS and import it from `application.tailwind.css`.
6. Add Stimulus only if the source is interactive; register in `controllers/index.js`.
7. Run `yarn build` and `yarn build:css`, then verify side-by-side parity.
