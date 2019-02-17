import React from 'react';
import PropTypes from 'prop-types';

class TasksContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { greeting } = this.props;
    window.console.log(greeting);
  }

  render() {
    return (
      <div className="m-5">
        <div className="row">
          <div className="d-flex flex-wrap w-100">
            {/* stub array */}
            {[...Array(8)].map((e, i) => (
              <div className="card card-body custom-w-20 custom-column-body">
                {/* row title + toggle */}
                <div className="row custom-space-between">
                  <div className="w-75 custom-field">
                    {`Title-${i + 1}`}
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
                      onClick={() => window.console.log(`click on item #${i + 1}`)}
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
    );
  }
}

TasksContainer.propTypes = {
  greeting: PropTypes.string.isRequired,
};

export default TasksContainer;
