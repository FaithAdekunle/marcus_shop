# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  available   :boolean          default(TRUE)
#  base_price  :integer          default(0), not null
#  description :string           default(""), not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  part_id     :integer          not null
#
# Indexes
#
#  index_options_on_part_id_and_name  (part_id,name) UNIQUE
#
class Option < ApplicationRecord
  belongs_to :part

  has_many :cart_item_options, dependent: :delete_all

  has_many :adjusters, foreign_key: "adjuster_id", class_name: "PriceAdjustment", dependent: :delete_all
  has_many :adjustees, foreign_key: "adjustee_id", class_name: "PriceAdjustment", dependent: :delete_all

  has_many :excluders, foreign_key: "excluder_id", class_name: "MutualExclusion", dependent: :delete_all
  has_many :excludees, foreign_key: "excludee_id", class_name: "MutualExclusion", dependent: :delete_all

  validates :name, presence: true
  validates_uniqueness_of :name, scope: :part_id
end
