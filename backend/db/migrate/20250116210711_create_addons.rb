class CreateAddons < ActiveRecord::Migration[7.2]
  def change
    create_table :addons do |t|
      t.integer :option_id, null: false
      t.integer :dependant_id, null: false
      t.integer :price, default: 0, null: false

      t.timestamps
    end

    add_index :addons, %i[option_id dependant_id], unique: true
  end
end
