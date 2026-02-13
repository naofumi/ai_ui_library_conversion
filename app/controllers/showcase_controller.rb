class ShowcaseController < ApplicationController
  def index
    @components = [
      {
        key: "button",
        name: "Button",
        description: "Base action button styles and states"
      }
    ]
  end

  def button; end
end
