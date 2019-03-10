class Api::TaskController < Api::BaseController
  before_action :set_task, only: [:update, :destroy]
  before_action :set_reorder_data, only: [:update_order]

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

  def update_order
    Task.find(@ids).each do |task|
      task.order = @ids.index(task.id)
      task.is_backlog = @item['is_backlog'] if task.id == @item['id']
      task.save!
    end
    render json: :ok
  end

  private

  def task_params
    params.permit(:name, :project_id, :ids, :draggable)
  end

  def set_task
    @task = Task.find_by_id(params[:id])
  end

  def set_reorder_data
    @ids = params['ids']
    @item = params['draggable']
  end
end
  