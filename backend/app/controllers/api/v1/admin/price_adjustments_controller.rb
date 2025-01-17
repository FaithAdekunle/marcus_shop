module Api
  module V1
    module Admin
      class PriceAdjustmentsController < BaseController
        def create
          price_adjustment = PriceAdjustment.create!(price_adjustment_params)
          formatter = ::V1::PriceAdjustmentFormaters.new.create

          render json: ::V1::PriceAdjustmentSerializer.new(price_adjustment, formatter).serializable_hash
        end

        def destroy
          price_adjustment = PriceAdjustment.find(params[:id])
          price_adjustment.destroy

          head :no_content
        end

        def update
          price_adjustment = PriceAdjustment.find(params[:id])
          price_adjustment.update!(price_adjustment_params)
          formatter = ::V1::PriceAdjustmentFormaters.new.update

          render json: ::V1::PriceAdjustmentSerializer.new(price_adjustment, formatter).serializable_hash
        end

        private

        def price_adjustment_params
          params.permit(:adjuster_id, :price).tap { |p| p[:adjustee_id] = params[:option_id] }
        end
      end
    end
  end
end
