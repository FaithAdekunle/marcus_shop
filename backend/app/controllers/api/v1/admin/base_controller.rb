module Api
  module V1
    module Admin
      class BaseController < ApplicationController
        before_action :admin_user?

        private

        def admin_user?
          raise unless current_user.admin?
        end
      end
    end
  end
end
