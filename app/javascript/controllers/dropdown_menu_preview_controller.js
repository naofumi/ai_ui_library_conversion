import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content"]

  connect() {
    this.boundCloseOnEscape = this.closeOnEscape.bind(this)
    this.boundCloseOnOutsideClick = this.closeOnOutsideClick.bind(this)
    window.addEventListener("keydown", this.boundCloseOnEscape)
    window.addEventListener("mousedown", this.boundCloseOnOutsideClick)
  }

  disconnect() {
    window.removeEventListener("keydown", this.boundCloseOnEscape)
    window.removeEventListener("mousedown", this.boundCloseOnOutsideClick)
  }

  toggle() {
    this.contentTarget.classList.toggle("hidden")
  }

  close() {
    this.contentTarget.classList.add("hidden")
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
}
