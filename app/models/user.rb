# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  discarded_at           :datetime
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_discarded_at          (discarded_at)
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include Discard::Model
  default_scope -> { kept }

  after_discard do
    projects.discard_all
    tasks.discard_all
    actions.discard_all
  end
  after_undiscard do
    projects.with_discarded.discarded.undiscard_all
    tasks.with_discarded.discarded.undiscard_all
    actions.with_discarded.discarded.undiscard_all
  end

  has_many :projects, dependent: :destroy
  has_many :tasks, dependent: :destroy
  has_many :actions, dependent: :destroy
end
