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
    this.#render()
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

    this.#render()

    if (this.#open) {
      this.inputTarget.focus()
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
        this.#render()
        this.inputTarget.focus()
        this.#scrollActiveOptionIntoView()
      } else {
        this.#changeActiveIndexUsingDirection(1)
        this.#render()
        this.#scrollActiveOptionIntoView()
      }
    }
  }

  handleInputKeydown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      this.#changeActiveIndexUsingDirection(1)
      this.#render()
      this.#scrollActiveOptionIntoView()
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      this.#changeActiveIndexUsingDirection(-1)
      this.#render()
      this.#scrollActiveOptionIntoView()
      return
    }

    if (event.key === "Enter") {
      const activeOption = this.#filteredOptions[this.#activeIndex]

      if (activeOption) {
        event.preventDefault()
        this.#handleOptionSelected(activeOption)
      }
    }
  }

  handleInputFilter() {
    this.#filteredOptions = this.#filterOptionsWithString(this.inputTarget.value)
    this.#syncActiveIndexWithFilteredOptions()
    this.#render()
  }

  select(event) {
    this.#handleOptionSelected(event.currentTarget)
  }

  #handleOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.#closePanel()
      this.#render()
    }
  }

  #handleEscape(event) {
    if (event.key === "Escape" && this.#open) {
      this.#closePanel()
      this.#render()
      this.triggerTarget.focus()
    }
  }

  #handleOptionSelected(option) {
    const value = option.dataset.value
    const alreadySelected = this.valueInputTarget.value === value
    const nextValue = alreadySelected ? "" : value

    this.valueInputTarget.value = nextValue

    this.#closePanel()
    this.#render()
    this.triggerTarget.focus()
  }

  #openPanel() {
    this.#open = true

    this.#filteredOptions = this.#filterOptionsWithString(this.inputTarget.value)
    this.#syncActiveIndexWithFilteredOptions()
  }

  #closePanel() {
    this.#open = false
    this.#activeIndex = -1
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
      if (!this.#filteredOptions.includes(option)) {
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

  #renderSelectedOption() {
    const selectedValue = this.valueInputTarget.value

    this.optionTargets.forEach((option) => {
      const selected = option.dataset.value === selectedValue
      option.setAttribute("aria-selected", selected ? "true" : "false")
    })
  }

  #renderTriggerLabel() {
    const selectedValue = this.valueInputTarget.value
    const selectedOption = this.optionTargets.find((option) => option.dataset.value === selectedValue)
    this.triggerLabelTarget.textContent = selectedOption?.dataset.label || "Select framework..."
  }

  #render() {
    this.#renderPanel()
    this.#renderOptions()
    this.#renderActiveOption()
    this.#renderSelectedOption()
    this.#renderTriggerLabel()
  }
}
