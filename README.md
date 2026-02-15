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
- `/mui` MUI showcase index
- `/mui/button`
- `/mui/input`
- `/mui/dropdown_menu`
- `/shadcn/button`
- `/shadcn/badge`
- `/shadcn/card`
- `/shadcn/alert`
- `/shadcn/input`
- `/shadcn/dialog`
- `/shadcn/dropdown_menu`

## File map

- `app/controllers/shadcn_showcase_controller.rb`: shadcn showcase pages
- `app/controllers/mui_showcase_controller.rb`: MUI showcase pages
- `app/views/shadcn_showcase/index.html.erb`: component index
- `app/views/mui_showcase/index.html.erb`: MUI component index
- `app/views/shadcn_showcase/button.html.erb`: side-by-side button comparison
- `app/views/mui_showcase/button.html.erb`: side-by-side MUI button comparison
- `app/views/mui_showcase/input.html.erb`: side-by-side MUI input comparison
- `app/views/mui_showcase/dropdown_menu.html.erb`: side-by-side MUI dropdown menu comparison
- `app/javascript/components/ShadcnButtonDemo.jsx`: React source demo
- `app/javascript/components/MUIButtonDemo.jsx`: React MUI source demo
- `app/javascript/components/MUIInputDemo.jsx`: React MUI input source demo
- `app/javascript/components/MUIDropdownMenuDemo.jsx`: React MUI dropdown menu source demo
- `app/javascript/components/ui/*`: real shadcn-style React UI components (Radix-backed where applicable) used by source demos
- `app/javascript/shadcn_preview.jsx`: React mount points
- `app/javascript/mui_preview.jsx`: MUI React mount points
- `app/javascript/controllers/button_preview_controller.js`: Stimulus behavior for converted demo

## Important note on package manager selection

Because `bun` is installed on this machine, `cssbundling-rails` can prefer Bun unexpectedly.

This project forces Yarn for CSS build tasks via:

- `lib/tasks/cssbundling_yarn_override.rake`

This keeps the app aligned with the Node/Yarn workflow.

## Adding a new component comparison

1. Add a route and action in `shadcn_showcase_controller.rb`.
2. Create `app/views/shadcn_showcase/<component>.html.erb` with two panels.
3. Add a React source demo in `app/javascript/components`.
4. Mount it from `app/javascript/shadcn_preview.jsx`.
5. Add Stimulus controller logic only if interaction is needed.
6. Add the component card in `app/views/shadcn_showcase/index.html.erb`.
