import React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-zinc-900 text-white",
        secondary: "border-transparent bg-zinc-100 text-zinc-900",
        destructive: "border-transparent bg-red-600 text-white",
        outline: "border-zinc-200 text-zinc-900"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Badge = React.forwardRef(function Badge({ className, variant, ...props }, ref) {
  return <div ref={ref} data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
})

export { Badge, badgeVariants }
