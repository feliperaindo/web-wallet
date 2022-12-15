import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, WalletForm } from '../services/ComponentsExport';

class Wallet extends Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <Header email={ email } />
        <WalletForm />
      </>
    );
  }
}

Wallet.defaultProps = {
  email: 'Usuário não logado',
};

Wallet.propTypes = {
  email: PropTypes.string,
};

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(Wallet);
