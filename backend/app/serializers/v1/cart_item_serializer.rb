module V1
  class CartItemSerializer
    include FastJsonapi::ObjectSerializer

    ATTRIBUTES = %I[id product_id user_id].freeze

    attributes(*ATTRIBUTES)

    belongs_to :product

    has_many :cart_item_options
  end
end
