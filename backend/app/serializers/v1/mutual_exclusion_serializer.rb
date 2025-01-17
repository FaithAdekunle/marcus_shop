module V1
  class MutualExclusionSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id excluder_id excludee_id].freeze

    attributes(*ATTRIBUTES)

    belongs_to :excluder, serializer: :option
    belongs_to :excludee, serializer: :option
  end
end
