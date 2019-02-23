import React from 'react';
import EventBus from 'eventbusjs';

import ProjectModal from './ProjectModal';
import ConfirmationModal from './ConfirmationModal';
import {
  DISPLAY_PROJECT_MODAL, DISPLAY_CONFIRMATION_MODAL, MODAL_TRANSITION_DURATION,
} from '../../constants';


class ModalContainer extends React.Component {
  constructor(props) {
    super(props);

    this.displayProjectModal = this.displayProjectModal.bind(this);
    this.processCloseProjectModal = this.processCloseProjectModal.bind(this);
    this.displayConfirmationModal = this.displayConfirmationModal.bind(this);
    this.processCloseConfirmationModal = this.processCloseConfirmationModal.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {
      shouldRenderProjectModal: false,
      shouldRenderConfirmationModal: false,
    };
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
  }

  // Display
  displayProjectModal(target, data) {
    this.setState({
      handleSubmit: data.handleSubmit,
      shouldRenderProjectModal: true,
    }, () => this.modalToggle('#projectsModal'));
  }

  displayConfirmationModal(target, data) {
    this.setState({
      handleSubmit: data.handleSubmit,
      question: data.question,
      additionalData: data.additionalData,
      shouldRenderConfirmationModal: true,
    }, () => this.modalToggle('#confirmationModal'));
  }

  // After close action
  processCloseProjectModal(e) {
    e.preventDefault();
    const { handleSubmit } = this.state;
    const field = e.target[0];
    this.modalToggle('#projectsModal');
    handleSubmit(field);
    setTimeout(() => {
      this.setState({
        shouldRenderProjectModal: false,
      });
    }, MODAL_TRANSITION_DURATION);
  }

  processCloseConfirmationModal(data) {
    const { handleSubmit } = this.state;
    this.modalToggle('#confirmationModal');
    handleSubmit(data);
    setTimeout(() => {
      this.setState({
        shouldRenderConfirmationModal: false,
      });
    }, MODAL_TRANSITION_DURATION);
  }

  // other functions
  modalToggle(id) {
    $(id).modal('toggle');
  }

  render() {
    const {
      shouldRenderProjectModal, shouldRenderConfirmationModal,
      additionalData, question,
    } = this.state;

    return (
      <div>
        {shouldRenderProjectModal && (
          <ProjectModal
            handleSubmit={this.processCloseProjectModal}
          />
        )}
        {shouldRenderConfirmationModal && (
          <ConfirmationModal
            handleSubmit={this.processCloseConfirmationModal}
            question={question}
            additionalData={additionalData}
          />
        )}
      </div>
    );
  }
}

export default ModalContainer;
