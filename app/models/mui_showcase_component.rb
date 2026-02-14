class MuiShowcaseComponent
  attr_reader :key, :name, :description, :page_title, :page_description

  COMPONENTS = [
    {
      key: "button",
      name: "Button",
      description: "Variant, color, and size prop combinations",
      page_title: "MUI Button Conversion",
      page_description: "Left side uses real MUI Button props. Right side mirrors equivalent outcomes in ERB + Tailwind + Stimulus-friendly classes."
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
