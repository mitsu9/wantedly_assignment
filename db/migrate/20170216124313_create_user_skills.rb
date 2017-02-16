class CreateUserSkills < ActiveRecord::Migration
  def change
    create_table :user_skills do |t|
      t.references :user_id, index: true, foreign_key: true
      t.references :skill_id, index: true, foreign_key: true
      t.integer :count

      t.timestamps null: false
    end
  end
end
