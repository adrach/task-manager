import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline2';


class TasksContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTasksUpdate = this.onTasksUpdate.bind(this);
    this.state = {
      tasks: props.tasks,
    };
  }

  componentDidUpdate(prevProps) {
    const { tasks } = this.props;
    if (tasks !== prevProps.tasks) {
      this.onTasksUpdate(tasks);
    }
  }

  onTasksUpdate(tasks) {
    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;
    const {
      projectId, handleTaskUpdate, handleTaskCreate, validateInlineInputText,
    } = this.props;
    return (
      <div>
        {/* Entry */}
        <div className="custom-field custom-entry">
          {tasks.map(task => (
            <div key={task.id}>
              <InlineEdit
                text={task.name}
                paramName="name"
                validate={validateInlineInputText}
                change={data => handleTaskUpdate(data, task.id)}
              />
            </div>
          ))}
          <div id={`newTask-${projectId}`}>
            <InlineEdit
              text=""
              placeholder="Add new task ..."
              paramName="name"
              validate={validateInlineInputText}
              change={data => handleTaskCreate(data, projectId)}
            />
          </div>
        </div>
        {/* Backlog */}
        <div className="custom-field custom-backlog row">
          Backlog
        </div>
      </div>
    );
  }
}

TasksContainer.propTypes = {
  tasks: PropTypes.instanceOf(Array),
  projectId: PropTypes.number.isRequired,
  handleTaskUpdate: PropTypes.func.isRequired,
  handleTaskCreate: PropTypes.func.isRequired,
  validateInlineInputText: PropTypes.func.isRequired,
};

TasksContainer.defaultProps = {
  tasks: [],
};

export default TasksContainer;
