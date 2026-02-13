import React from "react"

export default function ShadcnAlertDemo() {
  return (
    <div className="max-w-lg rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-amber-500" />
        <div>
          <h3 className="text-sm font-semibold">Heads up</h3>
          <p className="mt-1 text-sm text-amber-800">This alert demonstrates an informational state with a dismiss action.</p>
        </div>
      </div>
    </div>
  )
}
