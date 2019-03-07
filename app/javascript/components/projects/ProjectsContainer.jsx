import React from 'react';
import PropTypes from 'prop-types';

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
    this.state = {
      projects: props.projects,
    };
  }

  componentDidMount() {
    const { projects } = this.state;
    window.console.log(projects);
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
        <div className="add-project-btn">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.callProjectModal()}
          >
            Add New +
          </button>
        </div>
        <div className="m-5">
          <div className="row">
            <div className="d-flex flex-wrap w-100">
              {/* Projects array */}
              {projects.map(project => (
                <div key={project.id} className="card card-body custom-w-20 custom-column-body">
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
              ))}

            </div>
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
