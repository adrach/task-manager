class Project < ApplicationRecord
  belongs_to :user

  has_many :tasks, dependent: :destroy
  has_many :actions, dependent: :destroy
  default_scope { order(:order, id: :desc) }
end
