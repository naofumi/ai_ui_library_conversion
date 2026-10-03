import React from "react"

import { Progress } from "./ui/progress"

export default function ShadcnProgressDemo() {
  return (
    <div className="grid max-w-sm gap-4">
      <div className="grid gap-2">
        <p className="text-sm text-zinc-600">33%</p>
        <Progress value={33} />
      </div>
      <div className="grid gap-2">
        <p className="text-sm text-zinc-600">66%</p>
        <Progress value={66} />
      </div>
      <div className="grid gap-2">
        <p className="text-sm text-zinc-600">100%</p>
        <Progress value={100} />
      </div>
    </div>
  )
}
