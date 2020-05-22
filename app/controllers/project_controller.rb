class ProjectController < ApplicationController
  def index
    @projects = serialize_records(current_user.projects.includes(:tasks, :actions))
  end
end
