import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Table, WalletForm } from '../services/ComponentsExport';
import { allCurrenciesDataRequisition, requestCurrencies } from '../services/APIServices';
import { expensesValidator, nameCurrencyValidator } from '../services/PropsValidator';
import { addExpense, editExpense, enableEditor,
  removeExpense, saveIdToEdit } from '../redux/actions';

class Wallet extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
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
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const removedExpense = expenses.filter(({ id }) => `${id}` !== target.id);
    dispatch(removeExpense(removedExpense));
  };

  startEditExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    dispatch(enableEditor());

    const { value, currency, method, tag, description, id } = expenses
      .find(({
        id: eachId,
        description: eachDescription }) => `${eachId}-${eachDescription}` === target.id);

    dispatch(saveIdToEdit(id));

    this.setState({ value, currency, method, tag, description });
  };

  saveEdit = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const newExpensesArray = expenses.map((expense) => ((expense.id === idToEdit)
      ? { ...expense, value, description, currency, method, tag }
      : expense));

    dispatch(editExpense(newExpensesArray));
  };

  render() {
    const { email, currencies, nameCurrencies, expenses, editor } = this.props;
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
          editor={ editor }
          saveEdit={ this.saveEdit }
        />
        <Table
          nameCurrencies={ nameCurrencies }
          expenses={ expenses }
          deleteExpense={ this.deleteExpense }
          startEditExpense={ this.startEditExpense }
        />
      </>
    );
  }
}

Wallet.defaultProps = {
  email: 'Usuário não logado',
  expenses: [],
  editor: false,
  idToEdit: 0,
};

Wallet.propTypes = {
  email: PropTypes.string,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
  expenses: expensesValidator,
  dispatch: PropTypes.func.isRequired,
  nameCurrencies: nameCurrencyValidator.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({
  user: { email }, wallet: { expenses, currencies, nameCurrencies, editor, idToEdit },
}) => ({ email, expenses, currencies, nameCurrencies, editor, idToEdit });

export default connect(mapStateToProps)(Wallet);
