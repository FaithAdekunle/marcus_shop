module Api
  module V1
    module Admin
      class ProductsController < BaseController
        def create
          product = Product.create!(product_params)
          options = ::V1::Admin::ProductOptions.new.create
          render json: ::V1::ProductSerializer.new(product, options).serializable_hash
        end

        def update
          product = Product.find(params[:id])
          product.update!(product_params)
          options = ::V1::Admin::ProductOptions.new.update
          render json: ::V1::ProductSerializer.new(product, options).serializable_hash
        end

        def destroy
          product = Product.find(params[:id])
          part_ids = Part.where(product_id: product.id).ids
          option_ids = Option.where(part_id: part_ids).ids
          addon_ids = Addon.where(option_id: option_ids).or(Addon.where(dependant_id: option_ids)).ids
          exclusion_ids = Exclusion.where(option_id: option_ids).or(Exclusion.where(excluded_id: option_ids)).ids

          ActiveRecord::Base.transaction do
            Addon.where(id: addon_ids).delete_all if addon_ids.present?
            Exclusion.where(id: exclusion_ids).delete_all if exclusion_ids.present?
            Option.where(id: option_ids).delete_all if option_ids.present?
            Part.where(id: part_ids).delete_all if part_ids.present?
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
