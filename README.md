# ShadCN Conversion Lab

Rails app for comparing real shadcn/ui React components against converted Rails HTML/CSS/JS implementations.

## Goal

Each showcase page renders two panels side by side:

- `Source (React)`: a React implementation using real shadcn/ui patterns and Radix primitives.
- `Converted (Rails + Tailwind + Stimulus)`: the target implementation using ERB, Tailwind classes, and Stimulus only when interaction is needed.

## Stack

- Rails 8 (`jsbundling-rails`, `cssbundling-rails`)
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

## Current showcase pages

- `/` component index
- `/button` button conversion example

## File map

- `app/controllers/showcase_controller.rb`: showcase pages
- `app/views/showcase/index.html.erb`: component index
- `app/views/showcase/button.html.erb`: side-by-side button comparison
- `app/javascript/components/ShadcnButtonDemo.jsx`: React source demo
- `app/javascript/components/ui/*`: real shadcn-style React UI components (Radix-backed where applicable) used by source demos
- `app/javascript/shadcn_preview.jsx`: React mount points
- `app/javascript/controllers/button_preview_controller.js`: Stimulus behavior for converted demo

## Important note on package manager selection

Because `bun` is installed on this machine, `cssbundling-rails` can prefer Bun unexpectedly.

This project forces Yarn for CSS build tasks via:

- `lib/tasks/cssbundling_yarn_override.rake`

This keeps the app aligned with the Node/Yarn workflow.

## Adding a new component comparison

1. Add a route and action in `showcase_controller.rb`.
2. Create `app/views/showcase/<component>.html.erb` with two panels.
3. Add a React source demo in `app/javascript/components`.
4. Mount it from `app/javascript/shadcn_preview.jsx`.
5. Add Stimulus controller logic only if interaction is needed.
6. Add the component card in `app/views/showcase/index.html.erb`.
