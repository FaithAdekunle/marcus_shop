module V1
  class ProductSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id name description base_price available].freeze

    attributes(*ATTRIBUTES)

    has_many :parts
  end
end
