import React from "react"

import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

export default function ShadcnRadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="disabled" id="r4" disabled />
        <Label htmlFor="r4" className="opacity-50">
          Disabled
        </Label>
      </div>
    </RadioGroup>
  )
}
