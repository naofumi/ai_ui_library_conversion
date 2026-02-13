import React from "react"

import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function ShadcnCardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text that explains content at a glance.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
          Body content area for converted component parity checks.
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  )
}
