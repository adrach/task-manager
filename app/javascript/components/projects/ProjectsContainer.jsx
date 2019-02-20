import React from 'react';
import PropTypes from 'prop-types';

import ProjectModal from '../../modals/ProjectsModal';
import api from '../../services/api';

class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddProject = this.handleAddProject.bind(this);
    this.state = {
      projects: props.projects,
    };
  }

  // componentDidMount() {
  //   const { projects } = this.state;
  //   window.console.log(projects);
  // }

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
              {projects.map(item => (
                <div key={item.id} className="card card-body custom-w-20 custom-column-body">
                  {/* row title + toggle */}
                  <div className="row custom-space-between">
                    <div className="w-75 custom-field">
                      {item.title}
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
                        onClick={() => window.console.log('click on item ')}
                      >
                        <span className="navbar-toggler-icon" />
                      </button>
                    </div>
                  </div>
                  {/* Entry */}
                  <div className="custom-field custom-entry row">
                    Entry
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
