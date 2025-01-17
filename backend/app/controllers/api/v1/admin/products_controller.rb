module Api
  module V1
    module Admin
      class ProductsController < BaseController
        def create
        end

        def update
        end

        def destroy
        end

        private

        def product_params
          params.permit(:name, :price, :available, :description)
        end
      end
    end
  end
end
