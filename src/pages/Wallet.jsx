import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Table, WalletForm } from '../services/ComponentsExport';
import { allCurrenciesDataRequisition, requestCurrencies } from '../services/APIServices';
import { expensesValidator, nameCurrencyValidator } from '../services/PropsValidator';
import { addExpense, removeExpense } from '../redux/actions';

class Wallet extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'cash',
    tag: 'food',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    allCurrenciesDataRequisition(dispatch);
  }

  inputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  saveExpense = async () => {
    const quotation = await requestCurrencies();
    const newExpense = this.newExpenseCreator();

    newExpense.exchangeRates = { ...quotation };

    const { dispatch } = this.props;

    dispatch(addExpense(newExpense));

    this.clearState();
  };

  newExpenseCreator = () => {
    const { expenses } = this.props;
    const newExpense = { ...this.state };
    newExpense.id = expenses.length;
    return newExpense;
  };

  clearState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'cash',
      tag: 'food',
    });
  };

  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const removedExpense = expenses.filter(({ id }) => id !== Number(target.id));
    dispatch(removeExpense(removedExpense));
  };

  render() {
    const { email, currencies, nameCurrencies, expenses } = this.props;
    const { value, description,
      currency, method, tag } = this.state;

    return (
      <>
        <Header email={ email } expenses={ expenses } />
        <WalletForm
          currencies={ currencies }
          nameCurrencies={ nameCurrencies }
          currency={ currency }
          value={ value }
          description={ description }
          method={ method }
          tag={ tag }
          inputChange={ this.inputChange }
          saveExpense={ this.saveExpense }
        />
        <Table
          nameCurrencies={ nameCurrencies }
          expenses={ expenses }
          deleteExpense={ this.deleteExpense }
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
  expenses: expensesValidator,
};

const mapStateToProps = ({
  user: { email }, wallet: { expenses, currencies, nameCurrencies },
}) => ({ email, expenses, currencies, nameCurrencies });

export default connect(mapStateToProps)(Wallet);
