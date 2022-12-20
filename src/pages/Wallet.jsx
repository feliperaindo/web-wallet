import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, WalletForm } from '../services/ComponentsExport';
import { requestCurrencies, filterCurrencies } from '../services/APIServices';
import { addCurrencies } from '../redux/actions';

class Wallet extends Component {
  state = { currencies: {} };

  componentDidMount() {
    this.makeAPIRequest();
  }

  makeAPIRequest = async () => {
    const allCurrencies = await requestCurrencies();
    const listOfCurrencies = filterCurrencies(allCurrencies);
    this.setState(
      { currencies: { ...listOfCurrencies } },
      () => this.updateGlobalState(Object.keys(listOfCurrencies)),
    );
  };

  updateGlobalState = (listOfCurrencies) => {
    const { dispatch } = this.props;
    dispatch(addCurrencies(listOfCurrencies));
  };

  render() {
    const { email } = this.props;
    const { currencies } = this.state;

    return (
      <>
        <Header email={ email } />
        <WalletForm currencies={ currencies } />
      </>
    );
  }
}

Wallet.defaultProps = {
  email: 'Usuário não logado',
};

Wallet.propTypes = {
  email: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(Wallet);
