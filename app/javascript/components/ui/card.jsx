import React from "react"

import { cn } from "../../lib/utils"

const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn("bg-white text-zinc-950 flex flex-col gap-6 rounded-xl border border-zinc-200 py-6 shadow-sm", className)}
      {...props}
    />
  )
})

const CardHeader = React.forwardRef(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6", className)}
      {...props}
    />
  )
})

const CardTitle = React.forwardRef(function CardTitle({ className, ...props }, ref) {
  return <div ref={ref} data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
})

const CardDescription = React.forwardRef(function CardDescription({ className, ...props }, ref) {
  return <div ref={ref} data-slot="card-description" className={cn("text-zinc-500 text-sm", className)} {...props} />
})

const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} data-slot="card-content" className={cn("px-6", className)} {...props} />
})

const CardFooter = React.forwardRef(function CardFooter({ className, ...props }, ref) {
  return <div ref={ref} data-slot="card-footer" className={cn("flex items-center px-6", className)} {...props} />
})

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
