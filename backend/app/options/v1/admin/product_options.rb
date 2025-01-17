module V1
  module Admin
    class ProductOptions
      def create
        { include: [], fields: { product: ::V1::ProductSerializer::ATTRIBUTES } }
      end

      def update
        create
      end
    end
  end
end
