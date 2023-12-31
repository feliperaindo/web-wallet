import { Component } from 'react';
import PropTypes from 'prop-types';
import { nameCurrencyValidator } from '../services/PropsValidator';

class WalletForm extends Component {
  render() {
    const { currencies, nameCurrencies, value, description,
      currency, method, tag, inputChange, saveExpense, editor, saveEdit } = this.props;

    const currencyOptionsElements = currencies.map((eachCurrency) => (
      <option
        key={ eachCurrency }
        value={ eachCurrency }
      >
        {`${eachCurrency} - ${nameCurrencies[eachCurrency]}`}
      </option>
    ));

    return (
      <form>
        <label htmlFor="value-input">
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ inputChange }
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="textarea"
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ description }
            placeholder="insira a descrição desse gasto aqui"
            rows="2"
            cols="50"
            onChange={ inputChange }
          />
        </label>
        <select
          name="currency"
          value={ currency }
          id="currency-input"
          data-testid="currency-input"
          onChange={ inputChange }
        >
          { currencyOptionsElements }
        </select>
        <select
          name="method"
          id="payment-method"
          data-testid="method-input"
          value={ method }
          onChange={ inputChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ inputChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Lazer">Lazer</option>
        </select>
        {
          (editor)
            ? <button type="button" onClick={ saveEdit }>Editar despesa</button>
            : <button type="button" onClick={ saveExpense }>Adicionar despesa</button>
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  descriptionInput: PropTypes.string,
  currencyInput: PropTypes.string,
  paymentMethod: PropTypes.string,
  tag: PropTypes.string,
  editor: PropTypes.bool,
  valueInput: PropTypes.number,
  inputChange: PropTypes.func,
  saveExpense: PropTypes.func,
  saveEdit: PropTypes.func,
  nameCurrencies: nameCurrencyValidator,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default WalletForm;
