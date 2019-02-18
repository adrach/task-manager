class AddProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :order

      t.timestamps
    end
    add_reference :projects, :user, foreign_key: true
  end
end
