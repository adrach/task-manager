class Api::ProjectController < Api::BaseController

  def index
    @projects = Project.all.includes(:tasks).includes(:actions)
    respond_with(@projects)
  end

  def create
    @project = Project.create(project_params)
    render json: @project
  end

  private

  def project_params
    params.permit(:title)
  end
end
  