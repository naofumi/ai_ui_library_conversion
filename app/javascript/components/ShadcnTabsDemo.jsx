import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export default function ShadcnTabsDemo() {
  return (
    <Tabs defaultValue="account" className="max-w-md">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
        Make changes to your account here. Click save when you are done.
      </TabsContent>
      <TabsContent value="password" className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
        Change your password here. After saving, you will be logged out.
      </TabsContent>
    </Tabs>
  )
}
