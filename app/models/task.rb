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
#
# Indexes
#
#  index_tasks_on_project_id  (project_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#

class Task < ApplicationRecord
  belongs_to :project
  default_scope { order(:order, id: :desc) }
end
