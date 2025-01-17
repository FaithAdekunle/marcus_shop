class CreateCartItemOptions < ActiveRecord::Migration[7.2]
  def change
    create_table :cart_item_options do |t|
      t.integer :cart_item_id, null: false
      t.integer :option_id, null: false

      t.timestamps
    end

    add_index :cart_item_options, %i[cart_item_id option_id], unique: true
  end
end
