import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionFetchKeys } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valorInput: '',
    descricaoId: '',
    moedaSelect: 'USD',
    pagamentoInput: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const resp = await data.json();
    const keys = Object.keys(resp);
    const response = keys.filter((element) => element !== 'USDT');
    dispatch(actionFetchKeys(response));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { valorInput, descricaoId, moedaSelect, pagamentoInput, tagInput } = this.state;
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
              name="valorInput"
              onChange={ this.handleChange }
              value={ valorInput }
            />
          </label>
          <label htmlFor="descricao-id">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="descricao-id"
              name="descricaoId"
              onChange={ this.handleChange }
              value={ descricaoId }
            />
          </label>
          <label htmlFor="moeda-id">
            Moeda:
            <select
              id="moeda-id"
              name="moedaSelect"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ moedaSelect }
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
              name="pagamentoInput"
              value={ pagamentoInput }
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
              name="tagInput"
              onChange={ this.handleChange }
              value={ tagInput }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

WalletForm.propTypes = {
  currencies: arrayOf(shape({
    element: string.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
