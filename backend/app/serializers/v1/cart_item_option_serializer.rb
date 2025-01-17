module V1
  class CartItemOptionSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id option_id cart_item_id].freeze

    attributes(*ATTRIBUTES)

    belongs_to :option
    belongs_to :cart_item
  end
end
