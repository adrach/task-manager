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

    this.handleAddProject = this.handleAddProject.bind(this);
    this.handleProjectDestroy = this.handleProjectDestroy.bind(this);
    this.validateTaskText = this.validateTaskText.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
    this.callProjectModal = this.callProjectModal.bind(this);
    this.handleActionDestroy = this.handleActionDestroy.bind(this);
    this.state = {
      projects: props.projects,
    };
  }

  componentDidMount() {
    const { projects } = this.state;
    window.console.log(projects);
  }

  // Projects
  handleAddProject(field) {
    const { projects } = this.state;
    api.projects.create({ [field.name]: field.value })
      .then((res) => {
        this.setState({ projects: [res, ...projects] });
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
  validateTaskText(text) {
    return (text.length > 0 && text.length < 64);
  }

  handleTaskChange(data, taskId) {
    const { projects } = this.state;
    const parsedData = data;
    api.tasks.update(parsedData, taskId)
      .then((res) => {
        this.setState({
          projects: projects.map(p => Object.assign({}, p, {
            tasks: p.tasks.map(t => (t.id === taskId ? res : t)),
          })),
        });
      })
      .catch(err => window.console.log(err));
  }

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

  // Actions
  handleActionDestroy() {

  }

  // Other
  callProjectModal() {
    callEvent(DISPLAY_PROJECT_MODAL, { handleSubmit: this.handleAddProject });
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
                  />
                  {/* Tasks */}
                  <TasksContainer
                    tasks={project.tasks}
                    projectId={project.id}
                    handleTaskChange={this.handleTaskChange}
                    handleTaskCreate={this.handleTaskCreate}
                    validateTaskText={this.validateTaskText}
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
