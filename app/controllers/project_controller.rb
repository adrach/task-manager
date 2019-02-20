class ProjectController < ApplicationController
  def index
    @projects = Project.all.includes(:tasks).includes(:actions)
  end
end