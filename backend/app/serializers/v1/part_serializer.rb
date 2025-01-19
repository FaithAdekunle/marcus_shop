module V1
  class PartSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id name description product_id option_ids].freeze

    attributes(*ATTRIBUTES)

    has_many :options

    belongs_to :product
  end
end
