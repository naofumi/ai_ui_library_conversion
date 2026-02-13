# Force Yarn for jsbundling tasks. jsbundling-rails may prefer bun when bun is present.
module Jsbundling
  module Tasks
    def install_command
      "yarn install"
    end

    def build_command
      "yarn build"
    end
  end
end
