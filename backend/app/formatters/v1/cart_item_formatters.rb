module V1
  class CartItemFormatters
    def index
      {
        include: [ :cart_item_options, :product, :'product.parts', :'product.parts.options', :'product.parts.options.excluders', :'product.parts.options.adjustees' ],
        fields: {
          option: ::V1::OptionSerializer::ATTRIBUTES,
          product: ::V1::ProductSerializer::ATTRIBUTES,
          cart_item: ::V1::CartItemSerializer::ATTRIBUTES,
          cart_item_option: ::V1::CartItemOptionSerializer::ATTRIBUTES,
          mutual_exclusion: ::V1::MutualExclusionSerializer::ATTRIBUTES,
          price_adjustment: ::V1::PriceAdjustmentSerializer::ATTRIBUTES
        }
      }
    end

    def update
      index
    end
  end
end
