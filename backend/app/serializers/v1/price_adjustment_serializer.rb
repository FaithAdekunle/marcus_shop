module V1
  class PriceAdjustmentSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id price adjuster_id adjustee_id].freeze

    attributes(*ATTRIBUTES)

    belongs_to :adjuster, serializer: :option
    belongs_to :adjustee, serializer: :option
  end
end
