import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item", "trigger", "content"]
  static values = { type: { type: String, default: "single" }, open: String }

  connect() {
    this.#render()
  }

  toggle(event) {
    const value = event.currentTarget.dataset.accordionPreviewValueParam
    if (this.typeValue === "single") {
      this.openValue = this.openValue === value ? "" : value
    }
    this.#render()
  }

  #render() {
    this.itemTargets.forEach((item) => {
      const value = item.dataset.accordionPreviewValueParam
      const open = this.openValue === value
      item.setAttribute("data-state", open ? "open" : "closed")

      const trigger = this.triggerTargets.find((el) => el.dataset.accordionPreviewValueParam === value)
      const content = this.contentTargets.find((el) => el.dataset.accordionPreviewValueParam === value)
      if (trigger) {
        trigger.setAttribute("aria-expanded", open ? "true" : "false")
        trigger.setAttribute("data-state", open ? "open" : "closed")
      }
      if (content) {
        content.hidden = !open
        content.setAttribute("data-state", open ? "open" : "closed")
      }
    })
  }
}
