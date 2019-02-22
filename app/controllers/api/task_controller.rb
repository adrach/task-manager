class Api::TaskController < Api::BaseController

  def create
    @task = Task.create(task_params)
    render json: @task
  end

  def update
    @task = Task.update(params[:id], task_params)
    render json: @task
  end

  private

  def task_params
    params.permit(:name, :project_id)
  end
end
  