class AddProjectToActions < ActiveRecord::Migration[5.1]
  def change
    add_reference :actions, :project, foreign_key: true
  end
end
