import React from "react"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function ShadcnAlertDemo() {
  return (
    <div className="grid max-w-lg gap-3">
      <Alert>
        <div data-slot="alert-icon" className="mt-0.5 size-2.5 rounded-full bg-zinc-900" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <div data-slot="alert-icon" className="mt-0.5 size-2.5 rounded-full bg-red-700" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
      </Alert>
    </div>
  )
}
