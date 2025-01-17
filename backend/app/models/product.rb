# == Schema Information
#
# Table name: products
#
#  id          :bigint           not null, primary key
#  available   :boolean          default(TRUE)
#  base_price  :integer          default(0), not null
#  description :string           default(""), not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_products_on_name  (name) UNIQUE
#
class Product < ApplicationRecord
  validates :name, presence: true
  validates_uniqueness_of :name

  has_many :parts, dependent: :destroy_all
end
