module Api
  module V1
    class UsersController < BaseController
      def current_user
        formatter = ::V1::UserFormatters.new.current_user

        render json: ::V1::UserSerializer.new(current_api_v1_user, formatter).serializable_hash
      end
    end
  end
end
