class MuiShowcaseComponent
  attr_reader :key, :name, :description, :page_title, :page_description

  COMPONENTS = [
    {
      key: "button",
      name: "Button",
      description: "Variant, color, and size prop combinations",
      page_title: "MUI Button Conversion",
      page_description: "Left side uses real MUI Button props. Right side mirrors equivalent outcomes in ERB + Tailwind + Stimulus-friendly classes."
    },
    {
      key: "input",
      name: "Input",
      description: "Text fields with states and helper text",
      page_title: "MUI Input Conversion",
      page_description: "Left side uses real MUI TextField patterns. Right side mirrors equivalent outcomes in ERB + Tailwind classes."
    },
    {
      key: "dropdown_menu",
      name: "Dropdown menu",
      description: "Menu trigger, grouped actions, and separators",
      page_title: "MUI Dropdown Menu Conversion",
      page_description: "Left side uses real MUI Menu + MenuItem patterns. Right side mirrors equivalent outcomes in ERB + Tailwind + Stimulus."
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
    all.find { |component| component.key == key.to_s } || raise(KeyError, "Unknown MUI showcase component: #{key}")
  end

  def path
    "/mui/#{key}"
  end
end
