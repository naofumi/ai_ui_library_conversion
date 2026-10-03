import React from "react"

import { cn } from "../../lib/utils"

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-zinc-100", className)}
      {...props}
    />
  )
}

export { Skeleton }
