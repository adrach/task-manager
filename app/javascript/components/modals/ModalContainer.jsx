import React from 'react';
import EventBus from 'eventbusjs';

import ProjectModal from './ProjectModal';
import ConfirmationModal from './ConfirmationModal';
import ActionModal from './ActionModal';
import {
  MODAL_TRANSITION_DURATION, DISPLAY_PROJECT_MODAL, DISPLAY_CONFIRMATION_MODAL,
  DISPLAY_ACTION_MODAL,
} from '../../constants';

const defaultState = {
  shouldRenderProjectModal: false,
  shouldRenderConfirmationModal: false,
  shouldRenderActionModal: false,
  question: '',
  additionalData: {},
};

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.displayProjectModal = this.displayProjectModal.bind(this);
    this.processCloseProjectModal = this.processCloseProjectModal.bind(this);
    this.displayConfirmationModal = this.displayConfirmationModal.bind(this);
    this.processCloseConfirmationModal = this.processCloseConfirmationModal.bind(this);
    this.displayActionModal = this.displayActionModal.bind(this);
    this.processCloseActionModal = this.processCloseActionModal.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.stateToDefault = this.stateToDefault.bind(this);
    this.state = defaultState;
  }

  // Did Mount
  componentDidMount() {
    EventBus.addEventListener(
      DISPLAY_PROJECT_MODAL,
      this.displayProjectModal,
      this,
    );
    EventBus.addEventListener(
      DISPLAY_CONFIRMATION_MODAL,
      this.displayConfirmationModal,
      this,
    );
    EventBus.addEventListener(
      DISPLAY_ACTION_MODAL,
      this.displayActionModal,
      this,
    );
  }

  componentWillUnmount() {
    EventBus.removeEventListener(
      DISPLAY_PROJECT_MODAL,
      this.displayProjectModal,
      this,
    );
    EventBus.removeEventListener(
      DISPLAY_CONFIRMATION_MODAL,
      this.displayConfirmationModal,
      this,
    );
    EventBus.removeEventListener(
      DISPLAY_ACTION_MODAL,
      this.displayActionModal,
      this,
    );
  }

  // Display
  displayProjectModal(target, data) {
    this.setState({
      handleSubmit: data.handleSubmit,
      shouldRenderProjectModal: true,
    }, () => this.modalToggle('#projectModal'));
  }

  displayConfirmationModal(target, data) {
    this.setState({
      handleSubmit: data.handleSubmit,
      question: data.question,
      additionalData: data.additionalData,
      shouldRenderConfirmationModal: true,
    }, () => this.modalToggle('#confirmationModal'));
  }

  displayActionModal(target, data) {
    this.setState({
      handleSubmit: data.handleSubmit,
      additionalData: data.additionalData,
      shouldRenderActionModal: true,
    }, () => this.modalToggle('#actionModal'));
  }

  // After close action
  processCloseProjectModal(e) {
    e.preventDefault();
    const { handleSubmit } = this.state;
    const field = e.target[0];
    this.modalToggle('#projectModal');
    handleSubmit(field);
    this.stateToDefault();
  }

  processCloseConfirmationModal(data) {
    const { handleSubmit } = this.state;
    this.modalToggle('#confirmationModal');
    handleSubmit(data);
    this.stateToDefault();
  }

  processCloseActionModal(e, data) {
    e.preventDefault();
    const { handleSubmit } = this.state;
    this.modalToggle('#actionModal');
    handleSubmit({
      name: e.target.name.value,
      url: e.target.url.value,
    }, data);
    this.stateToDefault();
  }

  // other functions
  modalToggle(id) {
    $(id).modal('toggle');
  }

  stateToDefault() {
    setTimeout(() => {
      this.setState(defaultState);
    }, MODAL_TRANSITION_DURATION);
  }

  render() {
    const {
      shouldRenderProjectModal, shouldRenderConfirmationModal, shouldRenderActionModal,
      additionalData, question,
    } = this.state;

    return (
      <div>
        {shouldRenderProjectModal && (
          <ProjectModal
            handleSubmit={this.processCloseProjectModal}
            handleReject={this.stateToDefault}
          />
        )}
        {shouldRenderConfirmationModal && (
          <ConfirmationModal
            handleSubmit={this.processCloseConfirmationModal}
            handleReject={this.stateToDefault}
            question={question}
            additionalData={additionalData}
          />
        )}
        {shouldRenderActionModal && (
          <ActionModal
            handleSubmit={this.processCloseActionModal}
            handleReject={this.stateToDefault}
            additionalData={additionalData}
          />
        )}
      </div>
    );
  }
}

export default ModalContainer;
