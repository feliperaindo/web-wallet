import { Component } from 'react';
import PropTypes from 'prop-types';
import { calculatorFunction } from '../services/Calculator';
import { expensesValidator } from '../services/PropsValidator';

class Header extends Component {
  state = {
    currency: 'BRL',
  };

  calculateTotal = (expenses) => ((expenses.length)
    ? calculatorFunction(expenses)
    : 0);

  render() {
    const { email, expenses } = this.props;
    const { currency } = this.state;

    const total = this.calculateTotal(expenses);

    return (
      <header>
        <section data-testid="email-field">{ email }</section>
        <span data-testid="header-currency-field">{ currency }</span>
        <span data-testid="total-field">{ total }</span>
      </header>
    );
  }
}

Header.defaultProps = {
  email: 'Usuário não logado',
  expenses: [],
};

Header.propTypes = {
  email: PropTypes.string,
  expenses: expensesValidator,
};

export default Header;
