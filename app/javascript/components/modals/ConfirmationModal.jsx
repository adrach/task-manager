import React from 'react';
import PropTypes from 'prop-types';


const ConfirmationModal = ({
  handleSubmit, handleReject, question, additionalData,
}) => (
  <div
    className="modal fade"
    id="confirmationModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="confirmationModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="confirmationModalLabel">Confirmation</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {question}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={handleReject}
          >
            {'Cancel'}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(additionalData)}
            data-dismiss="modal"
            className="btn btn-danger"
          >
            {'Delete'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

ConfirmationModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  additionalData: PropTypes.instanceOf(Object),
};

ConfirmationModal.defaultProps = {
  additionalData: {},
};

export default ConfirmationModal;
