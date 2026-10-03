import React from "react"

import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function ShadcnLabelDemo() {
  return (
    <div className="grid max-w-sm gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="disabled-email" className="opacity-50">
          Disabled
        </Label>
        <Input id="disabled-email" type="email" placeholder="Unavailable" disabled />
      </div>
    </div>
  )
}
