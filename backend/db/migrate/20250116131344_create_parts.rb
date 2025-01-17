class CreateParts < ActiveRecord::Migration[7.2]
  def change
    create_table :parts do |t|
      t.string :name, null: false
      t.string :description, null: false, default: ""
      t.integer :product_id, null: false

      t.timestamps
    end

    add_index :parts, [ :name, :product_id ], unique: true
  end
end
