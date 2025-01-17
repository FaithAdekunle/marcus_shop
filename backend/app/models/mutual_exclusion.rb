# == Schema Information
#
# Table name: mutual_exclusions
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  excludee_id :integer          not null
#  excluder_id :integer          not null
#
# Indexes
#
#  index_mutual_exclusions_on_excluder_id_and_excludee_id  (excluder_id,excludee_id) UNIQUE
#
class MutualExclusion < ApplicationRecord
  belongs_to :excluder, class_name: "Option"
  belongs_to :excludee, class_name: "Option"

  validates_uniqueness_of :excluder_id, scope: :excludee_id
end
