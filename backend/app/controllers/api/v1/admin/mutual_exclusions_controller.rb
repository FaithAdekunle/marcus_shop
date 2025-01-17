module Api
  module V1
    module Admin
      class MutualExclusionsController < BaseController
        def create
          mutual_exclusion = MutualExclusion.create!(mutual_exclusion_params)
          options = ::V1::Admin::MutualExclusionOptions.new.create

          render json: ::V1::MutualExclusionSerializer.new(mutual_exclusion, options).serializable_hash
        end

        def destroy
          mutual_exclusion = MutualExclusion.find(params[:id])
          mutual_exclusion.destroy

          head :no_content
        end

        private

        def mutual_exclusion_params
          params.permit(:excludee_id).tap { |p| p[:excluder_id] = params[:option_id] }
        end
      end
    end
  end
end
