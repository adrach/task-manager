class Api::ProjectController < Api::BaseController
  before_action :set_project, only: [:update, :destroy]
  before_action :set_reorder_data, only: [:update_order]

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

  def update_order
    Project.find(@ids).each do |project|
      project.order = @ids.index(project.id)
      project.save!
    end
    render json: :ok
  end

  private

  def project_params
    params.permit(:title, :ids)
  end

  def set_project
    @project = Project.find_by_id(params[:id])
  end

  def set_reorder_data
    @ids = params['ids']
  end
end
  