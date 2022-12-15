import { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    total: 0,
    currency: 'BRL',
  };

  render() {
    const { email } = this.props;
    const { total, currency } = this.state;

    return (
      <>
        <section data-testid="email-field">{ email }</section>
        <span data-testid="header-currency-field">{ currency }</span>
        <span data-testid="total-field">{ total }</span>
      </>
    );
  }
}

Header.defaultProps = {
  email: 'Usuário não logado',
};

Header.propTypes = {
  email: PropTypes.string,
};

export default Header;
