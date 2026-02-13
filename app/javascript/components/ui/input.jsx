import React from "react"

import { cn } from "../../lib/utils"

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-950 shadow-xs outline-none transition-all file:inline-flex file:h-7 file:cursor-pointer file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-zinc-400",
        className
      )}
      {...props}
    />
  )
}

export { Input }
