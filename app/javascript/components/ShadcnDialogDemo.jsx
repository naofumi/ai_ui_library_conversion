import React from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog"

export default function ShadcnDialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <label htmlFor="react-name" className="text-sm font-medium text-zinc-900">
              Name
            </label>
            <Input id="react-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="react-username" className="text-sm font-medium text-zinc-900">
              Username
            </label>
            <Input id="react-username" defaultValue="@peduarte" />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="button">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
