json.array!(projects) do |project|
  # json.partial! 'jbuilder/projects/project', project: project
  # not partial coz faster this way (jbuilder render time 55.2ms => 17.9ms)
  json.merge! project.attributes
  json.tasks project.tasks do |task|
    json.merge! task.attributes
  end
  json.actions project.actions do |action|
    json.merge! action.attributes
  end
end
