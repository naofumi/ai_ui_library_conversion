import React from "react"

import { Label } from "./ui/label"
import { Switch } from "./ui/switch"

export default function ShadcnSwitchDemo() {
  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Switch id="airplane-mode" defaultChecked />
        <Label htmlFor="airplane-mode">Airplane mode</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Notifications</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch" className="opacity-50">
          Disabled
        </Label>
      </div>
    </div>
  )
}
