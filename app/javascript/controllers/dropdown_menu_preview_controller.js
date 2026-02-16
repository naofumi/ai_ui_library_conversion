import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "trigger"]

  connect() {
    this.preserveClosedExpanded = this.hasTriggerTarget && this.triggerTarget.hasAttribute("aria-expanded")
    this.boundCloseOnEscape = this.closeOnEscape.bind(this)
    this.boundCloseOnOutsideClick = this.closeOnOutsideClick.bind(this)
    window.addEventListener("keydown", this.boundCloseOnEscape)
    window.addEventListener("mousedown", this.boundCloseOnOutsideClick)
    this.setExpanded(false)
  }

  disconnect() {
    window.removeEventListener("keydown", this.boundCloseOnEscape)
    window.removeEventListener("mousedown", this.boundCloseOnOutsideClick)
  }

  toggle() {
    const willOpen = this.contentTarget.classList.contains("hidden")
    this.contentTarget.classList.toggle("hidden")
    this.setExpanded(willOpen)
  }

  close() {
    this.contentTarget.classList.add("hidden")
    this.setExpanded(false)
  }

  closeOnEscape(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }

  closeOnOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  setExpanded(expanded) {
    if (this.hasTriggerTarget) {
      if (expanded) {
        this.triggerTarget.setAttribute("aria-expanded", "true")
      } else if (this.preserveClosedExpanded) {
        this.triggerTarget.setAttribute("aria-expanded", "false")
      } else {
        this.triggerTarget.removeAttribute("aria-expanded")
      }
    }
  }
}
