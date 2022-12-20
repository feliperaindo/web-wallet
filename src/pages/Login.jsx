import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions';
import { validateEmail, validatePassword } from '../services/validationInputs';

class Login extends Component {
  state = {
    inputPassword: '',
    emailInput: '',
    isValidEmail: false,
    isValidPassword: false,
  };

  onInputChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validations);
  };

  validations = () => {
    const { inputPassword, emailInput } = this.state;
    const checkEmail = validateEmail(emailInput);
    const checkPassword = validatePassword(inputPassword);
    this.setState({ isValidEmail: checkEmail, isValidPassword: checkPassword });
  };

  singIn = () => {
    const { dispatch } = this.props;
    const { emailInput } = this.state;
    dispatch(login(emailInput));
  };

  render() {
    const { emailInput, inputPassword, isValidEmail, isValidPassword } = this.state;

    return (
      <main>
        <section>
          <img src="https://pngimg.com/uploads/free/free_PNG90775.png" alt="Logomarca" />
          <label htmlFor="email-input">
            <input
              type="email"
              name="emailInput"
              id="email-input"
              data-testid="email-input"
              placeholder="Insira seu email"
              value={ emailInput }
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="input-password">
            <input
              type="password"
              name="inputPassword"
              id="input-password"
              data-testid="password-input"
              placeholder="Insira sua senha"
              value={ inputPassword }
              onChange={ this.onInputChange }
            />
            <Link to="/carteira">
              <button
                type="button"
                data-testid="login-button"
                disabled={ !(isValidEmail && isValidPassword) }
                onClick={ this.singIn }
              >
                Entrar
              </button>
            </Link>
          </label>
        </section>
      </main>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
