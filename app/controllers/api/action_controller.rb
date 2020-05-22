class Api::ActionController < Api::BaseController
  before_action :set_action, only: [:update, :destroy]

  def create
    @action = current_user.actions.create(action_params)
    render json: @action
  end

  def update
    @action.update!(action_params)
    render json: @action
  end

  def destroy
    @action.destroy!
    render json: @action
  end

  private

  def action_params
    params.permit(:name, :url, :project_id)
  end

  def set_action
    @action = current_user.actions.find_by_id(params[:id])
  end
end
