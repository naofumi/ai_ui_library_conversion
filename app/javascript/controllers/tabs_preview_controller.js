import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["trigger", "content"]
  static values = { active: String }

  connect() {
    this.#render()
  }

  select(event) {
    const trigger = event.currentTarget
    if (trigger.disabled || trigger.getAttribute("aria-disabled") === "true") return

    this.activeValue = trigger.dataset.tabsPreviewValueParam
    this.#render()
  }

  #render() {
    this.triggerTargets.forEach((trigger) => {
      const selected = trigger.dataset.tabsPreviewValueParam === this.activeValue
      trigger.setAttribute("aria-selected", selected ? "true" : "false")
      trigger.setAttribute("data-state", selected ? "active" : "inactive")
      trigger.classList.toggle("sc-tabs__trigger--active", selected)
      trigger.tabIndex = selected ? 0 : -1
    })

    this.contentTargets.forEach((content) => {
      const selected = content.dataset.tabsPreviewValueParam === this.activeValue
      content.hidden = !selected
      content.setAttribute("data-state", selected ? "active" : "inactive")
    })
  }
}
