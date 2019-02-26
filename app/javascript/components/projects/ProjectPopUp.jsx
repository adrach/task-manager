import React from 'react';
import PropTypes from 'prop-types';

import callEvent from '../../services/events';
import { DISPLAY_CONFIRMATION_MODAL, DISPLAY_ACTION_MODAL } from '../../constants';

class ProjectPopUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDestroy = this.handleDestroy.bind(this);
    this.callConfirmationModal = this.callConfirmationModal.bind(this);
    this.callActionModal = this.callActionModal.bind(this);
    this.handleProjectUpdate = this.handleProjectUpdate.bind(this);
    this.handleActionChange = this.handleActionChange.bind(this);
    this.onActionsUpdate = this.onActionsUpdate.bind(this);
    this.handleEditModeChange = this.handleEditModeChange.bind(this);
    this.state = {
      actions: props.actions,
      showLinksPopUp: false,
      editMode: false,
      showProjectTitleInput: false,
      title: props.projectTitle,
    };
  }

  // base
  componentDidUpdate(prevProps) {
    const { actions } = this.props;
    if (actions !== prevProps.actions) {
      this.onActionsUpdate(actions);
    }
  }

  onActionsUpdate(actions) {
    this.setState({ actions });
  }

  // events
  callConfirmationModal(question, additionalData) {
    callEvent(DISPLAY_CONFIRMATION_MODAL, {
      handleSubmit: this.handleDestroy,
      question,
      additionalData,
    });
  }

  callActionModal(additionalData) {
    callEvent(DISPLAY_ACTION_MODAL, { handleSubmit: this.handleActionChange, additionalData });
  }

  // handle
  handleDestroy(data) {
    const { id, target } = data;
    const { handleProjectDestroy, handleActionDestroy } = this.props;
    const func = target === 'project' ? handleProjectDestroy : handleActionDestroy;
    func(id);
  }

  handleActionChange(form, data) {
    const { id, type } = data;
    const { handleActionCreate, handleActionUpdate } = this.props;
    const func = type === 'create' ? handleActionCreate : handleActionUpdate;
    func(form, id);
  }

  handleProjectUpdate(id) {
    const { title } = this.state;
    const { validateInlineInputText, handleProjectUpdate } = this.props;
    if (!validateInlineInputText(title)) return;
    this.setState({ showProjectTitleInput: false }, () => handleProjectUpdate({ title }, id));
  }

  handleEditModeChange(oldMode) {
    const popup = $(this.popup);
    oldMode ? popup.removeClass('edit-mode') : popup.addClass('edit-mode');
    this.setState({ editMode: !oldMode });
  }

  render() {
    const {
      actions, showLinksPopUp, editMode, showProjectTitleInput, title,
    } = this.state;
    const {
      projectId, projectTitle,
    } = this.props;
    return (
      <div className="row custom-space-between">
        {/* Header */}
        <div className="w-85 custom-field project-title">
          {/* ProjectTitle with dblClick edit mode */}
          {showProjectTitleInput
            ? (
              <div className="editable-items">
                <input
                  id="projectTitleInput"
                  ref={(input) => { this.projectTitleInput = input; }}
                  type="text"
                  value={title}
                  onChange={e => this.setState({ title: e.target.value })}
                  name="title"
                />
                <div className="item-edit-actions">
                  <div
                    className="item-edit"
                    onClick={() => this.handleProjectUpdate(projectId)}
                  >
                    <i className="icon icon-edit" />
                  </div>
                  <div
                    className="item-close"
                    onClick={() => this.setState({
                      title: projectTitle,
                      showProjectTitleInput: false,
                    })}
                  >
                    <i className="icon icon-close" />
                  </div>
                </div>
              </div>
            )
            : (
              <span onDoubleClick={() => this.setState({
                showProjectTitleInput: true,
              }, () => this.projectTitleInput.focus())}
              >
                {title}
              </span>
            )
          }
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
          <div
            ref={(popup) => { this.popup = popup; }}
            className="actions-popup"
          >
            <div
              className="close-popup"
              onClick={() => this.setState({ showLinksPopUp: false, editMode: false })}
            >
              <i className="icon icon-close-popup" />
            </div>
            <div className="title-popup custom-space-between">
              {'Links'}
              <div
                className="edit-links"
                onClick={() => this.handleEditModeChange(editMode)}
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
                className="link-item-popup editable-items"
              >
                <a
                  target="blank"
                  href={action.url}
                >
                  {action.name}
                </a>
                {editMode && (
                  <div className="item-edit-actions">
                    <div
                      className="item-edit"
                      onClick={() => this.callActionModal({
                        id: action.id,
                        type: 'update',
                        name: action.name,
                        url: action.url,
                      })}
                    >
                      <i className="icon icon-edit" />
                    </div>
                    <div
                      className="item-close"
                      onClick={() => this.callConfirmationModal(
                        `Are you sure that you want to destroy action "${action.name}" ?`,
                        {
                          target: 'action',
                          id: action.id,
                        },
                      )}
                    >
                      <i className="icon icon-close" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Add link */}
            {!!editMode && (
              <div
                className="add-links"
                onClick={() => this.callActionModal({ id: projectId, type: 'create' })}
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
                `Are you sure that you want to destroy project "${title}" ?`,
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
  handleProjectUpdate: PropTypes.func.isRequired,
  validateInlineInputText: PropTypes.func.isRequired,
  handleActionCreate: PropTypes.func.isRequired,
  handleActionUpdate: PropTypes.func.isRequired,
};

ProjectPopUp.defaultProps = {
  actions: [],
};

export default ProjectPopUp;
