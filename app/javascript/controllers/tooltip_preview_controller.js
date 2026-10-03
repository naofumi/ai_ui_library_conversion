import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content"]

  show() {
    this.contentTarget.classList.remove("hidden")
    this.contentTarget.setAttribute("data-state", "delayed-open")
  }

  hide() {
    this.contentTarget.classList.add("hidden")
    this.contentTarget.setAttribute("data-state", "closed")
  }
}
