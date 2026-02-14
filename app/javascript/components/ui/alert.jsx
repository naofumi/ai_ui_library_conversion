import React from "react"
import { cva } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>[data-slot=alert-icon]]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>[data-slot=alert-icon]]:gap-x-3 gap-y-1 items-start",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-950 border-zinc-200",
        destructive: "text-red-700 bg-red-50 border-red-200"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Alert = React.forwardRef(function Alert({ className, variant, ...props }, ref) {
  return <div ref={ref} data-slot="alert" role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
})

const AlertTitle = React.forwardRef(function AlertTitle({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  )
})

const AlertDescription = React.forwardRef(function AlertDescription({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn("text-zinc-600 col-start-2 grid justify-items-start gap-1 text-sm", className)}
      {...props}
    />
  )
})

export { Alert, AlertTitle, AlertDescription }
