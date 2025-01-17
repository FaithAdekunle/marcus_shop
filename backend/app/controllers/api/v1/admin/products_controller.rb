module Api
  module V1
    module Admin
      class ProductsController < BaseController
        def create
          product = Product.create!(product_params)
          formatter = ::V1::ProductFormatters.new.create

          render json: ::V1::ProductSerializer.new(product, formatter).serializable_hash
        end

        def update
          product = Product.find(params[:product_id])
          product.update!(product_params)
          formatter = ::V1::ProductFormatters.new.update

          render json: ::V1::ProductSerializer.new(product, formatter).serializable_hash
        end

        def destroy
          product = Product.find(params[:product_id])
          part_ids = Part.where(product_id: product.id).ids
          option_ids = Option.where(part_id: part_ids).ids
          price_adjustment_ids = PriceAdjustment.where("adjuster_id IN (?) OR adjustee_id IN (?)", option_ids, option_ids).ids
          mutual_exclusion_ids = MutualExclusion.where("excluder_id IN (?) OR excludee_id IN (?)", option_ids, option_ids).ids

          ActiveRecord::Base.transaction do
            PriceAdjustment.where(id: price_adjustment_ids).delete_all if price_adjustment_ids.present?
            MutualExclusion.where(id: mutual_exclusion_ids).delete_all if mutual_exclusion_ids.present?
            Option.where(id: option_ids).delete_all if option_ids.present?
            product.destroy
          end

          head :no_content
        end

        private

        def product_params
          params.permit(:name, :base_price, :available, :description)
        end
      end
    end
  end
end
