---
name: verify-shadcn-lab
description: Verify converted Hotwire (ERB + Tailwind + Stimulus) shadcn showcase components in this Rails lab via doctor/launch scripts, feature-map recipes, and Rails system tests. Use when checking converted-panel parity, adding a component, or proving interactive Stimulus behavior.
---

# Verify ShadCN Conversion Lab (Hotwire panels)

Agent-facing skill. Drive the **converted** Rails/Hotwire panels only. The left React `data-react` mounts are source references, not the system under test. MUI (`/mui`) is out of scope.

Feature requirements live in [`features/README.md`](features/README.md). Prefer deterministic `bin/rails test:system` assertions when a requirement can be expressed in Capybara.

## Launch

Prerequisites (once per environment):

```bash
bundle install
yarn install
bin/rails db:prepare
yarn build && yarn build:css
```

Start a disposable app server for manual/browser driving (do not hijack an unrelated process):

```bash
scripts/launch
```

- Default bind: `http://127.0.0.1:${VERIFY_PORT:-3000}`
- Ready when `GET /up` returns 200 and `GET /` contains `ShadCN Conversion Lab`
- PID/log under `tmp/verify-shadcn-lab/<run-id>/`

For Rails system tests, **do not** use `scripts/launch`. Capybara boots its own server:

```bash
scripts/run-system-tests
```

## Doctor

Read-only health check before driving:

```bash
scripts/doctor
```

Passes only when:

- `ruby` / `node` / `yarn` resolve
- `app/assets/builds/application.js` and `application.css` exist
- Target URL (`VERIFY_BASE_URL` or launch metadata) answers `/up` with 200
- Root page includes `ShadCN Conversion Lab`

## Drive

1. Read [`features/README.md`](features/README.md) and the feature file for the component under test.
2. Prefer system tests for mapped deterministic requirements:

```bash
bin/rails test test/system/shadcn_showcase/static_components_test.rb
bin/rails test test/system/shadcn_showcase/interactive_components_test.rb
# or
scripts/run-system-tests
```

3. For exploratory browser driving after `scripts/launch`, scope to the Converted panel (`h2` matching `Converted (Rails`). Stable handles:
   - Routes: `/shadcn/<key>` from `ShadcnShowcaseComponent`
   - Classes: `.sc-*` BEM blocks
   - Stimulus: `data-*-preview-target`, `data-controller="*-preview"`
   - ARIA: `role=dialog|menu|combobox|option|tab|switch|progressbar`

Helpers used by system tests (`test/application_system_test_case.rb`):

- `visit_shadcn(key)`
- `within_converted_panel { ... }`

## Evidence

Proof standards:

- Exercise the real converted markup path (page visit + user control), not Stimulus internals.
- Capture action + resulting state (ARIA/DOM), not only a final screenshot.
- System-test stdout/exit code is primary proof for deterministic cases.
- Optional screenshots: `tmp/verify-shadcn-lab/<run-id>/` or Capybara failures in `tmp/screenshots/`.

Never delete proof artifacts in cleanup.

## Cleanup

```bash
scripts/cleanup
```

Stops only the server started by `scripts/launch` for the current `VERIFY_RUN_ID` (or latest run metadata). Does not kill arbitrary `ruby`/`chrome` processes by name. Leaves `tmp/verify-shadcn-lab/<run-id>/` evidence intact.

## Helpers

All scripts are under [`.cursor/skills/verify-shadcn-lab/scripts/`](scripts/) and must be invoked from the repo root (they `cd` themselves):

| Script | Purpose |
|--------|---------|
| `scripts/doctor` | Read-only readiness |
| `scripts/launch` | Start disposable `bin/rails server` |
| `scripts/run-system-tests` | Build assets if needed + `bin/rails test:system` |
| `scripts/cleanup` | Stop launch-owned server |

Example:

```bash
.cursor/skills/verify-shadcn-lab/scripts/doctor
.cursor/skills/verify-shadcn-lab/scripts/run-system-tests
```

Symlink-friendly wrappers also exist at `bin/verify-shadcn-lab-*` when present.
