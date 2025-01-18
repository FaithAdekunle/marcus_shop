class AddAvailableToProducts < ActiveRecord::Migration[7.2]
  def change
    add_column :products, :available, :boolean, default: false
  end
end
