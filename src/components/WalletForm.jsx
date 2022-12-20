import { Component } from 'react';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  state = {
    valueInput: 0,
    descriptionInput: '',
    currencyInput: '',
    paymentMethod: '',
    tag: '',
  };

  inputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { valueInput, descriptionInput,
      currencyInput, paymentMethod, tag } = this.state;
    const { currencies } = this.props;

    const currencyOptionsElements = Object.values(currencies).map(({ code, name }) => (
      <option key={ code } value={ code }>{`${code} - ${name}`}</option>
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
            onChange={ this.inputChange }
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
            onChange={ this.inputChange }
          />
        </label>
        <select
          name="currencyInput"
          value={ currencyInput }
          id="currency-input"
          data-testid="currency-input"
          onChange={ this.inputChange }
        >
          { currencyOptionsElements }
        </select>
        <select
          name="paymentMethod"
          id="payment-method"
          data-testid="method-input"
          value={ paymentMethod }
          onChange={ this.inputChange }
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
          onChange={ this.inputChange }
        >
          <option value="food">Alimentação</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
          <option value="work">Trabalho</option>
          <option value="recreation">Lazer</option>
        </select>
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.object,
}.isRequired;

export default WalletForm;
