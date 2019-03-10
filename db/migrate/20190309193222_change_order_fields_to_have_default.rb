class ChangeOrderFieldsToHaveDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :projects, :order, :integer, default: 0
    change_column :tasks, :order, :integer, default: 0
    change_column :actions, :order, :integer, default: 0
  end
end
