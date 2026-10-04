import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["content", "trigger", "item"]

  connect() {
    this.boundCloseOnOutsideClick = this.#closeOnOutsideClick.bind(this)
    window.addEventListener("mousedown", this.boundCloseOnOutsideClick)
    this.#setAriaExpanded(false)
  }

  disconnect() {
    window.removeEventListener("mousedown", this.boundCloseOnOutsideClick)
  }

  toggle() {
    if (this.#isOpen()) {
      this.close({ restoreFocus: false })
    } else {
      this.#open({ focusItem: null })
    }
  }

  select() {
    this.close({ restoreFocus: true })
  }

  close({ restoreFocus = false } = {}) {
    this.contentTarget.classList.add("hidden")
    this.#setAriaExpanded(false)

    if (restoreFocus && this.hasTriggerTarget) {
      this.triggerTarget.focus()
    }
  }

  handleKeydown(event) {
    if (event.key === "Escape" && this.#isOpen()) {
      event.preventDefault()
      this.close({ restoreFocus: true })
      return
    }

    const onTrigger =
      this.hasTriggerTarget &&
      (event.target === this.triggerTarget || this.triggerTarget.contains(event.target))

    if (onTrigger && !this.#isOpen() && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault()
      this.#open({ focusItem: event.key === "ArrowUp" ? "last" : "first" })
      return
    }

    if (!this.#isOpen()) return

    if (event.key === "ArrowDown") {
      event.preventDefault()
      this.#moveFocus(1)
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      this.#moveFocus(-1)
      return
    }

    if (event.key === "Home") {
      event.preventDefault()
      this.#focusItem("first")
      return
    }

    if (event.key === "End") {
      event.preventDefault()
      this.#focusItem("last")
      return
    }

    if (event.key === "Tab") {
      event.preventDefault()
    }
  }

  #isOpen() {
    return !this.contentTarget.classList.contains("hidden")
  }

  #open({ focusItem }) {
    this.contentTarget.classList.remove("hidden")
    this.#setAriaExpanded(true)

    if (focusItem === "first" || focusItem === "last") {
      this.#focusItem(focusItem)
    }
  }

  #items() {
    if (this.hasItemTarget) {
      return this.itemTargets.filter((item) => !item.disabled)
    }

    return Array.from(this.contentTarget.querySelectorAll('[role="menuitem"]:not([disabled])'))
  }

  #focusItem(which) {
    const items = this.#items()
    if (items.length === 0) return

    const item = which === "last" ? items[items.length - 1] : items[0]
    item.focus()
  }

  #moveFocus(direction) {
    const items = this.#items()
    if (items.length === 0) return

    const currentIndex = items.indexOf(document.activeElement)
    if (currentIndex === -1) {
      this.#focusItem(direction > 0 ? "first" : "last")
      return
    }

    const nextIndex = (currentIndex + direction + items.length) % items.length
    items[nextIndex].focus()
  }

  #closeOnOutsideClick(event) {
    if (!this.element.contains(event.target)) {
      this.close({ restoreFocus: false })
    }
  }

  #setAriaExpanded(expanded) {
    if (!this.hasTriggerTarget) return

    if (expanded) {
      this.triggerTarget.setAttribute("aria-expanded", "true")
    } else {
      this.triggerTarget.removeAttribute("aria-expanded")
    }
  }
}
