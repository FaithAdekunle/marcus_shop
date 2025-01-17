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
          option_ids = Option.where(part_id: part.id).ids
          price_adjustment_ids = PriceAdjustment.where("adjuster_id IN (?) OR adjustee_id IN (?)", option_ids, option_ids).ids
          mutual_exclusion_ids = MutualExclusion.where("excluder_id IN (?) OR excludee_id IN (?)", option_ids, option_ids).ids

          ActiveRecord::Base.transaction do
            PriceAdjustment.where(id: price_adjustment_ids).delete_all if price_adjustment_ids.present?
            MutualExclusion.where(id: mutual_exclusion_ids).delete_all if mutual_exclusion_ids.present?
            part.destroy
          end

          head :no_content
        end

        private

        def part_params
          params.permit(:name, :description, :product_id)
        end
      end
    end
  end
end
