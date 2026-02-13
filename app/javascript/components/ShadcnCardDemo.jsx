import React from "react"

export default function ShadcnCardDemo() {
  return (
    <div className="max-w-sm rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold tracking-tight text-zinc-900">Card Title</h3>
      <p className="mt-1 text-sm text-zinc-600">Card description text that explains content at a glance.</p>
      <div className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
        Body content area for converted component parity checks.
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-md bg-zinc-900 px-3 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
        >
          Action
        </button>
      </div>
    </div>
  )
}
