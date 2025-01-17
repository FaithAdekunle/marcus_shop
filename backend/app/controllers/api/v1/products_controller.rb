module Api
  module V1
    class ProductsController < BaseController
      def index
        products = Product.all
        formatter = ::V1::ProductFormatters.new.index

        render json: ::V1::ProductSerializer.new(products, formatter).serializable_hash
      end

      def show
        product = Product.includes(parts: { options: [ :excluders, :adjustees ] }).find(params[:id])
        formatter = ::V1::ProductFormatters.new.show

        render json: ::V1::ProductSerializer.new(product, formatter).serializable_hash
      end
    end
  end
end
