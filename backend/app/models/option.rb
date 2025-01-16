# == Schema Information
#
# Table name: options
#
#  id         :bigint           not null, primary key
#  base_price :integer          default(0), not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  part_id    :integer          not null
#
# Indexes
#
#  index_options_on_name_and_part_id  (name,part_id) UNIQUE
#
class Option < ApplicationRecord
  belongs_to :part
end
