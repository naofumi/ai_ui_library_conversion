import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["trigger", "triggerLabel", "panel", "input", "option", "emptyMessage", "valueInput"]
  #open = false
  #activeIndex = -1
  #filteredOptions = []

  connect() {
    this.boundCloseOnOutsideClick = this.#handleOutsideClick.bind(this)
    this.boundCloseOnEscape = this.#handleEscape.bind(this)
    window.addEventListener("mousedown", this.boundCloseOnOutsideClick)
    window.addEventListener("keydown", this.boundCloseOnEscape)
    this.#filteredOptions = this.#filterOptionsWithString(this.inputTarget.value)
    this.#syncActiveIndexWithFilteredOptions()

    this.#renderOptions()
    this.#renderActiveOption()
  }

  disconnect() {
    window.removeEventListener("mousedown", this.boundCloseOnOutsideClick)
    window.removeEventListener("keydown", this.boundCloseOnEscape)
  }

  toggle() {
    if (this.#open) {
      this.#closePanel()
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
        this.#changeActiveIndexUsingDirection(0)

        this.#renderActiveOption()
        this.#scrollActiveOptionIntoView()
      } else {
        this.#changeActiveIndexUsingDirection(1)

        this.#renderActiveOption()
        this.#scrollActiveOptionIntoView()
      }
    }
  }

  handleInputKeydown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      this.#changeActiveIndexUsingDirection(1)

      this.#renderActiveOption()
      this.#scrollActiveOptionIntoView()
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      this.#changeActiveIndexUsingDirection(-1)

      this.#renderActiveOption()
      this.#scrollActiveOptionIntoView()
      return
    }

    if (event.key === "Enter") {
      const activeOption = this.#filteredOptions[this.#activeIndex]

      if (activeOption) {
        event.preventDefault()
        this.#selectOption(activeOption)
      }
    }
  }

  handleInputFilter() {
    this.#filteredOptions = this.#filterOptionsWithString(this.inputTarget.value)
    this.#syncActiveIndexWithFilteredOptions()

    this.#renderOptions()
    this.#renderActiveOption()
  }

  select(event) {
    this.#selectOption(event.currentTarget)
  }

  #handleOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.#closePanel()
    }
  }

  #handleEscape(event) {
    if (event.key === "Escape" && this.#open) {
      this.#closePanel()
      this.triggerTarget.focus()
    }
  }

  #openPanel() {
    this.#open = true

    this.#filteredOptions = this.#filterOptionsWithString(this.inputTarget.value)
    this.#syncActiveIndexWithFilteredOptions()

    this.#renderOptions()
    this.#renderActiveOption()
    this.#renderPanel()
    this.inputTarget.focus()
  }

  #closePanel() {
    this.#open = false
    this.#activeIndex = -1

    this.#renderPanel()
  }

  #changeActiveIndexUsingDirection(direction) {
    if (this.#filteredOptions.length === 0) return

    const maxIndex = this.#filteredOptions.length - 1
    if (this.#activeIndex < 0) {
      this.#activeIndex = 0
    } else {
      const next = this.#activeIndex + direction
      this.#activeIndex = Math.max(0, Math.min(maxIndex, next))
    }
  }

  #syncActiveIndexWithFilteredOptions() {
    if (this.#filteredOptions.length === 0) {
      this.#activeIndex = -1
    } else if (this.#activeIndex < 0 || this.#activeIndex >= this.#filteredOptions.length) {
      this.#activeIndex = 0
    }
  }

  #filterOptionsWithString(inputValue) {
    const normalizedInput = inputValue.trim().toLowerCase()
    return this.optionTargets.filter((option) => {
      const label = option.dataset.label.toLowerCase()
      return label.includes(normalizedInput)
    })
  }

  #renderActiveOption() {
    this.optionTargets.forEach((option) => {
      if (option.classList.contains("hidden")) {
        option.setAttribute("data-active", "false")
        option.setAttribute("tabindex", "-1")
        return
      }
      option.setAttribute("data-active", this.#filteredOptions[this.#activeIndex] === option ? "true" : "false")
      option.setAttribute("tabindex", this.#filteredOptions[this.#activeIndex] === option ? "0" : "-1")
    })
  }

  #scrollActiveOptionIntoView() {
    this.#filteredOptions[this.#activeIndex]?.scrollIntoView({ block: "nearest" })
  }

  #renderOptions() {
    this.emptyMessageTarget.classList.toggle("hidden", this.#filteredOptions.length > 0)

    this.optionTargets.forEach((option) => {
      this.#filteredOptions.includes(option) ? option.classList.remove("hidden") : option.classList.add("hidden")
    })
  }

  #renderPanel() {
    if (this.#open) {
      this.panelTarget.classList.remove("hidden")
      this.triggerTarget.setAttribute("aria-expanded", "true")
    } else {
      this.panelTarget.classList.add("hidden")
      this.triggerTarget.setAttribute("aria-expanded", "false")
    }
  }

  #selectOption(option) {
    const value = option.dataset.value
    const label = option.dataset.label
    const alreadySelected = this.valueInputTarget.value === value
    const nextValue = alreadySelected ? "" : value
    const nextLabel = alreadySelected ? "Select framework..." : label

    this.valueInputTarget.value = nextValue
    this.triggerLabelTarget.textContent = nextLabel

    this.optionTargets.forEach((option) => {
      const selected = option.dataset.value === nextValue
      option.setAttribute("aria-selected", selected ? "true" : "false")
    })

    this.#closePanel()
    this.triggerTarget.focus()
  }
}
