import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline2';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import callEvent from '../../services/events';
import { DISPLAY_CONFIRMATION_MODAL } from '../../constants';

class TasksContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTasksUpdate = this.onTasksUpdate.bind(this);
    this.renderTaskItems = this.renderTaskItems.bind(this);
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

  // render
  renderTaskItems(task, index) {
    const { validateInlineInputText, handleTaskUpdate } = this.props;
    return (
      // Draggable items
      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="task-items">
              <div className="item-draggable">
                <i className="icon icon-draggable" />
              </div>
              {/* Right Mouse Click */}
              <ContextMenuTrigger id={`task-${task.id}`}>
                <InlineEdit
                  text={task.name}
                  className={`${snapshot.isDragging ? 'item-dragging' : ''}`}
                  paramName="name"
                  validate={validateInlineInputText}
                  change={data => handleTaskUpdate(data, task.id)}
                />
              </ContextMenuTrigger>
              <ContextMenu id={`task-${task.id}`} className="dropdown-menu">
                <MenuItem className="dropdown-item">
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
          </div>
        )}
      </Draggable>
    );
  }

  render() {
    const { tasks } = this.state;
    const {
      projectId, handleTaskCreate, validateInlineInputText,
    } = this.props;
    return (
      <div>
        {/* Entry, Droppable */}
        <Droppable droppableId={`${projectId.toString()}-entry`}>
          {(provided, snapshot) => (
            <div
              // className="custom-field tasks-container"
              className={`custom-field tasks-container ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {'Entry'}
              {tasks.sort((a, b) => a.order - b.order)
                .filter(t => !t.is_backlog).map((task, index) => (
                  this.renderTaskItems(task, index)
                ))}
              <div className="task-create" id={`newTask-${projectId}`}>
                <InlineEdit
                  text=""
                  placeholder="Add new task ..."
                  paramName="name"
                  validate={validateInlineInputText}
                  change={data => handleTaskCreate(data, projectId)}
                />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Backlog, Droppable */}
        <Droppable droppableId={`${projectId.toString()}-backlog`}>
          {(provided, snapshot) => (
            <div
              // className="custom-field custom-backlog"
              className={`custom-field custom-backlog ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {'Backlog'}
              {tasks.sort((a, b) => a.order - b.order)
                .filter(t => t.is_backlog).map((task, index) => (
                  this.renderTaskItems(task, index + tasks.filter(t => !t.is_backlog).length)
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
