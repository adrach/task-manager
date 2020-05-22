# == Schema Information
#
# Table name: tasks
#
#  id         :bigint           not null, primary key
#  is_backlog :boolean          default(FALSE)
#  name       :string           not null
#  order      :integer          default(0)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_tasks_on_project_id  (project_id)
#  index_tasks_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (user_id => users.id)
#

class Task < ApplicationRecord
  belongs_to :project
  belongs_to :user
  default_scope { order(:order, id: :desc) }
end
