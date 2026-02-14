class ShadcnShowcaseController < ApplicationController
  before_action :set_component, except: :index

  def index
    @components = ShadcnShowcaseComponent.all
  end

  def button; end
  def badge; end
  def card; end
  def alert; end
  def input; end
  def dialog; end
  def dropdown_menu; end

  private

  def set_component
    @component = ShadcnShowcaseComponent.find!(action_name)
  end
end
