class MuiShowcaseController < ApplicationController
  before_action :set_component, except: :index

  def index
    @components = MuiShowcaseComponent.all
  end

  def button; end
  def input; end

  private

  def set_component
    @component = MuiShowcaseComponent.find!(action_name)
  end
end
