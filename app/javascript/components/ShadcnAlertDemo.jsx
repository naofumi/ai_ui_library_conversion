import React from "react"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function ShadcnAlertDemo() {
  return (
    <Alert className="max-w-lg">
      <div data-slot="alert-icon" className="mt-0.5 size-2.5 rounded-full bg-zinc-900" />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>This alert demonstrates an informational state with a dismiss action.</AlertDescription>
    </Alert>
  )
}
