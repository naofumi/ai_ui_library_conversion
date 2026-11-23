require "application_system_test_case"

class MuiShowcaseSmokeTest < ApplicationSystemTestCase
  test "existing MUI button comparison mounts the React demo" do
    visit mui_button_path

    within '[data-react="mui-button-demo"]' do
      assert_button "Contained", exact: true
    end
  end
end
