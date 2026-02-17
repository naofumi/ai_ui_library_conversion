import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["trigger", "triggerLabel", "panel", "input", "option", "empty", "valueInput"]
  #open = false
  #activeIndex = -1
  #visibleOptions = []

  connect() {
    this.boundCloseOnOutsideClick = this.#closeOnOutsideClick.bind(this)
    this.boundCloseOnEscape = this.#closeOnEscape.bind(this)
    window.addEventListener("mousedown", this.boundCloseOnOutsideClick)
    window.addEventListener("keydown", this.boundCloseOnEscape)
    this.filterOptions()
  }

  disconnect() {
    window.removeEventListener("mousedown", this.boundCloseOnOutsideClick)
    window.removeEventListener("keydown", this.boundCloseOnEscape)
  }

  toggle() {
    if (this.#open) {
      this.#close()
    } else {
      this.#openPanel()
    }
  }

  handleTriggerKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      this.toggle()
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      if (!this.#open) {
        this.#openPanel()
        this.#moveActive(0)
      } else {
        this.#moveActive(1)
      }
    }
  }

  handleInputKeydown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      this.#moveActive(1)
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      this.#moveActive(-1)
      return
    }

    if (event.key === "Enter") {
      if (this.#activeIndex >= 0 && this.#visibleOptions[this.#activeIndex]) {
        event.preventDefault()
        this.#selectOption(this.#visibleOptions[this.#activeIndex])
      }
    }
  }

  filterOptions() {
    const term = this.inputTarget.value.trim().toLowerCase()
    this.#visibleOptions = this.optionTargets.filter((option) => {
      const label = option.dataset.label.toLowerCase()
      const match = label.includes(term)
      option.classList.toggle("hidden", !match)
      return match
    })

    this.emptyTarget.classList.toggle("hidden", this.#visibleOptions.length > 0)
    this.#activeIndex = this.#visibleOptions.length > 0 ? 0 : -1
    this.#syncActiveDescendant()
  }

  select(event) {
    this.#selectOption(event.currentTarget)
  }

  #closeOnOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.#close()
    }
  }

  #closeOnEscape(event) {
    if (event.key === "Escape" && this.#open) {
      this.#close()
      this.triggerTarget.focus()
    }
  }

  #openPanel() {
    this.#open = true
    this.panelTarget.classList.remove("hidden")
    this.triggerTarget.setAttribute("aria-expanded", "true")
    this.inputTarget.focus()
    this.filterOptions()
  }

  #close() {
    this.#open = false
    this.panelTarget.classList.add("hidden")
    this.triggerTarget.setAttribute("aria-expanded", "false")
    this.#activeIndex = -1
    this.#syncActiveDescendant()
  }

  #moveActive(direction) {
    if (this.#visibleOptions.length === 0) return

    const maxIndex = this.#visibleOptions.length - 1
    if (this.#activeIndex < 0) {
      this.#activeIndex = 0
    } else {
      const next = this.#activeIndex + direction
      this.#activeIndex = Math.max(0, Math.min(maxIndex, next))
    }

    this.#syncActiveDescendant()
    this.#visibleOptions[this.#activeIndex].scrollIntoView({ block: "nearest" })
  }

  #syncActiveDescendant() {
    this.optionTargets.forEach((option) => {
      if (option.classList.contains("hidden")) {
        option.setAttribute("data-active", "false")
        option.setAttribute("tabindex", "-1")
        return
      }
      option.setAttribute("data-active", this.#visibleOptions[this.#activeIndex] === option ? "true" : "false")
      option.setAttribute("tabindex", this.#visibleOptions[this.#activeIndex] === option ? "0" : "-1")
    })
  }

  #selectOption(option) {
    const value = option.dataset.value
    const label = option.dataset.label
    const alreadySelected = this.valueInputTarget.value === value
    const nextValue = alreadySelected ? "" : value
    const nextLabel = alreadySelected ? "Select framework..." : label

    this.valueInputTarget.value = nextValue
    this.triggerLabelTarget.textContent = nextLabel

    this.optionTargets.forEach((item) => {
      const selected = item.dataset.value === nextValue
      item.setAttribute("aria-selected", selected ? "true" : "false")
      item.querySelector("[data-check]")?.classList.toggle("opacity-100", selected)
      item.querySelector("[data-check]")?.classList.toggle("opacity-0", !selected)
    })

    this.#close()
    this.triggerTarget.focus()
  }
}
