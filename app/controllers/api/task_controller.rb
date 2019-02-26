class Api::TaskController < Api::BaseController
  before_action :set_task, only: [:update, :destroy]

  def create
    @task = Task.create(task_params)
    render json: @task
  end

  def update
    @task.update!(task_params)
    render json: @task
  end

  def destroy
    @task.destroy!
    render json: @task
  end


  private

  def task_params
    params.permit(:name, :project_id)
  end

  def set_task
    @task = Task.find_by_id(params[:id])
  end
end
  