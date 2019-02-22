class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def json_response(object, status = :ok)
    render status: status, json: object
  end

  def jbuilder(j_view, params)
    JSON.parse(
      render_to_string(
        template: j_view,
        locals: params,
        formats: [:json]
      )
    )
  end
end
