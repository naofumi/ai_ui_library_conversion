import React from "react"
import { createRoot } from "react-dom/client"
import ShadcnButtonDemo from "./components/ShadcnButtonDemo"
import ShadcnBadgeDemo from "./components/ShadcnBadgeDemo"
import ShadcnCardDemo from "./components/ShadcnCardDemo"
import ShadcnAlertDemo from "./components/ShadcnAlertDemo"

const roots = new WeakMap()

function mountReactDemo(elementId, DemoComponent) {
  const element = document.getElementById(elementId)
  if (!element) return

  let root = roots.get(element)
  if (!root) {
    root = createRoot(element)
    roots.set(element, root)
  }

  root.render(<DemoComponent />)
}

function mountAllDemos() {
  mountReactDemo("react-shadcn-button-demo", ShadcnButtonDemo)
  mountReactDemo("react-shadcn-badge-demo", ShadcnBadgeDemo)
  mountReactDemo("react-shadcn-card-demo", ShadcnCardDemo)
  mountReactDemo("react-shadcn-alert-demo", ShadcnAlertDemo)
}

document.addEventListener("turbo:load", mountAllDemos)
