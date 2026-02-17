class ShadcnShowcaseComponent
  attr_reader :key, :name, :description, :page_title, :page_description

  COMPONENTS = [
    {
      key: "button",
      name: "Button",
      description: "Base action button styles and states",
      page_title: "Button Conversion",
      page_description: "Left side uses real shadcn-style React primitives. Right side mirrors the same variants in ERB + Tailwind + Stimulus."
    },
    {
      key: "badge",
      name: "Badge",
      description: "Compact status labels and semantic variants",
      page_title: "Badge Conversion",
      page_description: "Compare shadcn badge variants and converted Rails equivalents."
    },
    {
      key: "card",
      name: "Card",
      description: "Container, content hierarchy, and actions",
      page_title: "Card Conversion",
      page_description: "Compare shadcn card slot structure and spacing."
    },
    {
      key: "alert",
      name: "Alert",
      description: "Contextual message and dismiss behavior",
      page_title: "Alert Conversion",
      page_description: "Compare shadcn alert structure and dismiss behavior."
    },
    {
      key: "input",
      name: "Input",
      description: "Form input field styles and states",
      page_title: "Input Conversion",
      page_description: "Compare shadcn input field states and converted Rails equivalents."
    },
    {
      key: "dialog",
      name: "Dialog",
      description: "Modal overlay, content, and close actions",
      page_title: "Dialog Conversion",
      page_description: "Compare shadcn dialog structure and open/close behavior."
    },
    {
      key: "dropdown_menu",
      name: "Dropdown Menu",
      description: "Context menu surface with grouped actions",
      page_title: "Dropdown Menu Conversion",
      page_description: "Compare shadcn dropdown menu layout and open/close behavior."
    },
    {
      key: "combobox",
      name: "Combobox",
      description: "Searchable popover selection input",
      page_title: "Combobox Conversion",
      page_description: "Compare shadcn combobox filtering and selection behavior."
    }
  ].freeze

  def initialize(attributes)
    @key = attributes.fetch(:key)
    @name = attributes.fetch(:name)
    @description = attributes.fetch(:description)
    @page_title = attributes.fetch(:page_title)
    @page_description = attributes.fetch(:page_description)
  end

  def self.all
    @all ||= COMPONENTS.map { |attributes| new(attributes) }
  end

  def self.find!(key)
    all.find { |component| component.key == key.to_s } || raise(KeyError, "Unknown showcase component: #{key}")
  end

  def path
    "/shadcn/#{key}"
  end
end
