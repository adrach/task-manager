import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


class ReorderProjectsModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleLocalDragEnd = this.handleLocalDragEnd.bind(this);

    this.state = {
      projects: props.projects,
    };
  }

  handleLocalDragEnd(data) {
    const { projects } = this.state;
    const { onDragEnd } = this.props;
    const { destination, source, draggableId } = data;

    if (
      !destination
      || (source.index === destination.index && source.droppableId === destination.droppableId)
    ) return;

    const parsedDraggableId = parseInt(draggableId.split('-').pop(), 10);
    const newProjectIds = projects.sort((a, b) => a.order - b.order).map(p => p.id);
    newProjectIds.splice(source.index, 1);
    newProjectIds.splice(destination.index, 0, parsedDraggableId);

    this.setState({
      projects: projects.map(p => Object.assign({}, p, {
        order: newProjectIds.indexOf(p.id),
      })),
    }, () => onDragEnd(data));
  }

  render() {
    const { projects } = this.state;
    const { onDragStart } = this.props;

    return (
      <div
        className="modal fade reorder-projects"
        id="reorderProjectsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="reorderProjectsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reorderProjectsModalLabel">Reorder Projects</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <DragDropContext
              onDragStart={onDragStart}
              onDragEnd={this.handleLocalDragEnd}
            >
              <Droppable
                droppableId="projects"
                type="projects"
              >
                {(providedDroppable, snapshot) => (
                  <div
                    className={`reorder-projects-container custom-field ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    ref={providedDroppable.innerRef}
                    {...providedDroppable.droppableProps}
                  >
                    {projects.sort((a, b) => a.order - b.order).map((project, index) => (
                      <Draggable
                        key={project.id}
                        draggableId={`project-${project.id}`}
                        index={index}
                      >
                        {(providedDraggable, snapshotDraggable) => (
                          <div
                            className={`reorder-projects-item ${snapshotDraggable.isDragging ? 'item-dragging' : ''}`}
                            ref={providedDraggable.innerRef}
                            {...providedDraggable.draggableProps}
                            {...providedDraggable.dragHandleProps}
                          >
                            <div className="item-draggable">
                              <i className="icon icon-draggable" />
                            </div>
                            <span>{project.title}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {providedDroppable.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

ReorderProjectsModal.propTypes = {
  projects: PropTypes.instanceOf(Array),
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

ReorderProjectsModal.defaultProps = {
  projects: [],
};

export default ReorderProjectsModal;
