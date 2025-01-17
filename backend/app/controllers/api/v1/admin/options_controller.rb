module Api
  module V1
    module Admin
    class OptionsController < BaseController
      def create
        option = Option.create!(option_params)
        formatter = ::V1::OptionFormatters.new.create

        render json: ::V1::OptionSerializer.new(option, formatter).serializable_hash
      end

      def update
        option = Option.find(params[:option_id])
        option.update!(option_params)
        formatter = ::V1::OptionFormatters.new.update

        render json: ::V1::OptionSerializer.new(option, formatter).serializable_hash
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
