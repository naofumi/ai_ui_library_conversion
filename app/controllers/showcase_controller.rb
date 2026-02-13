class ShowcaseController < ApplicationController
  def index
    @components = [
      {
        key: "button",
        name: "Button",
        description: "Base action button styles and states"
      },
      {
        key: "badge",
        name: "Badge",
        description: "Compact status labels and semantic variants"
      },
      {
        key: "card",
        name: "Card",
        description: "Container, content hierarchy, and actions"
      },
      {
        key: "alert",
        name: "Alert",
        description: "Contextual message and dismiss behavior"
      }
    ]
  end

  def button; end
  def badge; end
  def card; end
  def alert; end
end
