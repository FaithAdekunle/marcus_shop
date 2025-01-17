module V1
  class ProductFormatters
    def index
      { include: [], fields: { product: ::V1::ProductSerializer::ATTRIBUTES } }
    end

    def show
      {
        include: [ :parts, :'parts.options', :'parts.options.excluders', :'parts.options.adjustees' ],
        fields: {
          option: ::V1::OptionSerializer::ATTRIBUTES,
          product: ::V1::ProductSerializer::ATTRIBUTES,
          mutual_exclusion: ::V1::MutualExclusionSerializer::ATTRIBUTES,
          price_adjustment: ::V1::PriceAdjustmentSerializer::ATTRIBUTES
        }
      }
    end

    def create
      index
    end

    def update
      index
    end
  end
end
