require "application_system_test_case"

module ShadcnShowcase
class InteractiveComponentsTest < ApplicationSystemTestCase
  test "button converted panel toggles disabled state" do
    visit_shadcn "button"

    within_converted_panel do
      button = find("button.sc-button--default", text: "Default", match: :first)
      assert_not button.disabled?

      click_button "Toggle default disabled"
      assert button.disabled?

      click_button "Toggle default disabled"
      assert_not button.disabled?
    end
  end

  test "dialog converted panel opens and closes" do
    visit_shadcn "dialog"

    within_converted_panel do
      assert_selector "[data-dialog-preview-target='overlay'].hidden", visible: :all
      click_button "Edit profile"
      assert_selector "[role='dialog']", text: "Edit profile"
      assert_no_selector "[data-dialog-preview-target='overlay'].hidden", visible: :all

      click_button "Cancel"
      assert_selector "[data-dialog-preview-target='overlay'].hidden", visible: :all
    end
  end

  test "dialog converted panel closes on escape" do
    visit_shadcn "dialog"

    within_converted_panel do
      click_button "Edit profile"
      assert_selector "[role='dialog']"
    end

    page.send_keys(:escape)

    within_converted_panel do
      assert_selector "[data-dialog-preview-target='overlay'].hidden", visible: :all
    end
  end

  test "dropdown menu converted panel opens closes and selects item" do
    visit_shadcn "dropdown_menu"

    within_converted_panel do
      assert_selector "[role='menu'].hidden", visible: :all
      click_button "Open menu"
      assert_selector "[role='menu']:not(.hidden)"
      assert_selector "[role='menuitem']", text: "Profile"

      click_button "Settings"
      assert_selector "[role='menu'].hidden", visible: :all
    end
  end

  test "dropdown menu converted panel supports arrow key navigation" do
    visit_shadcn "dropdown_menu"

    within_converted_panel do
      trigger = find("button", text: "Open menu")
      trigger.send_keys(:arrow_down)

      assert_selector "[role='menu']:not(.hidden)"
      assert_equal "Profile", page.evaluate_script("document.activeElement?.textContent?.trim()")
      assert_equal "true", trigger["aria-expanded"]

      page.send_keys(:arrow_down)
      assert_equal "Billing", page.evaluate_script("document.activeElement?.textContent?.trim()")

      page.send_keys(:arrow_down)
      assert_equal "Settings", page.evaluate_script("document.activeElement?.textContent?.trim()")

      page.send_keys(:arrow_up)
      assert_equal "Billing", page.evaluate_script("document.activeElement?.textContent?.trim()")

      page.send_keys(:home)
      assert_equal "Profile", page.evaluate_script("document.activeElement?.textContent?.trim()")

      page.send_keys(:end)
      assert_equal "Log out", page.evaluate_script("document.activeElement?.textContent?.trim()")

      page.send_keys(:escape)
      assert_selector "[role='menu'].hidden", visible: :all
      assert_equal "Open menu", page.evaluate_script("document.activeElement?.textContent?.trim()")
    end
  end

  test "combobox converted panel opens filters and selects" do
    visit_shadcn "combobox"

    within_converted_panel do
      trigger = find("[role='combobox']")
      assert_equal "false", trigger["aria-expanded"]
      trigger.click
      assert_equal "true", find("[role='combobox']")["aria-expanded"]
      assert_selector "[role='option']", text: "Next.js"

      find(".sc-combobox__search").set("astro")
      assert_selector "[role='option']:not(.hidden)", text: "Astro"
      assert_selector "[role='option'].hidden", text: "Next.js", visible: :all

      click_button "Astro"
      assert_equal "false", find("[role='combobox']")["aria-expanded"]
      assert_selector "[data-combobox-preview-target='triggerLabel']", text: "Astro"
      assert_selector "[data-combobox-preview-target='valueInput'][value='astro']", visible: :all
    end
  end

  test "combobox converted panel shows empty state" do
    visit_shadcn "combobox"

    within_converted_panel do
      find("[role='combobox']").click
      find(".sc-combobox__search").set("zzzz-no-match")
      assert_selector "[data-combobox-preview-target='emptyMessage']:not(.hidden)", text: "No framework found."
      assert_no_selector "[role='option']:not(.hidden)"
    end
  end

  test "tabs converted panel switches panels" do
    visit_shadcn "tabs"

    within_converted_panel do
      assert_text "Make changes to your account here"
      click_button "Password"
      assert_text "Change your password here"
      assert_no_text "Make changes to your account here"
      assert_selector "button.sc-tabs__trigger--active", text: "Password"
      assert_selector "button[disabled]", text: "Disabled"
    end
  end

  test "accordion converted panel toggles single open item" do
    visit_shadcn "accordion"

    within_converted_panel do
      assert_selector "[data-accordion-preview-target='item'][data-state='open']", text: /accessible/i
      click_button "Is it styled?"
      assert_selector "[data-accordion-preview-target='item'][data-state='open']", text: /styled/i
      assert_selector "[data-accordion-preview-target='item'][data-state='closed']", text: /accessible/i
      assert_text "default styles that match"
    end
  end

  test "tooltip converted panel shows on hover and hides on leave" do
    visit_shadcn "tooltip"

    within_converted_panel do
      assert_selector "[data-tooltip-preview-target='content'].hidden", visible: :all

      find("button", text: "Hover").hover
      assert_selector "[data-tooltip-preview-target='content']:not(.hidden)", text: "Add to library"
    end

    find("h1").hover

    within_converted_panel do
      assert_selector "[data-tooltip-preview-target='content'].hidden", visible: :all
    end
  end
end
end
