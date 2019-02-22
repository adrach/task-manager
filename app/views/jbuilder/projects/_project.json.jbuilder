json.merge! project.attributes
json.tasks project.tasks do |task|
  json.merge! task.attributes
end
json.actions project.actions do |action|
  json.merge! action.attributes
end
