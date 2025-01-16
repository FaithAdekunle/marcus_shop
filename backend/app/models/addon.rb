# == Schema Information
#
# Table name: addons
#
#  id           :bigint           not null, primary key
#  price        :integer          default(0), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  dependant_id :integer          not null
#  option_id    :integer          not null
#
# Indexes
#
#  index_addons_on_option_id_and_dependant_id  (option_id,dependant_id) UNIQUE
#
class Addon < ApplicationRecord
  belongs_to :option
  belongs_to :dependant, class_name: "Option"

  validates_uniqueness_of :dependant_id, scope: :option_id
end
