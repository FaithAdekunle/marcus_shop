# == Schema Information
#
# Table name: price_adjustments
#
#  id          :bigint           not null, primary key
#  price       :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  adjustee_id :integer          not null
#  adjuster_id :integer          not null
#
# Indexes
#
#  index_price_adjustments_on_adjustee_id_and_adjuster_id  (adjustee_id,adjuster_id) UNIQUE
#
class PriceAdjustment < ApplicationRecord
  belongs_to :adjuster, class_name: "Option"
  belongs_to :adjustee, class_name: "Option"

  validates_uniqueness_of :adjuster_id, scope: :adjustee_id
end
