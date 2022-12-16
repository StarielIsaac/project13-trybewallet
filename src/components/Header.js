import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  valueAll = () => {
    const { expenses } = this.props;
    const soma = expenses.reduce((acc, curr) => (
      acc + curr.exchangeRates[curr.currency].ask * curr.value
    ), 0);
    return soma.toFixed(2);
  };

  render() {
    const { user } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{`Email: ${user}`}</h4>
        <h4 data-testid="total-field">{ this.valueAll()}</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  user: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  user: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
