require "application_system_test_case"

module ShadcnShowcase
class StaticComponentsTest < ApplicationSystemTestCase
  test "index lists every registered shadcn component" do
    visit root_path

    assert_selector "h1", text: "ShadCN Conversion Lab"
    ShadcnShowcaseComponent.all.each do |component|
      assert_link "Open comparison", href: component.path
      assert_text component.name
    end
  end

  test "badge converted panel shows variants" do
    visit_shadcn "badge"

    within_converted_panel do
      assert_selector ".sc-badge.sc-badge--default", text: /default/i
      assert_selector ".sc-badge.sc-badge--secondary"
      assert_selector ".sc-badge.sc-badge--outline"
      assert_selector ".sc-badge.sc-badge--destructive"
    end
  end

  test "card converted panel has title description and action" do
    visit_shadcn "card"

    within_converted_panel do
      assert_selector ".sc-card"
      assert_selector ".sc-card__title"
      assert_selector ".sc-card__description"
      assert_selector ".sc-button"
    end
  end

  test "alert converted panel shows default and destructive variants" do
    visit_shadcn "alert"

    within_converted_panel do
      assert_selector ".sc-alert.sc-alert--default", text: "Heads up!"
      assert_selector ".sc-alert.sc-alert--destructive", text: "Error"
      assert_selector ".sc-alert__title"
      assert_selector ".sc-alert__description"
    end
  end

  test "input converted panel shows email disabled and file inputs" do
    visit_shadcn "input"

    within_converted_panel do
      assert_selector "input.sc-input[type='email']"
      assert_selector "input.sc-input[disabled]"
      assert_selector "input.sc-input.sc-input--file[type='file']"
    end
  end

  test "label converted panel associates labels with inputs" do
    visit_shadcn "label"

    within_converted_panel do
      assert_selector "label.sc-label[for='converted-email']", text: "Email"
      assert_selector "input#converted-email.sc-input"
      assert_selector "label.sc-label.sc-label--disabled"
      assert_selector "input#converted-disabled-email[disabled]"
    end
  end

  test "textarea converted panel shows enabled and disabled fields" do
    visit_shadcn "textarea"

    within_converted_panel do
      assert_selector "textarea.sc-textarea:not([disabled])"
      assert_selector "textarea.sc-textarea[disabled]"
    end
  end

  test "separator converted panel shows horizontal and vertical separators" do
    visit_shadcn "separator"

    within_converted_panel do
      assert_selector ".sc-separator.sc-separator--horizontal"
      assert_selector ".sc-separator.sc-separator--vertical", minimum: 2
    end
  end

  test "avatar converted panel shows image and fallbacks" do
    visit_shadcn "avatar"

    within_converted_panel do
      assert_selector ".sc-avatar img.sc-avatar__image"
      assert_selector ".sc-avatar .sc-avatar__fallback", text: "JD"
      assert_selector ".sc-avatar.sc-avatar--lg .sc-avatar__fallback", text: "AB"
    end
  end

  test "checkbox converted panel covers checked unchecked and disabled" do
    visit_shadcn "checkbox"

    within_converted_panel do
      assert_selector "input.sc-checkbox#converted-terms[checked]"
      assert_selector "input.sc-checkbox#converted-marketing:not([checked])"
      assert_selector "input.sc-checkbox#converted-disabled-checkbox[disabled]"
      assert_selector "label[for='converted-terms']", text: "Accept terms and conditions"
    end
  end

  test "switch converted panel covers on off and disabled" do
    visit_shadcn "switch"

    within_converted_panel do
      assert_selector "input.sc-switch#converted-airplane[role='switch'][checked]"
      assert_selector "input.sc-switch#converted-notifications[role='switch']:not([checked])"
      assert_selector "input.sc-switch#converted-disabled-switch[disabled]"
    end
  end

  test "radio group converted panel selects one option" do
    visit_shadcn "radio_group"

    within_converted_panel do
      assert_selector "[role='radiogroup'].sc-radio-group"
      assert_selector "input.sc-radio#converted-r2[checked]"
      assert_selector "input.sc-radio#converted-r4[disabled]"

      find("label[for='converted-r1']").click
      assert find("input#converted-r1", visible: :all).checked?
      assert_not find("input#converted-r2", visible: :all).checked?
    end
  end

  test "native select converted panel has options and groups" do
    visit_shadcn "native_select"

    within_converted_panel do
      assert_selector "select.sc-native-select__control"
      assert_selector "option", text: "Todo"
      assert_selector "optgroup[label='Engineering']"
    end
  end

  test "progress converted panel exposes aria values" do
    visit_shadcn "progress"

    within_converted_panel do
      assert_selector ".sc-progress[role='progressbar'][aria-valuenow='33']"
      assert_selector ".sc-progress[role='progressbar'][aria-valuenow='66']"
      assert_selector ".sc-progress[role='progressbar'][aria-valuenow='100']"
      assert_selector ".sc-progress__indicator"
    end
  end

  test "skeleton converted panel shows pulse placeholders" do
    visit_shadcn "skeleton"

    within_converted_panel do
      assert_selector ".sc-skeleton", minimum: 3
      assert_selector ".sc-skeleton.size-12.rounded-full"
    end
  end
end
end
