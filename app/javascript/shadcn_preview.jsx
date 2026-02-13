import React from "react"
import { createRoot } from "react-dom/client"
import ShadcnButtonDemo from "./components/ShadcnButtonDemo"

function mountShadcnButtonDemo() {
  const element = document.getElementById("react-shadcn-button-demo")
  if (!element) return

  const root = createRoot(element)
  root.render(<ShadcnButtonDemo />)
}

document.addEventListener("turbo:load", mountShadcnButtonDemo)
