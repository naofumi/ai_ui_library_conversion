import React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "../../lib/utils"

function NativeSelect({ className, size = "default", ...props }) {
  return (
    <div className="group/native-select relative w-fit has-[select:disabled]:opacity-50" data-slot="native-select-wrapper">
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "h-9 w-full min-w-0 appearance-none rounded-md border border-zinc-200 bg-transparent px-3 py-2 pr-9 text-sm text-zinc-950 shadow-xs outline-none transition-[color,box-shadow] disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1 focus-visible:border-zinc-400 focus-visible:ring-[3px] focus-visible:ring-zinc-400/50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 select-none text-zinc-500 opacity-50"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption({ className, ...props }) {
  return <option data-slot="native-select-option" className={cn("bg-[Canvas] text-[CanvasText]", className)} {...props} />
}

function NativeSelectOptGroup({ className, ...props }) {
  return <optgroup data-slot="native-select-optgroup" className={cn("bg-[Canvas] text-[CanvasText]", className)} {...props} />
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
