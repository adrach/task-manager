class Task < ApplicationRecord
  belongs_to :project
  default_scope { order(:order, id: :desc) }
end
