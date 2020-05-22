class AddUserToTasksAndActions < ActiveRecord::Migration[6.0]
  def change
    add_reference :tasks, :user, foreign_key: true
    add_reference :actions, :user, foreign_key: true

    Task.all.each do |task|
      task.update(user_id: task.project.user_id)
    end

    Action.all.each do |action|
      action.update(user_id: action.project.user_id)
    end
  end
end
