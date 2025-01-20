module Api
  module V1
    module Admin
      class PartsController < BaseController
        def create
          part = Part.new(part_params)

          ActiveRecord::Base.transaction do
            part.save!
            options = options_params.map { |option_params| option_params.merge(part_id: part.id) }
            Option.insert_all(options)
          end

          formatter = ::V1::PartFormatters.new.create

          render json: ::V1::PartSerializer.new(part, formatter).serializable_hash
        end

        def update
          @part = Part.find(params[:part_id])

          ActiveRecord::Base.transaction do
            @part.update!(part_params)
            option_ids = update_options.map { |option_params| option_params[:id] }
            Option.upsert_all(update_options, unique_by: :id)
            delete_option_ids = Option.where(part_id: @part.id).where.not(id: option_ids).ids
            price_adjustment_ids = PriceAdjustment.where("adjuster_id IN (?) OR adjustee_id IN (?)", delete_option_ids, delete_option_ids).ids if delete_option_ids.present?
            mutual_exclusion_ids = MutualExclusion.where("excluder_id IN (?) OR excludee_id IN (?)", delete_option_ids, delete_option_ids).ids if delete_option_ids.present?
            PriceAdjustment.where(id: price_adjustment_ids).delete_all if price_adjustment_ids.present?
            MutualExclusion.where(id: mutual_exclusion_ids).delete_all if mutual_exclusion_ids.present?
            Option.where(id: delete_option_ids).delete_all if delete_option_ids.present?
            Option.insert_all(create_options)
          end

          formatter = ::V1::PartFormatters.new.update

          render json: ::V1::PartSerializer.new(@part, formatter).serializable_hash
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

        def options_params
          params.permit(options: [ :id, :name, :base_price, :description, :available ])[:options]
        end

        def update_options
          arr = []

          options_params.each do |option_params|
            next unless option_params[:id].present?

            arr << option_params.merge(part_id: @part.id)
          end

          arr
        end

        def create_options
          arr = []

          options_params.each do |option_params|
            next if option_params[:id].present?

            arr << option_params.merge(part_id: @part.id)
          end

          arr
        end
      end
    end
  end
end
