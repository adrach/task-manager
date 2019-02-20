class Action < ApplicationRecord
  belongs_to :project
  default_scope { order(:order, id: :desc) }
end
