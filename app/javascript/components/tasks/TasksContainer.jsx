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
      <div className="container">
        {/* <div className="row">
          <div className="col">Column 1</div>
          <div className="col">Column 2</div>
          <div className="col">Column 3</div>
          <div className="col">Column 4</div>
          <div className="col">Column 5</div>
        </div> */}
        <div className="row">
          <div className="d-flex flex-wrap w-100">
            <div className="card card-body w-20">
            Column 1
            </div>
            <div className="card card-body w-20">
            Column 2
            </div>
            <div className="card card-body w-20">
            Column 3
            </div>
            <div className="card card-body w-20">
            Column 4
            </div>
            <div className="card card-body w-20">
            Column 5
            </div>
            <div className="card card-body w-20">
            Column 6
            </div>
            <div className="card card-body w-20">
            Column 7
            </div>
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
