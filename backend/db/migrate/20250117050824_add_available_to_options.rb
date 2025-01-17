class AddAvailableToOptions < ActiveRecord::Migration[7.2]
  def change
    add_column :options, :available, :boolean, default: true
  end
end
