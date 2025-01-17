class CreateMutualExclusions < ActiveRecord::Migration[7.2]
  def change
    create_table :mutual_exclusions do |t|
      t.integer :excluder_id, null: false
      t.integer :excludee_id, null: false

      t.timestamps
    end

    add_index :mutual_exclusions, %i[excluder_id excludee_id], unique: true
  end
end
