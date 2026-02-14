import React from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

export default function ShadcnCardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <label htmlFor="project-name" className="text-sm font-medium text-zinc-900">
            Name
          </label>
          <Input id="project-name" placeholder="shadcn-conversion" />
        </div>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
