class CreatePriceAdjustments < ActiveRecord::Migration[7.2]
  def change
    create_table :price_adjustments do |t|
      t.integer :adjuster_id, null: false
      t.integer :adjustee_id, null: false
      t.integer :price, default: 0, null: false

      t.timestamps
    end

    add_index :price_adjustments, %i[adjustee_id adjuster_id], unique: true
  end
end
