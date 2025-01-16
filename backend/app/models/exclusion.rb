# == Schema Information
#
# Table name: exclusions
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  excluded_id :integer          not null
#  option_id   :integer          not null
#
# Indexes
#
#  index_exclusions_on_option_id_and_excluded_id  (option_id,excluded_id) UNIQUE
#
class Exclusion < ApplicationRecord
  belongs_to :option
  belongs_to :excluded, class_name: "Option"

  validates_uniqueness_of :excluded_id, scope: :option_id
end
