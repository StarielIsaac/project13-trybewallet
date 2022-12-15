import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchKeys, fetchApi } from '../redux/actions';
import Table from './Table';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resp = await data.json();
    const keys = Object.keys(resp);
    const response = keys.filter((element) => element !== 'USDT');
    dispatch(actionFetchKeys(response));
  }

  saveInfoGlobal = () => {
    const allInfo = { ...this.state };
    // console.log(allInfo);
    const { dispatch, expenses } = this.props;
    dispatch(fetchApi(allInfo, expenses));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value,
      description, currency,
      method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="valor-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="valor-input"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>
          <label htmlFor="descricao-id">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="descricao-id"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <label htmlFor="moeda-id">
            Moeda:
            <select
              id="moeda-id"
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
            >
              { currencies.map((element) => (
                <option key={ element } value={ element }>{element}</option>)) }
            </select>
          </label>

          <label htmlFor="pagamento-input">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="pagamento-input"
              onChange={ this.handleChange }
              name="method"
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-Input">
            tag:
            <select
              data-testid="tag-input"
              id="tag-Input"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.saveInfoGlobal }>
            Adicionar despesa
          </button>
        </form>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

// value(pin):"123"
// description(pin):"ddd"
// currency(pin):"USD"
// method(pin):"Dinheiro"
// tag

WalletForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
