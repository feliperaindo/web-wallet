import { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  render() {
    const { currencies, nameCurrencies, valueInput, descriptionInput,
      currencyInput, paymentMethod, tag, inputChange, saveExpense } = this.props;

    const currencyOptionsElements = currencies.map((currency) => (
      <option
        key={ currency }
        value={ currency }
      >
        {`${currency} - ${nameCurrencies[currency]}`}
      </option>
    ));

    return (
      <form>
        <label htmlFor="value-input">
          <input
            type="number"
            name="valueInput"
            id="value-input"
            data-testid="value-input"
            value={ valueInput }
            onChange={ inputChange }
          />
        </label>
        <label htmlFor="description-input">
          <input
            type="textarea"
            name="descriptionInput"
            id="description-input"
            data-testid="description-input"
            value={ descriptionInput }
            placeholder="insira a descrição desse gasto aqui"
            rows="2"
            cols="50"
            onChange={ inputChange }
          />
        </label>
        <select
          name="currencyInput"
          value={ currencyInput }
          id="currency-input"
          data-testid="currency-input"
          onChange={ inputChange }
        >
          { currencyOptionsElements }
        </select>
        <select
          name="paymentMethod"
          id="payment-method"
          data-testid="method-input"
          value={ paymentMethod }
          onChange={ inputChange }
        >
          <option value="cash">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          value={ tag }
          onChange={ inputChange }
        >
          <option value="food">Alimentação</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
          <option value="work">Trabalho</option>
          <option value="recreation">Lazer</option>
        </select>
        <button type="button" onClick={ saveExpense }>Adicionar despesa</button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  nameCurrencies: PropTypes.object,
  valueInput: PropTypes.number,
  descriptionInput: PropTypes.string,
  currencyInput: PropTypes.string,
  paymentMethod: PropTypes.string,
  tag: PropTypes.string,
  inputChange: PropTypes.func,
  saveExpense: PropTypes.func,
}.isRequired;

export default WalletForm;
