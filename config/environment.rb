# Load the Rails application.
require_relative 'application'

# Setup Rollbar error reporting
require File.expand_path('../rollbar', __FILE__)

notify = ->(e) do
  begin
    Rollbar.with_config(use_async: false) do
      Rollbar.error(e)
    end
  rescue
    Rails.logger.error "Synchronous Rollbar notification failed.  Sending async to preserve info"
    Rollbar.error(e)
  end
end

# Initialize the Rails application.
begin
  Rails.application.initialize!
rescue Exception => e
  notify.(e)
  raise
end

