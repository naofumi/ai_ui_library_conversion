import React from "react"

import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"

export default function ShadcnCheckboxDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" defaultChecked />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">Send me product updates</Label>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled" className="opacity-50">
          Disabled option
        </Label>
      </div>
    </div>
  )
}
