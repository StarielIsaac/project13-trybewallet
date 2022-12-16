import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  // const { expenses } = this.props
  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({ method, description, exchangeRates, currency,
            value, id, tag }) => {
            // console.log(method);
            // console.log(description);
            // console.log(exchangeRates);
            // console.log(currency);
            // console.log(value);
            // console.log(id);
            // console.log(tag);
            const valorConversao = exchangeRates[currency].ask;
            const MOEDA_CONVERSAO = 'Real';
            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{`${exchangeRates[currency].name}`}</td>
                <td>{`${Number(exchangeRates[currency].ask).toFixed(2)}`}</td>
                <td>
                  {`${Number((valorConversao) * Number(value)).toFixed(2)}`}
                </td>
                <td>{ MOEDA_CONVERSAO }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Table);

// Descrição;
// Tag;
// Método de pagamento;
// Valor;
// Moeda;
// Câmbio utilizado;
// Valor convertido;
// Moeda de conversão;
// Editar/Excluir
