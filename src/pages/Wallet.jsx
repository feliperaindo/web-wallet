import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, WalletForm } from '../services/ComponentsExport';
import { addExpense, updateGlobalStateWithCurrencies } from '../redux/actions';
import { requestCurrencies, filterCurrencies } from '../services/APIServices';

class Wallet extends Component {
  state = {
    currencies: {},
    valueInput: 0,
    descriptionInput: '',
    currencyInput: '',
    paymentMethod: '',
    tag: '',
  };

  componentDidMount() {
    this.saveResultFromAPI();
  }

  saveResultFromAPI = async () => {
    const { dispatch } = this.props;
    const allCurrencies = await requestCurrencies();
    const listOfCurrencies = filterCurrencies(allCurrencies);
    this.setState(
      { currencies: { ...listOfCurrencies } },
      () => updateGlobalStateWithCurrencies(dispatch, Object.keys(listOfCurrencies)),
    );
  };

  inputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  saveExpense = async () => {
    const newExpense = await this.newExpenseCreator();

    const { dispatch } = this.props;

    dispatch(addExpense(newExpense));

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
      exchangeRates: await requestCurrencies() };
  };

  clearState = () => {
    this.setState({
      currencies: {},
      valueInput: 0,
      descriptionInput: '',
      currencyInput: '',
      paymentMethod: '',
      tag: '',
    });
  };

  render() {
    const { email } = this.props;
    const { currencies, valueInput, descriptionInput,
      currencyInput, paymentMethod, tag } = this.state;

    return (
      <>
        <Header email={ email } />
        <WalletForm
          currencies={ currencies }
          currencyInput={ currencyInput }
          valueInput={ valueInput }
          descriptionInput={ descriptionInput }
          paymentMethod={ paymentMethod }
          tag={ tag }
          inputChange={ this.inputChange }
          saveExpense={ this.saveExpense }
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
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    valueInput: PropTypes.string,
    descriptionInput: PropTypes.string,
    currencyInput: PropTypes.string,
    paymentMethod: PropTypes.string,
    tag: PropTypes.string,
  })),
};

const mapStateToProps = ({
  user: { email }, wallet: { expenses },
}) => ({ email, expenses });

export default connect(mapStateToProps)(Wallet);
