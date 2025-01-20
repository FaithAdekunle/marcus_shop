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

  has_many :parts, dependent: :delete_all

  has_one_attached :product_image

  def image
    return [] unless product_image.attached?

    {
      id: product_image.id,
      type: product_image.content_type,
      name: product_image.filename.to_s,
      url: Rails.application.routes.url_helpers.polymorphic_url(product_image, { host: "localhost", port: 7002, protocol: "http" })
    }
  end
end
