class CreateOptions < ActiveRecord::Migration[7.2]
  def change
    create_table :options do |t|
      t.string :name, null: false
      t.string :description, null: false, default: ""
      t.integer :base_price, null: false, default: 0
      t.integer :part_id, null: false

      t.timestamps
    end

    add_index :options, [ :part_id, :name ], unique: true
  end
end
