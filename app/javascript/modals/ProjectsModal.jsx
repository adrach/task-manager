import React from 'react';
import PropTypes from 'prop-types';


const ProjectsModal = ({ handleSubmit }) => (
  <div
    className="modal fade"
    id="projectsModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="projectsModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="projectsModalLabel">Add Project</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">
                {'Project Title'}
              </label>
              <input
                required
                type="text"
                name="title"
                className="form-control"
                id="title"
                placeholder="Enter title..."
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              {'Close'}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

ProjectsModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ProjectsModal;