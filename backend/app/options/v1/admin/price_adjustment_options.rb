module V1
  module Admin
    class PriceAdjustmentOptions
      def create
        { include: [], fields: { price_adjustment: ::V1::PriceAdjustmentSerializer::ATTRIBUTES } }
      end

      def update
        create
      end
    end
  end
end
