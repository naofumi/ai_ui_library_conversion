import React from "react"
import { createRoot } from "react-dom/client"
import ShadcnButtonDemo from "./components/ShadcnButtonDemo"
import ShadcnBadgeDemo from "./components/ShadcnBadgeDemo"
import ShadcnCardDemo from "./components/ShadcnCardDemo"
import ShadcnAlertDemo from "./components/ShadcnAlertDemo"
import ShadcnInputDemo from "./components/ShadcnInputDemo"
import ShadcnDialogDemo from "./components/ShadcnDialogDemo"
import ShadcnDropdownMenuDemo from "./components/ShadcnDropdownMenuDemo"
import ShadcnComboboxDemo from "./components/ShadcnComboboxDemo"
import ShadcnNativeSelectDemo from "./components/ShadcnNativeSelectDemo"
import ShadcnLabelDemo from "./components/ShadcnLabelDemo"
import ShadcnTextareaDemo from "./components/ShadcnTextareaDemo"
import ShadcnSeparatorDemo from "./components/ShadcnSeparatorDemo"
import ShadcnAvatarDemo from "./components/ShadcnAvatarDemo"
import ShadcnCheckboxDemo from "./components/ShadcnCheckboxDemo"
import ShadcnSwitchDemo from "./components/ShadcnSwitchDemo"
import ShadcnRadioGroupDemo from "./components/ShadcnRadioGroupDemo"

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
  mountReactDemo("shadcn-dropdown-menu-demo", ShadcnDropdownMenuDemo)
  mountReactDemo("shadcn-combobox-demo", ShadcnComboboxDemo)
  mountReactDemo("shadcn-native-select-demo", ShadcnNativeSelectDemo)
  mountReactDemo("shadcn-label-demo", ShadcnLabelDemo)
  mountReactDemo("shadcn-textarea-demo", ShadcnTextareaDemo)
  mountReactDemo("shadcn-separator-demo", ShadcnSeparatorDemo)
  mountReactDemo("shadcn-avatar-demo", ShadcnAvatarDemo)
  mountReactDemo("shadcn-checkbox-demo", ShadcnCheckboxDemo)
  mountReactDemo("shadcn-switch-demo", ShadcnSwitchDemo)
  mountReactDemo("shadcn-radio-group-demo", ShadcnRadioGroupDemo)
}

document.addEventListener("turbo:load", mountAllDemos)
