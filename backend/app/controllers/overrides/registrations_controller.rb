module Overrides
  class RegistrationsController <  DeviseTokenAuth::RegistrationsController
    include AuthConcerns

    def render_create_success
      render_user
    end

    private

    def sign_up_params
      params.permit(:name, :email, :password, :password_confirmation)
    end
  end
end
