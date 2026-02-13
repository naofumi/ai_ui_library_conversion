import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["alert"]

  dismiss() {
    this.alertTarget.classList.add("hidden")
  }

  reset() {
    this.alertTarget.classList.remove("hidden")
  }
}
