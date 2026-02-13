import React from "react"

import { cn } from "../../lib/utils"

function Card({ className, ...props }) {
  return <div data-slot="card" className={cn("bg-white text-zinc-950 flex flex-col gap-6 rounded-xl border border-zinc-200 py-6 shadow-sm", className)} {...props} />
}

function CardHeader({ className, ...props }) {
  return <div data-slot="card-header" className={cn("grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6", className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />
}

function CardDescription({ className, ...props }) {
  return <div data-slot="card-description" className={cn("text-zinc-500 text-sm", className)} {...props} />
}

function CardContent({ className, ...props }) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />
}

function CardFooter({ className, ...props }) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
