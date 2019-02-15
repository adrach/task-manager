import React from 'react';
import PropTypes from 'prop-types';

class TasksContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    window.console.log('success!');
  }

  render() {
    const { greeting } = this.props;
    return (
      <div>
        Greeting:
        {' '}
        {greeting}
      </div>
    );
  }
}

TasksContainer.propTypes = {
  greeting: PropTypes.string.isRequired,
};

export default TasksContainer;
