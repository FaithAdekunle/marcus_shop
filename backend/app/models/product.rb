# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  base_price  :integer          default(0), not null
#  description :string           default(""), not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Product < ApplicationRecord
  validates :name, presence: true
end
