import React from "react"
import { createRoot } from "react-dom/client"
import ShadcnButtonDemo from "./components/ShadcnButtonDemo"
import ShadcnBadgeDemo from "./components/ShadcnBadgeDemo"
import ShadcnCardDemo from "./components/ShadcnCardDemo"
import ShadcnAlertDemo from "./components/ShadcnAlertDemo"
import ShadcnInputDemo from "./components/ShadcnInputDemo"
import ShadcnDialogDemo from "./components/ShadcnDialogDemo"

const roots = new WeakMap()

function mountReactDemo(dataReactValue, DemoComponent) {
  const element = document.querySelector(`[data-react="${dataReactValue}"]`)
  if (!element) return

  let root = roots.get(element)
  if (!root) {
    root = createRoot(element)
    roots.set(element, root)
  }

  root.render(<DemoComponent />)
}

function mountAllDemos() {
  mountReactDemo("shadcn-button-demo", ShadcnButtonDemo)
  mountReactDemo("shadcn-badge-demo", ShadcnBadgeDemo)
  mountReactDemo("shadcn-card-demo", ShadcnCardDemo)
  mountReactDemo("shadcn-alert-demo", ShadcnAlertDemo)
  mountReactDemo("shadcn-input-demo", ShadcnInputDemo)
  mountReactDemo("shadcn-dialog-demo", ShadcnDialogDemo)
}

document.addEventListener("turbo:load", mountAllDemos)
