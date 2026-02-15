#!/usr/bin/env ruby
# frozen_string_literal: true

ENV["RAILS_ENV"] ||= "test"

require "open3"
require "fileutils"
require "time"
require_relative "../../config/environment"
require "capybara"
require "capybara/dsl"
require "selenium-webdriver"

module Parity
  class InputParity
    include Capybara::DSL

    OUTPUT_DIR = Rails.root.join("tmp/parity/input")
    STATES = %w[default hover focus error].freeze

    def run
      ensure_dependencies!
      build_assets!
      prepare_output_dir!
      configure_capybara!
      capture_states!
      write_report!
      puts "Parity artifacts written to #{OUTPUT_DIR}"
    rescue Selenium::WebDriver::Error::SessionNotCreatedError => e
      abort <<~MSG
        Browser session could not be created.
        #{e.message}

        If using Safari, enable:
        Safari > Settings > Advanced > Show features for web developers,
        then Develop > Allow Remote Automation.
      MSG
    ensure
      Capybara.reset_sessions!
      Capybara.use_default_driver
    end

    private

    def ensure_dependencies!
      return if system("command -v magick >/dev/null 2>&1")

      abort "ImageMagick ('magick') is required for diff output."
    end

    def build_assets!
      puts "Building JS/CSS assets..."
      abort "yarn build failed" unless system("yarn build")
      abort "yarn build:css failed" unless system("yarn build:css")
    end

    def prepare_output_dir!
      FileUtils.rm_rf(OUTPUT_DIR)
      FileUtils.mkdir_p(OUTPUT_DIR)
    end

    def configure_capybara!
      if ENV["PARITY_APP_HOST"].to_s.empty?
        Capybara.app = Rails.application
      else
        Capybara.run_server = false
        Capybara.app_host = ENV["PARITY_APP_HOST"]
      end

      Capybara.default_max_wait_time = 8
      Capybara.server = :puma, { Silent: true }
      Capybara.save_path = OUTPUT_DIR.to_s

      register_drivers!
      Capybara.current_driver = chosen_driver
      page.current_window.resize_to(1600, 1800)
    end

    def register_drivers!
      Capybara.register_driver(:parity_chrome_headless) do |app|
        options = Selenium::WebDriver::Chrome::Options.new
        options.add_argument("--headless=new")
        options.add_argument("--window-size=1600,1800")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        options.add_argument("--force-device-scale-factor=1")
        Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
      end

      Capybara.register_driver(:parity_safari) do |app|
        Capybara::Selenium::Driver.new(app, browser: :safari)
      end
    end

    def chosen_driver
      preferred = ENV.fetch("PARITY_BROWSER", "").strip.downcase
      case preferred
      when "chrome"
        abort "Chrome requested but not found. Install Google Chrome." unless chrome_available?
        return :parity_chrome_headless
      when "safari"
        abort "Safari requested but not found." unless safari_available?
        return :parity_safari
      end

      return :parity_chrome_headless if chrome_available?
      return :parity_safari if safari_available?

      abort "No supported browser driver found. Install Chrome/Chromedriver or enable safaridriver."
    end

    def chrome_available?
      system("command -v google-chrome >/dev/null 2>&1") ||
        system("command -v chromium >/dev/null 2>&1") ||
        File.exist?("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    end

    def safari_available?
      system("command -v safaridriver >/dev/null 2>&1")
    end

    def capture_states!
      visit("/mui/input")
      source_panel = find("article", text: /Source \(React \+ MUI\)/)
      converted_panel = find("article", text: /Converted \(Rails \+ Tailwind\)/)

      source_panel.assert_selector("input", minimum: 4)
      converted_panel.assert_selector("input.mu-input", minimum: 4)

      capture_pair("default", source_panel, converted_panel)

      source_panel.all("input").first.hover
      capture_single("source", "hover", source_panel)
      converted_panel.all("input.mu-input").first.hover
      capture_single("converted", "hover", converted_panel)

      source_panel.all("input").first.click
      capture_single("source", "focus", source_panel)
      converted_panel.all("input.mu-input").first.click
      capture_single("converted", "focus", converted_panel)

      capture_pair("error", source_panel, converted_panel)

      STATES.each { |state| diff_state!(state) }
    end

    def capture_pair(state, source_panel, converted_panel)
      capture_single("source", state, source_panel)
      capture_single("converted", state, converted_panel)
    end

    def capture_single(side, state, element)
      element.save_screenshot(path_for(side, state))
    end

    def path_for(side, state)
      OUTPUT_DIR.join("#{side}-#{state}.png")
    end

    def diff_path_for(state)
      OUTPUT_DIR.join("diff-#{state}.png")
    end

    def diff_state!(state)
      source_path = path_for("source", state)
      converted_path = path_for("converted", state)
      diff_path = diff_path_for(state)

      total_pixels = pixel_count(source_path)
      metric_output, = Open3.capture2e("magick", "compare", "-metric", "AE", source_path.to_s, converted_path.to_s, diff_path.to_s)
      differing_pixels = metric_output.to_i
      mismatch = ((differing_pixels.to_f / total_pixels) * 100).round(2)
      results[state] = { differing_pixels: differing_pixels, total_pixels: total_pixels, mismatch_percent: mismatch }
    rescue StandardError => e
      results[state] = { error: e.message }
    end

    def pixel_count(path)
      stdout, status = Open3.capture2("magick", "identify", "-format", "%[fx:w*h]", path.to_s)
      raise "identify failed for #{path}" unless status.success?

      stdout.to_f
    end

    def results
      @results ||= {}
    end

    def write_report!
      lines = []
      lines << "# Input Parity Report"
      lines << ""
      lines << "Generated at: #{Time.now.utc.iso8601}"
      lines << ""
      lines << "| State | Mismatch % | Diff Pixels | Total Pixels | Diff Image |"
      lines << "| --- | ---: | ---: | ---: | --- |"

      STATES.each do |state|
        result = results[state]
        if result[:error]
          lines << "| #{state} | error | - | - | #{result[:error]} |"
          next
        end

        lines << "| #{state} | #{result[:mismatch_percent]} | #{result[:differing_pixels]} | #{result[:total_pixels].to_i} | #{diff_path_for(state).basename} |"
      end

      lines << ""
      lines << "Artifacts are in `#{OUTPUT_DIR}`."
      File.write(OUTPUT_DIR.join("report.md"), lines.join("\n"))
    end
  end
end

Parity::InputParity.new.run
