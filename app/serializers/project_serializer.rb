class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :order, :created_at, :updated_at, :user, :tasks, :actions
end
