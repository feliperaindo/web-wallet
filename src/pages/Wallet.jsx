import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Wallet extends Component {
  render() {
    const { email } = this.props;

    return (
      <>
        <Header email={ email } />
        <p>{email}</p>
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

const mapStateToProps = ({ user: { email } }) => ({ email });

export default connect(mapStateToProps)(Wallet);
