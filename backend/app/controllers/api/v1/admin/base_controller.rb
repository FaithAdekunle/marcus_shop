module Api
  module V1
    module Admin
      class BaseController < ::Api::V1::BaseController
        before_action :admin_user?

        private

        def admin_user?
          raise unless current_api_v1_user.admin?
        end
      end
    end
  end
end
