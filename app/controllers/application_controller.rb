class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def json_response(object, status = :ok)
    render status: status, json: object
  end

  def serialize_records(records)
    ActiveModelSerializers::SerializableResource.new(records.to_a)
  end
end
