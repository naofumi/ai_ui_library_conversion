import React from "react"

import { cn } from "../../lib/utils"

const DropdownMenuContext = React.createContext(null)

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("DropdownMenu components must be used inside <DropdownMenu>")
  }
  return context
}

function DropdownMenu({ children, defaultOpen = false, open: openProp, onOpenChange }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp === undefined ? internalOpen : openProp
  const containerRef = React.useRef(null)

  const setOpen = React.useCallback(
    (nextValue) => {
      const value = typeof nextValue === "function" ? nextValue(open) : nextValue
      if (openProp === undefined) {
        setInternalOpen(value)
      }
      if (onOpenChange) {
        onOpenChange(value)
      }
    },
    [open, openProp, onOpenChange]
  )

  React.useEffect(() => {
    if (!open) return undefined

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    const closeOnOutsidePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    window.addEventListener("mousedown", closeOnOutsidePointerDown)
    return () => {
      window.removeEventListener("keydown", closeOnEscape)
      window.removeEventListener("mousedown", closeOnOutsidePointerDown)
    }
  }, [open, setOpen])

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-block">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({ className, children, ...props }) {
  const { open, setOpen } = useDropdownMenuContext()

  return (
    <button
      type="button"
      data-slot="dropdown-menu-trigger"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-xs transition-all hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </button>
  )
}

function DropdownMenuContent({ className, children, ...props }) {
  const { open } = useDropdownMenuContext()
  if (!open) return null

  return (
    <div
      data-slot="dropdown-menu-content"
      className={cn(
        "absolute top-full left-0 z-50 mt-2 min-w-48 rounded-md border border-zinc-200 bg-white p-1 shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownMenuLabel({ className, ...props }) {
  return <div data-slot="dropdown-menu-label" className={cn("px-2 py-1.5 text-sm font-semibold text-zinc-900", className)} {...props} />
}

function DropdownMenuSeparator({ className, ...props }) {
  return <div data-slot="dropdown-menu-separator" className={cn("-mx-1 my-1 h-px bg-zinc-200", className)} {...props} />
}

function DropdownMenuItem({ className, inset = false, onSelect, ...props }) {
  const { setOpen } = useDropdownMenuContext()

  return (
    <button
      type="button"
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 outline-none transition-colors hover:bg-zinc-100",
        inset && "pl-8",
        className
      )}
      onClick={(event) => {
        if (onSelect) {
          onSelect(event)
        }
        setOpen(false)
      }}
      {...props}
    />
  )
}

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem }
