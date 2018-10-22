class CreateMonsterFears < ActiveRecord::Migration[5.2]
  def change
    create_table :monster_fears do |t|
      t.integer :monster_id
      t.integer :spook_id

      t.timestamps
    end
  end
end
