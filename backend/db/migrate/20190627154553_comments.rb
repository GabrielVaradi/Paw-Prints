class Comments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t| 
      t.string :comment
      t.references :user, index: true, foreign_key: true
      t.references :pet, index: true, foreign_key: true
      t.timestamps
    end  
  end
end
