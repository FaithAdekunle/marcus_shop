module V1
  class PartSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id name description base_price product_id].freeze

    attributes(*ATTRIBUTES)

    has_many :parts
  end
end
