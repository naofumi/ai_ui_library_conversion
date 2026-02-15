import React from "react"
import { createRoot } from "react-dom/client"
import MUIButtonDemo from "./components/MUIButtonDemo"
import MUIInputDemo from "./components/MUIInputDemo"

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
  mountReactDemo("mui-button-demo", MUIButtonDemo)
  mountReactDemo("mui-input-demo", MUIInputDemo)
}

document.addEventListener("turbo:load", mountAllDemos)
