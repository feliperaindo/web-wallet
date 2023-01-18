import { Component } from 'react';
import { conversor } from '../services/Calculator';
import { expensesValidator } from '../services/PropsValidator';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    const infoToPopulate = expenses
      .map(({ description, tag, method, id, value, currency, exchangeRates }) => (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{ Number(value).toFixed(2) }</td>
          <td>{ exchangeRates[currency].name }</td>
          <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
          <td>{ conversor(value, exchangeRates[currency].ask).toFixed(2) }</td>
          <td>Real</td>
          <button data-testid="delete-btn" type="button">Deletar</button>
        </tr>
      ));

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
        <tbody>{ infoToPopulate }</tbody>
      </table>
    );
  }
}

Table.defaultProps = {
  expenses: [],
};

Table.propTypes = {
  expenses: expensesValidator,
};

export default Table;
