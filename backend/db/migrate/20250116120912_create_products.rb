class CreateProducts < ActiveRecord::Migration[7.2]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :description, null: false, default: ''
      t.integer :base_price, null: false, default: 0

      t.timestamps
    end
  end
end
