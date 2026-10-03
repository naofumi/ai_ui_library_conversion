import React from "react"

import { Skeleton } from "./ui/skeleton"

export default function ShadcnSkeletonDemo() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="grid gap-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
