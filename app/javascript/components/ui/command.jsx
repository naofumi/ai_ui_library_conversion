import React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "../../lib/utils"

const Command = React.forwardRef(function Command({ className, ...props }, ref) {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-zinc-950", className)}
      {...props}
    />
  )
})

const CommandInput = React.forwardRef(function CommandInput({ className, ...props }, ref) {
  return (
    <div className="flex items-center border-b border-zinc-200 px-3" cmdk-input-wrapper="">
      <Search className="mr-2 size-4 shrink-0 text-zinc-500" />
      <CommandPrimitive.Input
        ref={ref}
        className={cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500", className)}
        {...props}
      />
    </div>
  )
})

const CommandList = React.forwardRef(function CommandList({ className, ...props }, ref) {
  return <CommandPrimitive.List ref={ref} className={cn("max-h-60 overflow-y-auto overflow-x-hidden", className)} {...props} />
})

const CommandEmpty = React.forwardRef(function CommandEmpty(props, ref) {
  return <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm text-zinc-500" {...props} />
})

const CommandGroup = React.forwardRef(function CommandGroup({ className, ...props }, ref) {
  return <CommandPrimitive.Group ref={ref} className={cn("overflow-hidden p-1 text-zinc-950", className)} {...props} />
})

const CommandItem = React.forwardRef(function CommandItem({ className, ...props }, ref) {
  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-zinc-100 data-[disabled=true]:opacity-50",
        className
      )}
      {...props}
    />
  )
})

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem }
