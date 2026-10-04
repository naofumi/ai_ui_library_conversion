require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 900 ] do |options|
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
  end

  # Scope to the converted Hotwire panel (right column), never the React source mount.
  # Headings use CSS uppercase, so match case-insensitively against rendered text.
  def within_converted_panel(&block)
    within("article", text: /Converted \(Rails/i) do
      yield
    end
  end

  def visit_shadcn(component_key)
    visit "/shadcn/#{component_key}"
    assert_selector "h1", text: /Conversion/i
  end
end
