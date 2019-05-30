# == Schema Information
#
# Table name: projects
#
#  id         :bigint           not null, primary key
#  order      :integer          default(0)
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint
#
# Indexes
#
#  index_projects_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#

class Project < ApplicationRecord
  belongs_to :user

  has_many :tasks, dependent: :destroy
  has_many :actions, dependent: :destroy
  default_scope { order(:order, id: :desc) }
end
