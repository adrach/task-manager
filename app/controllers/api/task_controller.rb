class Api::TaskController < Api::BaseController
  before_action :set_task, only: [:update, :destroy]
  before_action :set_reorder_data, only: [:update_order, :update_backlog_status]

  def create
    order = Project.find_by_id(params[:project_id]).tasks.where(is_backlog: false).count
    @task = Task.new(task_params)
    @task.order = order
    @task.save!
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

  def update_backlog_status
    Task.find(@ids).each do |task|
      task.is_backlog = @is_backlog
      task.save!
    end
    render json: :ok
  end

  private

  def task_params
    params.permit(:name, :project_id, :ids, :draggable, :is_backlog)
  end

  def set_task
    @task = Task.find_by_id(params[:id])
  end

  def set_reorder_data
    @ids = params['ids']
    @item = params['draggable']
    @is_backlog = params['is_backlog']
  end
end
