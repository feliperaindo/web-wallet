import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, WalletForm } from '../services/ComponentsExport';
import { saveExpense } from '../redux/actions';
import { allCurrenciesDataRequisition } from '../services/APIServices';
import { expensesValidator, nameCurrencyValidator } from '../services/PropsValidator';

class Wallet extends Component {
  state = {
    valueInput: 0,
    descriptionInput: '',
    currencyInput: '',
    paymentMethod: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    allCurrenciesDataRequisition(dispatch);
  }

  inputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  requestToSaveExpense = () => {
    const newExpense = this.newExpenseCreator();
    const { dispatch } = this.props;
    saveExpense(dispatch, newExpense);
    this.clearState();
  };

  newExpenseCreator = async () => {
    const { valueInput, descriptionInput,
      currencyInput, paymentMethod, tag } = this.state;
    const { expenses } = this.props;

    return {
      valueInput,
      descriptionInput,
      currencyInput,
      paymentMethod,
      tag,
      id: expenses.length,
      exchangeRates: {} };
  };

  clearState = () => {
    this.setState({
      valueInput: 0,
      descriptionInput: '',
      currencyInput: '',
      paymentMethod: '',
      tag: '',
    });
  };

  render() {
    const { email, currencies, nameCurrencies } = this.props;
    const { valueInput, descriptionInput,
      currencyInput, paymentMethod, tag } = this.state;

    return (
      <>
        <Header email={ email } />
        <WalletForm
          currencies={ currencies }
          nameCurrencies={ nameCurrencies }
          currencyInput={ currencyInput }
          valueInput={ valueInput }
          descriptionInput={ descriptionInput }
          paymentMethod={ paymentMethod }
          tag={ tag }
          inputChange={ this.inputChange }
          saveExpense={ this.requestToSaveExpense }
        />
      </>
    );
  }
}

Wallet.defaultProps = {
  email: 'Usuário não logado',
  expenses: [],
};

Wallet.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameCurrencies: nameCurrencyValidator.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    valueInput: PropTypes.string,
    descriptionInput: PropTypes.string,
    currencyInput: PropTypes.string,
    paymentMethod: PropTypes.string,
    tag: PropTypes.string,
    exchangeRates: expensesValidator,
  })),
};

const mapStateToProps = ({
  user: { email }, wallet: { expenses, currencies, nameCurrencies },
}) => ({ email, expenses, currencies, nameCurrencies });

export default connect(mapStateToProps)(Wallet);
