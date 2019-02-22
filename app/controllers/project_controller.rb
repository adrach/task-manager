class ProjectController < ApplicationController

  def index
    @canvas = Project.all.includes(:tasks).includes(:actions)
    @projects = jbuilder('jbuilder/projects/_projects', { projects: @canvas })

    respond_to do |format|
      format.html
    end
  end
end