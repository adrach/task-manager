class ChangeNameFieldsToBeRequired < ActiveRecord::Migration[5.1]
  def change
    change_column_null :projects, :title, false
    change_column_null :tasks, :name, false
    change_column_null :actions, :name, false
  end
end
