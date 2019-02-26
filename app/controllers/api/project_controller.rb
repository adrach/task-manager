class Api::ProjectController < Api::BaseController
  before_action :set_project, only: [:update, :destroy]

  def index
    @projects = Project.all.includes(:tasks).includes(:actions)
    respond_with(@projects)
  end

  def create
    @canvas = Project.create(project_params)
    @project = jbuilder('jbuilder/projects/_project', { project: @canvas })
    render json: @project
  end

  def update
    @project.update!(project_params)
    render json: @project
  end

  def destroy
    @project.destroy!
    render json: @project
  end


  private

  def project_params
    params.permit(:title)
  end

  def set_project
    @project = Project.find_by_id(params[:id])
  end
end
  