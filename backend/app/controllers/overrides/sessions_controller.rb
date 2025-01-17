module Overrides
  class SessionsController < DeviseTokenAuth::SessionsController
    include AuthConcerns

    def render_create_success
      render_user
    end
  end
end
