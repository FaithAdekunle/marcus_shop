module Api
  module V1
    module Admin
      class PartsController < BaseController
        def create
        end

        def update
        end

        def destroy
        end

        private

        def part_params
          params.require(:part).permit(:name, :description, :base_price, :product_id)
        end
      end
    end
  end
end
