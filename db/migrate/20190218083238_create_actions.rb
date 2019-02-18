class CreateActions < ActiveRecord::Migration[5.1]
  def change
    create_table :actions do |t|
      t.string :name
      t.string :url
      t.integer :order
      t.boolean :is_link, default: true

      t.timestamps
    end
  end
end
