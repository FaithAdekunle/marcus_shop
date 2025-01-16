class CreateExclusions < ActiveRecord::Migration[7.2]
  def change
    create_table :exclusions do |t|
      t.integer :option_id, null: false
      t.integer :excluded_id, null: false

      t.timestamps
    end

    add_index :exclusions, %i[option_id excluded_id], unique: true
  end
end
