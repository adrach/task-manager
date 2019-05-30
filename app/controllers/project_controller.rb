class ProjectController < ApplicationController
  before_action :authenticate_user!

  def index
    # Bullet eager loading trigger example
    # Will raise error only in tests, for dev just log msg
    Project.all.each do |project|
      p project.user.email
    end

    @projects = serialize_records(Project.all.includes(:tasks).includes(:actions))
  end
end
