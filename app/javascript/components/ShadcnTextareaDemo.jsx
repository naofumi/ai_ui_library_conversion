import React from "react"

import { Textarea } from "./ui/textarea"

export default function ShadcnTextareaDemo() {
  return (
    <div className="grid max-w-sm gap-3">
      <Textarea placeholder="Type your message here." />
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  )
}
