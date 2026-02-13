import React from "react"

export default function ShadcnButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        React Button
      </button>
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100"
      >
        Secondary
      </button>
    </div>
  )
}
