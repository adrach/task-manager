import React from 'react';
import PropTypes from 'prop-types';

import callEvent from '../../services/events';
import { DISPLAY_CONFIRMATION_MODAL } from '../../constants';

class ProjectPopUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDestroy = this.handleDestroy.bind(this);
    this.callConfirmationModal = this.callConfirmationModal.bind(this);
    this.state = {
      actions: props.actions,
      showLinksPopUp: false,
      editMode: false,
    };
  }

  handleDestroy(data) {
    const { id, target } = data;
    const { handleProjectDestroy, handleActionDestroy } = this.props;
    const func = target === 'project' ? handleProjectDestroy : handleActionDestroy;
    func(id);
  }

  callConfirmationModal(question, additionalData) {
    callEvent(DISPLAY_CONFIRMATION_MODAL, {
      handleSubmit: this.handleDestroy,
      question,
      additionalData,
    });
  }

  render() {
    const {
      actions, showLinksPopUp, editMode,
    } = this.state;
    const { projectId, projectTitle } = this.props;
    return (
      <div className="row custom-space-between">
        {/* Header */}
        <div className="w-85 custom-field">
          {projectTitle}
        </div>
        <div className="toggler-container float-right">
          <button
            className="navbar-toggler navbar-light"
            type="button"
            onClick={() => this.setState({ showLinksPopUp: true })}
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
        {/* Pop-up */}
        {!!showLinksPopUp && (
          <div className="actions-popup">
            <div
              className="close-popup"
              onClick={() => this.setState({ showLinksPopUp: false })}
            >
              <i className="icon icon-close-popup" />
            </div>
            <div className="title-popup custom-space-between">
              {'Links'}
              <div
                className="edit-links"
                onClick={() => this.setState({ editMode: !editMode })}
              >
                <i className="icon icon-edit-links" />
              </div>
            </div>
            {/* Links */}
            {!actions.length && (
              <div className="p-1">
                {'This project has no links ...'}
              </div>
            )}
            {actions.map(action => (
              <div
                key={action.id}
                className="link-item-popup"
              >
                <a
                  target="blank"
                  href={action.url}
                >
                  {action.name}
                </a>
              </div>
            ))}
            {/* Add link */}
            {!!editMode && (
              <div
                className="add-links"
                onClick={() => window.alert('Coming soon!')}
              >
                <i className="icon icon-add-circle" />
              </div>
            )}
            {/* Destroy Project */}
            <button
              type="button"
              className="btn btn-danger btn-sm project-delete-btn"
              data-toggle="modal"
              data-target="#confirmationModal"
              onClick={() => this.callConfirmationModal(
                `Are you sure that you want to destroy project ${projectTitle} ?`,
                {
                  target: 'project',
                  id: projectId,
                },
              )}
            >
              <i className="icon icon-delete" />
              {'Delete'}
            </button>
          </div>
        )}
      </div>
    );
  }
}

ProjectPopUp.propTypes = {
  projectId: PropTypes.number.isRequired,
  projectTitle: PropTypes.string.isRequired,
  actions: PropTypes.instanceOf(Array),
  handleProjectDestroy: PropTypes.func.isRequired,
  handleActionDestroy: PropTypes.func.isRequired,
};

ProjectPopUp.defaultProps = {
  actions: [],
};

export default ProjectPopUp;
