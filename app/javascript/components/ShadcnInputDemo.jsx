import React from "react"

import { Input } from "./ui/input"

export default function ShadcnInputDemo() {
  return (
    <div className="grid max-w-sm gap-3">
      <Input type="email" placeholder="name@example.com" />
      <Input placeholder="Disabled input" disabled />
      <Input type="file" />
    </div>
  )
}
