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
      },
      {
        key: "input",
        name: "Input",
        description: "Form input field styles and states"
      },
      {
        key: "dialog",
        name: "Dialog",
        description: "Modal overlay, content, and close actions"
      }
    ]
  end

  def button; end
  def badge; end
  def card; end
  def alert; end
  def input; end
  def dialog; end
end
