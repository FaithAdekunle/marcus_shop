# == Schema Information
#
# Table name: parts
#
#  id          :bigint           not null, primary key
#  description :string           default(""), not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  product_id  :integer          not null
#
# Indexes
#
#  index_parts_on_product_id_and_name  (product_id,name) UNIQUE
#
class Part < ApplicationRecord
  belongs_to :product

  has_many :options, dependent: :delete_all

  validates :name, presence: true
  validates_uniqueness_of :name, scope: :product_id
end
