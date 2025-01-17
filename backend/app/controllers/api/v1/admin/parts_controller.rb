module Api
  module V1
    module Admin
      class PartsController < BaseController
        def create
          part = Part.create!(part_params)
          options = ::V1::Admin::PartOptions.new.create
          render json: ::V1::PartSerializer.new(part, options).serializable_hash
        end

        def update
          part = Part.find(params[:part_id])
          part.update!(part_params)
          options = ::V1::Admin::PartOptions.new.update
          render json: ::V1::PartSerializer.new(part, options).serializable_hash
        end

        def destroy
          part = Part.find(params[:part_id])
          option_ids = Option.where(part_id: part.id)
          addon_ids = Addon.where(option_id: option_ids).or(Addon.where(dependant_id: option_ids)).ids
          exclusion_ids = Exclusion.where(option_id: option_ids).or(Exclusion.where(excluded_id: option_ids)).ids

          ActiveRecord::Base.transaction do
            Addon.where(id: addon_ids).delete_all if addon_ids.present?
            Exclusion.where(id: exclusion_ids).delete_all if exclusion_ids.present?
            Option.where(id: option_ids).delete_all if option_ids.present?
            part.destroy
          end

          head :no_content
        end

        private

        def part_params
          params.permit(:name, :description, :base_price, :product_id)
        end
      end
    end
  end
end
