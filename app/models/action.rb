# == Schema Information
#
# Table name: actions
#
#  id         :bigint           not null, primary key
#  is_link    :boolean          default(TRUE)
#  name       :string           not null
#  order      :integer          default(0)
#  url        :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  project_id :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_actions_on_project_id  (project_id)
#  index_actions_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#  fk_rails_...  (user_id => users.id)
#

class Action < ApplicationRecord
  belongs_to :project
  belongs_to :user
  default_scope { order(:order, id: :desc) }
end
