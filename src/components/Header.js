import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{`Email: ${user}`}</h4>
        <h4 data-testid="total-field">{`Despesa total: ${0}`}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  user: globalState.user.email,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
