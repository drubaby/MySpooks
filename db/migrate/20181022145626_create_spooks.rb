class CreateSpooks < ActiveRecord::Migration[5.2]
  def change
    create_table :spooks do |t|
      t.string :name

      t.timestamps
    end
  end
end
