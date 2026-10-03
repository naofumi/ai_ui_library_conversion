import React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function ShadcnAvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback className="text-base">AB</AvatarFallback>
      </Avatar>
    </div>
  )
}
