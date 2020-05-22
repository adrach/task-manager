class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  layout :layout_by_resource
  before_action :authenticate_user!

  private

  def json_response(object, status = :ok)
    render status: status, json: object
  end

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end

  def serialize_records(records)
    ActiveModelSerializers::SerializableResource.new(records.to_a)
  end
end
