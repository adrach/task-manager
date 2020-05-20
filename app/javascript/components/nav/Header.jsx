import React from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    api.auth.logout()
      .then(() => { window.location.href = '/'; })
      .catch(err => window.console.log(err));
  }

  render() {
    const { user, children } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-dark">
        <a className="navbar-brand" href="#">Task Manager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" />
          <ul className="navbar-nav my-2 my-lg-0">
            {children}
            <span className="nav-user-email">{user.email}</span>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.handleLogout}>Sign out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.instanceOf(Object),
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  user: {},
};

export default Header;
