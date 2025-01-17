module Api
  module V1
    module Admin
    class OptionsController < BaseController
      def create
        option = Option.create!(option_params)
        options = ::V1::Admin::OptionOptions.new.create

        render json: ::V1::OptionSerializer.new(option, options).serializable_hash
      end

      def update
        option = Option.find(params[:option_id])
        option.update!(option_params)
        options = ::V1::Admin::OptionOptions.new.update

        render json: ::V1::OptionSerializer.new(option, options).serializable_hash
      end

      def destroy
        option = Option.find(params[:option_id])
        option.destroy

        head :no_content
      end

      private

      def option_params
        params.permit(:name, :description, :base_price, :part_id, :available)
      end
    end
    end
  end
end
