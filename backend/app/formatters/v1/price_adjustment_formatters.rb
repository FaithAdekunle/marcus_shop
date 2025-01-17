module V1
  class PriceAdjustmentFormaters
    def create
      { include: [], fields: { price_adjustment: ::V1::PriceAdjustmentSerializer::ATTRIBUTES } }
    end

    def update
      create
    end
  end
end