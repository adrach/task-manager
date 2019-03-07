import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline2';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

import callEvent from '../../services/events';
import { DISPLAY_CONFIRMATION_MODAL } from '../../constants';

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

  // events
  callConfirmationModal(question, additionalData) {
    const { handleTaskDestroy } = this.props;
    callEvent(DISPLAY_CONFIRMATION_MODAL, {
      handleSubmit: data => handleTaskDestroy(data.id),
      question,
      additionalData,
    });
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
              {/* Right Mouse Click */}
              <ContextMenuTrigger id={`task-${task.id}`}>
                <InlineEdit
                  text={task.name}
                  paramName="name"
                  validate={validateInlineInputText}
                  change={data => handleTaskUpdate(data, task.id)}
                />
              </ContextMenuTrigger>
              <ContextMenu id={`task-${task.id}`} className="dropdown-menu">
                <MenuItem className="dropdown-item">
                  {/* For Button */}
                  {/* <button
                    type="button"
                    className="btn btn-danger btn-sm context-menu-delete-btn"
                    data-toggle="modal"
                    data-target="#confirmationModal"
                    onClick={() => this.callConfirmationModal(
                      `Are you sure that you want to destroy task "${task.name}" ?`,
                      {
                        target: 'task',
                        id: task.id,
                      },
                    )}
                  >
                    <i className="icon icon-delete" />
                    {'Delete'}
                  </button> */}
                  <span
                    onClick={() => this.callConfirmationModal(
                      `Are you sure that you want to destroy task "${task.name}" ?`,
                      {
                        target: 'task',
                        id: task.id,
                      },
                    )}
                  >
                    {'Delete'}
                  </span>
                </MenuItem>
              </ContextMenu>
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
  handleTaskDestroy: PropTypes.func.isRequired,
  validateInlineInputText: PropTypes.func.isRequired,
};

TasksContainer.defaultProps = {
  tasks: [],
};

export default TasksContainer;
