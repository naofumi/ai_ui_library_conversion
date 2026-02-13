# Force Yarn for cssbundling tasks. cssbundling-rails may prefer bun when bun is present.
module Cssbundling
  module Tasks
    def install_command
      "yarn install"
    end

    def build_command
      "yarn build:css"
    end
  end
end
