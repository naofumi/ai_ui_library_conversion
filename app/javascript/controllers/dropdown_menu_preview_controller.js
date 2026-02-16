import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "trigger"]

  connect() {
    this.boundCloseOnEscape = this.#closeOnEscape.bind(this)
    this.boundCloseOnOutsideClick = this.#closeOnOutsideClick.bind(this)
    window.addEventListener("keydown", this.boundCloseOnEscape)
    window.addEventListener("mousedown", this.boundCloseOnOutsideClick)
    this.#setAriaExpanded(false)
  }

  disconnect() {
    window.removeEventListener("keydown", this.boundCloseOnEscape)
    window.removeEventListener("mousedown", this.boundCloseOnOutsideClick)
  }

  toggle() {
    const willOpen = this.contentTarget.classList.contains("hidden")
    this.contentTarget.classList.toggle("hidden")
    this.#setAriaExpanded(willOpen)
  }

  close() {
    this.contentTarget.classList.add("hidden")
    this.#setAriaExpanded(false)
  }

  #closeOnEscape(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }

  #closeOnOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  #setAriaExpanded(expanded) {
    if (this.hasTriggerTarget) {
      if (expanded) {
        this.triggerTarget.setAttribute("aria-expanded", "true")
      } else {
        this.triggerTarget.removeAttribute("aria-expanded")
      }
    }
  }
}
