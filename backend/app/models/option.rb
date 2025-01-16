# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  base_price  :integer          default(0), not null
#  description :string           default(""), not null
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  part_id     :integer          not null
#
# Indexes
#
#  index_options_on_name_and_part_id  (name,part_id) UNIQUE
#
class Option < ApplicationRecord
  belongs_to :part

  has_many :exclusions, dependent: :delete_all
  has_many :excluded_options, as: :excluded, class_name: "Exclusion", dependent: :delete_all

  has_many :addons, dependent: :delete_all
  has_many :dependant_options, as: :dependant, class_name: "Addon", dependent: :delete_all

  validates :name, presence: true
  validates_uniqueness_of :name, scope: :part_id
end
