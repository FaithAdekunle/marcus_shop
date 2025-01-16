class CreateOptions < ActiveRecord::Migration[7.2]
  def change
    create_table :options do |t|
      t.string :name, null: false
      t.integer :base_price, null: false, default: 0
      t.integer :part_id, null: false

      t.timestamps
    end

    add_index :options, [ :name, :part_id ], unique: true
  end
end
