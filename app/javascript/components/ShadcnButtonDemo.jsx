import React from "react"

import { Button } from "./ui/button"

export default function ShadcnButtonDemo() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">shadcn prop API</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add item">
            +
          </Button>
          <Button variant="secondary" size="sm">
            Secondary / Small
          </Button>
          <Button variant="outline" size="lg">
            Outline / Large
          </Button>
          <Button variant="destructive" size="sm">
            Destructive / Small
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">BEM-like class composition</p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="c-button c-button--default">
            Default
          </button>
          <button type="button" className="c-button c-button--default c-button--sm">
            Small
          </button>
          <button type="button" className="c-button c-button--default c-button--lg">
            Large
          </button>
          <button type="button" className="c-button c-button--default c-button--icon" aria-label="Add item">
            +
          </button>
          <button type="button" className="c-button c-button--secondary c-button--sm">
            Secondary / Small
          </button>
          <button type="button" className="c-button c-button--outline c-button--lg">
            Outline / Large
          </button>
          <button type="button" className="c-button c-button--destructive c-button--sm">
            Destructive / Small
          </button>
        </div>
      </div>
    </div>
  )
}
