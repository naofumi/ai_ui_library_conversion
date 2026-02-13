import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button"]

  toggleDisabled() {
    this.buttonTarget.disabled = !this.buttonTarget.disabled
  }
}
