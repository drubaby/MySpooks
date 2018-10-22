class CreateMonsters < ActiveRecord::Migration[5.2]
  def change
    create_table :monsters do |t|
      t.string :name
      t.string :img_url
      t.integer :spook_id

      t.timestamps
    end
  end
end
