ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

# Chrome 158 rejects the wildcard origin Capybara 3.40 uses when resetting
# ChromeDriver sessions. Clear cookies globally and local storage for this app.
module ChromeResetWildcardOriginWorkaround
  private

  def execute_cdp(command, params = {})
    unless command == "Storage.clearDataForOrigin" && params[:origin] == "*"
      return super
    end

    super("Network.clearBrowserCookies")
    return unless params[:storageTypes].include?("local_storage")

    super(
      command,
      { origin: Capybara.current_session.server.base_url, storageTypes: "local_storage" }
    )
  end
end
Capybara::Selenium::Driver::ChromeDriver.prepend(ChromeResetWildcardOriginWorkaround)

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end
