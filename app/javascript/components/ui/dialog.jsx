import React from "react"

import { cn } from "../../lib/utils"

const DialogContext = React.createContext(null)

function useDialogContext() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used inside <Dialog>")
  }
  return context
}

function Dialog({ children, defaultOpen = false, open: openProp, onOpenChange }) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp === undefined ? internalOpen : openProp

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

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, setOpen])

  return <DialogContext.Provider value={{ open, setOpen }}>{children}</DialogContext.Provider>
}

function DialogTrigger({ className, children, ...props }) {
  const { setOpen } = useDialogContext()

  return (
    <button
      type="button"
      data-slot="dialog-trigger"
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-xs transition-all hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-400",
        className
      )}
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  )
}

function DialogPortal({ children }) {
  return children
}

function DialogOverlay({ className, ...props }) {
  const { open, setOpen } = useDialogContext()
  if (!open) return null

  return (
    <div
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50", className)}
      onClick={() => setOpen(false)}
      {...props}
    />
  )
}

function DialogContent({ className, children, ...props }) {
  const { open } = useDialogContext()
  if (!open) return null

  return (
    <div data-slot="dialog-content" className="fixed inset-0 z-50 grid place-items-center p-4">
      <div
        role="dialog"
        aria-modal="true"
        className={cn("relative grid w-full max-w-lg gap-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-lg", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

function DialogClose({ className, children = "Close", ...props }) {
  const { setOpen } = useDialogContext()

  return (
    <button
      type="button"
      data-slot="dialog-close"
      className={cn(
        "rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900 shadow-xs transition-all hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-zinc-400",
        className
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </button>
  )
}

function DialogHeader({ className, ...props }) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-2 text-left", className)} {...props} />
}

function DialogFooter({ className, ...props }) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

function DialogTitle({ className, ...props }) {
  return <h2 data-slot="dialog-title" className={cn("text-lg leading-none font-semibold text-zinc-950", className)} {...props} />
}

function DialogDescription({ className, ...props }) {
  return <p data-slot="dialog-description" className={cn("text-sm text-zinc-600", className)} {...props} />
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
}
