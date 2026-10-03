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
      description: "Contextual message variants and structure",
      page_title: "Alert Conversion",
      page_description: "Compare shadcn alert structure and converted Rails equivalents."
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
    },
    {
      key: "native_select",
      name: "Native Select",
      description: "Styled native select, groups, and form states",
      page_title: "Native Select Conversion",
      page_description: "Compare shadcn native select patterns and converted Rails equivalents."
    },
    {
      key: "label",
      name: "Label",
      description: "Accessible form labels paired with controls",
      page_title: "Label Conversion",
      page_description: "Compare shadcn label styling and converted Rails equivalents."
    },
    {
      key: "textarea",
      name: "Textarea",
      description: "Multi-line text input styles and states",
      page_title: "Textarea Conversion",
      page_description: "Compare shadcn textarea states and converted Rails equivalents."
    },
    {
      key: "separator",
      name: "Separator",
      description: "Horizontal and vertical dividers",
      page_title: "Separator Conversion",
      page_description: "Compare shadcn separator orientations and converted Rails equivalents."
    },
    {
      key: "avatar",
      name: "Avatar",
      description: "Image avatars with fallback initials",
      page_title: "Avatar Conversion",
      page_description: "Compare shadcn avatar image and fallback patterns."
    },
    {
      key: "checkbox",
      name: "Checkbox",
      description: "Checked, unchecked, and disabled states",
      page_title: "Checkbox Conversion",
      page_description: "Compare shadcn checkbox states and converted Rails equivalents."
    },
    {
      key: "switch",
      name: "Switch",
      description: "Toggle switch on, off, and disabled",
      page_title: "Switch Conversion",
      page_description: "Compare shadcn switch states and converted Rails equivalents."
    },
    {
      key: "radio_group",
      name: "Radio Group",
      description: "Single-choice radio options and disabled items",
      page_title: "Radio Group Conversion",
      page_description: "Compare shadcn radio group selection and converted Rails equivalents."
    },
    {
      key: "tabs",
      name: "Tabs",
      description: "Tablist navigation with panel switching",
      page_title: "Tabs Conversion",
      page_description: "Compare shadcn tabs selection behavior and converted Rails equivalents."
    },
    {
      key: "accordion",
      name: "Accordion",
      description: "Collapsible single-open content sections",
      page_title: "Accordion Conversion",
      page_description: "Compare shadcn accordion open/close behavior and converted Rails equivalents."
    },
    {
      key: "tooltip",
      name: "Tooltip",
      description: "Hover and focus hint content",
      page_title: "Tooltip Conversion",
      page_description: "Compare shadcn tooltip presentation and converted Rails equivalents."
    },
    {
      key: "progress",
      name: "Progress",
      description: "Determinate progress bar values",
      page_title: "Progress Conversion",
      page_description: "Compare shadcn progress indicators and converted Rails equivalents."
    },
    {
      key: "skeleton",
      name: "Skeleton",
      description: "Loading placeholder pulse shapes",
      page_title: "Skeleton Conversion",
      page_description: "Compare shadcn skeleton placeholders and converted Rails equivalents."
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
