class MuiShowcaseController < ApplicationController
  before_action :set_component, except: :index
  before_action :set_code_snippets, except: :index

  def index
    @components = MuiShowcaseComponent.all
  end

  def button; end
  def input; end
  def dropdown_menu; end

  private

  def set_component
    @component = MuiShowcaseComponent.find!(action_name)
  end

  def set_code_snippets
    @source_code = ShowcaseCodeSnippet.from_file(source_demo_component_path)
    @converted_code = ShowcaseCodeSnippet.from_file_between(
      path: converted_view_path,
      start_marker: "<!-- CODE:converted:start -->",
      end_marker: "<!-- CODE:converted:end -->"
    )
  end

  def source_demo_component_path
    "app/javascript/components/MUI#{action_name.camelize}Demo.jsx"
  end

  def converted_view_path
    "app/views/mui_showcase/#{action_name}.html.erb"
  end
end
