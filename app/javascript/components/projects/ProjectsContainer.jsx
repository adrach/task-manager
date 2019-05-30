import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import ProjectPopUp from './ProjectPopUp';
import TasksContainer from '../tasks/TasksContainer';
import api from '../../services/api';
import callEvent from '../../services/events';
import { DISPLAY_PROJECT_MODAL } from '../../constants';

class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleProjectCreate = this.handleProjectCreate.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
    this.handleProjectDestroy = this.handleProjectDestroy.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this);
    this.handleTaskDestroy = this.handleTaskDestroy.bind(this);
    this.handleActionCreate = this.handleActionCreate.bind(this);
    this.handleActionUpdate = this.handleActionUpdate.bind(this);
    this.handleActionDestroy = this.handleActionDestroy.bind(this);
    this.validateInlineInputText = this.validateInlineInputText.bind(this);
    this.callProjectModal = this.callProjectModal.bind(this);
    this.onTaskDragStart = this.onTaskDragStart.bind(this);
    this.onTaskDragEnd = this.onTaskDragEnd.bind(this);
    this.toggleUnnecessaryDragData = this.toggleUnnecessaryDragData.bind(this);
    this.state = {
      projects: props.projects,
    };
  }

  // base
  componentDidMount() {
    const { projects } = this.state;
    window.console.log(projects);
  }

  // Drag&Drop
  onTaskDragStart(data) {
    const { type } = data;
    this.toggleUnnecessaryDragData(type);
  }

  onTaskDragEnd(data) {
    const {
      destination, source, draggableId, type,
    } = data;
    const { projects } = this.state;
    this.toggleUnnecessaryDragData(type);

    if (
      !destination
      || (source.index === destination.index && source.droppableId === destination.droppableId)
    ) return;

    const parsedDraggableId = draggableId.includes('rubber-band') ? parseInt(draggableId, 10) : parseInt(draggableId.split('-').pop(), 10);
    const sortedProjects = projects.sort((a, b) => a.order - b.order);
    const parsedDroppableId = parseInt(source.droppableId, 10);
    const isTargetBacklog = destination.droppableId === `${parsedDroppableId}-backlog`;

    // rubber-band
    if (draggableId === `${parsedDraggableId}-rubber-band`) {
      const { tasks } = sortedProjects.find(p => p.id === parsedDroppableId);
      const entry = tasks.filter(t => !t.is_backlog);
      const backlog = tasks.filter(t => t.is_backlog);
      let changedTasks = [];

      if (!isTargetBacklog && destination.index < entry.length) {
        changedTasks = entry.slice(-(entry.length - destination.index));
      }
      if (isTargetBacklog && destination.index > 0) {
        changedTasks = backlog.slice(0, destination.index);
      }
      if (!changedTasks.length) return;

      this.setState({
        projects: projects.map(p => (p.id === parsedDroppableId ? Object.assign({}, p, {
          tasks: p.tasks.map(t => (changedTasks.indexOf(t) > -1 ? Object.assign({}, t, {
            is_backlog: !isTargetBacklog,
          }) : t)),
        }) : p)),
      }, () => api.tasks.updateBacklogStatus({
        ids: changedTasks.map(ct => ct.id),
        is_backlog: !isTargetBacklog,
      }).catch(e => window.console.log(e)));
      return;
    }

    // projects
    if (type === 'projects') {
      const newProjectIds = Array.from(sortedProjects.map(p => p.id));
      newProjectIds.splice(source.index, 1);
      newProjectIds.splice(destination.index, 0, parsedDraggableId);

      this.setState({
        projects: projects.map(p => Object.assign({}, p, {
          order: newProjectIds.indexOf(p.id),
        })),
      }, () => api.projects.updateOrder({ ids: newProjectIds }).catch(e => window.console.log(e)));
      return;
    }

    // tasks
    if (type.startsWith('tasks')) {
      const project = sortedProjects.find(p => p.id === parsedDroppableId);
      const newTaskIds = Array.from(project.tasks.sort((a, b) => a.order - b.order).map(t => t.id));
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(isTargetBacklog && source.droppableId !== `${parsedDroppableId}-backlog`
        ? destination.index + project.tasks.filter(t => !t.is_backlog).length - 1
        : destination.index, 0, parsedDraggableId);

      this.setState({
        projects: projects.map(p => (p.id === parsedDroppableId ? Object.assign({}, p, {
          tasks: p.tasks.map(t => Object.assign({}, t, {
            order: newTaskIds.indexOf(t.id),
            is_backlog: t.id === parsedDraggableId ? isTargetBacklog : t.is_backlog,
          })),
        }) : p)),
      }, () => api.tasks.updateOrder({
        ids: newTaskIds,
        draggable: {
          id: parsedDraggableId,
          is_backlog: isTargetBacklog,
        },
      }).catch(e => window.console.log(e)));
    }
  }

  toggleUnnecessaryDragData(type) {
    if (type.startsWith('tasks')) {
      $('.task-create').toggle(100);
      $('.actions-popup').toggle(100);
    }
  }

  // Projects
  handleProjectCreate(field) {
    const { projects } = this.state;
    api.projects.create({ [field.name]: field.value })
      .then((res) => {
        this.setState({ projects: [res, ...projects] });
      })
      .catch(err => window.console.log(err));
  }

  handleProjectUpdate(data, projectId) {
    const { projects } = this.state;
    api.projects.update(data, projectId)
      .then((res) => {
        this.setState({
          projects: projects.map(p => (p.id === res.id
            ? Object.assign({}, p, { title: res.title }) : p)),
        });
      })
      .catch(err => window.console.log(err));
  }

  handleProjectDestroy(id) {
    const { projects } = this.state;
    api.projects.destroy(id)
      .then((res) => {
        this.setState({
          projects: projects.filter(p => p.id !== res.id),
        });
      })
      .catch(err => window.console.log(err));
  }

  // Tasks
  handleTaskCreate(data, projectId) {
    const { projects } = this.state;
    const parsedData = data;
    parsedData.project_id = projectId;
    api.tasks.create(parsedData)
      .then((res) => {
        this.setState({
          projects: projects.map(p => (p.id === projectId
            ? Object.assign({}, p, { tasks: p.tasks ? [res, ...p.tasks] : [res] }) : p)),
        });
        $(`#newTask-${projectId} > span`).html('Add new task ...');
      })
      .catch(err => window.console.log(err));
  }

  handleTaskUpdate(data, taskId) {
    const { projects } = this.state;
    api.tasks.update(data, taskId)
      .then((res) => {
        this.setState({
          projects: projects.map(p => Object.assign({}, p, {
            tasks: p.tasks.map(t => (t.id === taskId ? res : t)),
          })),
        });
      })
      .catch(err => window.console.log(err));
  }

  handleTaskDestroy(taskId) {
    const { projects } = this.state;
    api.tasks.destroy(taskId)
      .then((res) => {
        this.setState({
          projects: projects.map(p => Object.assign({}, p, {
            tasks: p.tasks.filter(t => t.id !== res.id),
          })),
        });
      })
      .catch(err => window.console.log(err));
  }

  // Actions
  handleActionCreate(data, projectId) {
    const { projects } = this.state;
    const parsedData = data;
    parsedData.project_id = projectId;
    api.actions.create(parsedData)
      .then((res) => {
        this.setState({
          projects: projects.map(p => (p.id === projectId
            ? Object.assign({}, p, { actions: p.actions ? [res, ...p.actions] : [res] }) : p)),
        });
      })
      .catch(err => window.console.log(err));
  }

  handleActionUpdate(data, actionId) {
    const { projects } = this.state;
    api.actions.update(data, actionId)
      .then((res) => {
        this.setState({
          projects: projects.map(p => Object.assign({}, p, {
            actions: p.actions.map(a => (a.id === actionId ? res : a)),
          })),
        });
      })
      .catch(err => window.console.log(err));
  }

  handleActionDestroy(actionId) {
    const { projects } = this.state;
    api.actions.destroy(actionId)
      .then((res) => {
        this.setState({
          projects: projects.map(p => Object.assign({}, p, {
            actions: p.actions.filter(a => a.id !== res.id),
          })),
        });
      })
      .catch(err => window.console.log(err));
  }

  // Other
  validateInlineInputText(text) {
    return (text.length > 0 && text.length < 64);
  }

  callProjectModal() {
    callEvent(DISPLAY_PROJECT_MODAL, { handleSubmit: this.handleProjectCreate });
  }


  render() {
    const { projects } = this.state;
    return (
      <div id="projects-main-container">
        {/* Add Project Btn */}
        <div className="add-project-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.callProjectModal()}
          >
            Add New +
          </button>
        </div>
        {/* Row of projcets */}
        <div className="m-5">
          <div className="row">
            {/* Drag&Drop init */}
            <DragDropContext
              onDragStart={this.onTaskDragStart}
              onDragEnd={this.onTaskDragEnd}
            >
              {/* Droppable zone for projects */}
              <Droppable
                droppableId="projects"
                direction="horizontal"
                type="projects"
              >
                {providedDroppable => (
                  <div
                    className="d-flex flex-wrap w-100"
                    ref={providedDroppable.innerRef}
                    {...providedDroppable.droppableProps}
                  >
                    {/* Projects array */}
                    {projects.sort((a, b) => a.order - b.order).map((project, index) => (
                      // Draggable projects
                      <Draggable
                        key={project.id}
                        draggableId={`project-${project.id}`}
                        index={index}
                      >
                        {(providedDraggable, snapshotDraggable) => (
                          <div
                            className={`card card-body custom-w-20 custom-column-body ${snapshotDraggable.isDragging ? 'project-dragging' : ''}`}
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            {/* Row title + toggle & popup window with Actions */}
                            <ProjectPopUp
                              projectId={project.id}
                              projectTitle={project.title}
                              actions={project.actions}
                              handleProjectDestroy={this.handleProjectDestroy}
                              handleActionDestroy={this.handleActionDestroy}
                              handleProjectUpdate={this.handleProjectUpdate}
                              validateInlineInputText={this.validateInlineInputText}
                              handleActionCreate={this.handleActionCreate}
                              handleActionUpdate={this.handleActionUpdate}
                            />
                            {/* Tasks */}
                            <TasksContainer
                              tasks={project.tasks}
                              projectId={project.id}
                              handleTaskUpdate={this.handleTaskUpdate}
                              handleTaskCreate={this.handleTaskCreate}
                              handleTaskDestroy={this.handleTaskDestroy}
                              validateInlineInputText={this.validateInlineInputText}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {providedDroppable.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

ProjectsContainer.propTypes = {
  projects: PropTypes.instanceOf(Array),
};

ProjectsContainer.defaultProps = {
  projects: [],
};

export default ProjectsContainer;
