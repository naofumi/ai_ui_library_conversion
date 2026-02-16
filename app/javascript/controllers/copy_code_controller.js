import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["source", "status"]

  async copy() {
    const text = this.sourceTarget.textContent
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      this.#flashStatus("Copied")
    } catch (_error) {
      this.#flashStatus("Copy failed")
    }
  }

  #flashStatus(message) {
    if (!this.hasStatusTarget) return

    this.statusTarget.textContent = message
    this.statusTarget.classList.remove("hidden")

    clearTimeout(this.statusTimeout)
    this.statusTimeout = setTimeout(() => {
      this.statusTarget.classList.add("hidden")
    }, 1200)
  }
}
