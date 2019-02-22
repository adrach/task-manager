import React from 'react';
import PropTypes from 'prop-types';
import InlineEdit from 'react-edit-inline2';

import ProjectModal from '../../modals/ProjectsModal';
import api from '../../services/api';

class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddProject = this.handleAddProject.bind(this);
    this.validateTaskText = this.validateTaskText.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleTaskCreate = this.handleTaskCreate.bind(this);
    this.state = {
      projects: props.projects,
    };
  }

  componentDidMount() {
    const { projects } = this.state;
    window.console.log(projects);
  }

  handleAddProject(e) {
    e.preventDefault();
    const { projects } = this.state;
    const field = e.target[0];
    api.projects.create({ [field.name]: field.value })
      .then((res) => {
        this.setState({ projects: [res, ...projects] });
        $('#projectsModal').modal('toggle');
      })
      .catch(err => window.console.log(err));
  }

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

  render() {
    const { projects } = this.state;
    return (
      <div id="projects-main-container">
        <ProjectModal handleSubmit={this.handleAddProject} />
        <div className="add-project-btn">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#projectsModal"
          >
            Add New +
          </button>
        </div>
        <div className="m-5">
          <div className="row">
            <div className="d-flex flex-wrap w-100">

              {/* Projects */}
              {projects.map(project => (
                <div key={project.id} className="card card-body custom-w-20 custom-column-body">
                  {/* Row title + toggle */}
                  <div className="row custom-space-between">
                    <div className="w-75 custom-field">
                      {project.title}
                    </div>
                    <div className="float-right">
                      <button
                        className="navbar-toggler navbar-light"
                        type="button"
                        data-toggle="collapse"
                        data-target="#Content"
                        aria-controls="Content"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={() => window.console.log('click on collapse')}
                      >
                        <span className="navbar-toggler-icon" />
                      </button>
                    </div>
                  </div>

                  {/* Entry */}
                  <div className="custom-field custom-entry">
                    {/* Tasks */}
                    {project.tasks.map(task => (
                      <div key={task.id}>
                        <InlineEdit
                          text={task.name}
                          paramName="name"
                          validate={this.validateTaskText}
                          change={data => this.handleTaskChange(data, task.id)}
                        />
                      </div>
                    ))}
                    <div id={`newTask-${project.id}`}>
                      <InlineEdit
                        text=""
                        placeholder="Add new task ..."
                        paramName="name"
                        validate={this.validateTaskText}
                        change={data => this.handleTaskCreate(data, project.id)}
                      />
                    </div>
                  </div>
                  {/* Backlog */}
                  <div className="custom-field custom-backlog row">
                    Backlog
                  </div>
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
