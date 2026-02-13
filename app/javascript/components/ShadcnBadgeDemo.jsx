import React from "react"

export default function ShadcnBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="inline-flex items-center rounded-full border border-transparent bg-zinc-900 px-2.5 py-0.5 text-xs font-semibold text-zinc-50">
        Default
      </span>
      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-900">
        Secondary
      </span>
      <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
        Destructive
      </span>
      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
        Success
      </span>
    </div>
  )
}
