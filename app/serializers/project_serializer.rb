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

class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :order, :created_at, :updated_at, :user, :tasks, :actions
end
