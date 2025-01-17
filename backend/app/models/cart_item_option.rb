# == Schema Information
#
# Table name: cart_item_options
#
#  id           :bigint           not null, primary key
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  cart_item_id :integer          not null
#  option_id    :integer          not null
#
# Indexes
#
#  index_cart_item_options_on_cart_item_id_and_option_id  (cart_item_id,option_id) UNIQUE
#
class CartItemOption < ApplicationRecord
  belongs_to :option
  belongs_to :cart_item

  validate_uniqueness_of :option_id, scope: :cart_item_id
end
