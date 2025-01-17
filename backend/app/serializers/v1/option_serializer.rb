module V1
  class OptionSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id name description base_price part_id available].freeze

    attributes(*ATTRIBUTES)

    belongs_to :part

    has_many :excluders, serializer: :mutual_exclusion
    has_many :excludees, serializer: :mutual_exclusion

    has_many :adjusters, serializer: :price_adjustment
    has_many :adjustees, serializer: :price_adjustment
  end
end
