class Api::ProjectController < Api::BaseController

  def index
    @projects = Project.all.includes(:tasks).includes(:actions)
    respond_with(@projects)
  end

  def create
    @canvas = Project.create(project_params)
    @project = jbuilder('jbuilder/projects/_project', { project: @canvas })
    render json: @project
  end

  private

  def project_params
    params.permit(:title)
  end
end
  