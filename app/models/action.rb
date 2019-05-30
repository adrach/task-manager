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
#
# Indexes
#
#  index_actions_on_project_id  (project_id)
#
# Foreign Keys
#
#  fk_rails_...  (project_id => projects.id)
#

class Action < ApplicationRecord
  belongs_to :project
  default_scope { order(:order, id: :desc) }
end
