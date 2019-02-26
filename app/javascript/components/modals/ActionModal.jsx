import React from 'react';
import PropTypes from 'prop-types';


const ProjectModal = ({ handleSubmit, additionalData }) => (
  <div
    className="modal fade"
    id="actionModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="actionModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="actionModalLabel">Add Action</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={e => handleSubmit(e, additionalData)}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="title">
                {'Action Name'}
              </label>
              <input
                required
                type="text"
                name="name"
                defaultValue={additionalData.name}
                className="form-control"
                id="name"
                placeholder="Enter name..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">
                {'Action Url'}
              </label>
              <input
                required
                type="text"
                name="url"
                defaultValue={additionalData.url}
                className="form-control"
                id="url"
                placeholder="Enter url..."
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

ProjectModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  additionalData: PropTypes.instanceOf(Object),
};

ProjectModal.defaultProps = {
  additionalData: {},
};

export default ProjectModal;
