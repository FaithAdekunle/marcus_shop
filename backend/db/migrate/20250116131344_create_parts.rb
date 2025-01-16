class CreateParts < ActiveRecord::Migration[7.2]
  def change
    create_table :parts do |t|
      t.string :name, null: false
      t.integer :base_price, null: false, default: 0
      t.integer :product_id, null: false

      t.timestamps
    end

    add_index :parts, [ :name, :product_id ], unique: true
  end
end
