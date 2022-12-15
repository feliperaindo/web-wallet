import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

mapStateToProps = ({ user: { email } }) => ({ email });

class Wallet extends Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <Header email={ email } />
        <div>TrybeWallet</div>
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

export default connect(mapStateToProps)(Wallet);
