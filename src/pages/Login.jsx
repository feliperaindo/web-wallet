import { Component } from 'react';
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
            <button
              type="button"
              data-testid="login-button"
              disabled={ !(isValidEmail && isValidPassword) }
            >
              Entrar
            </button>
          </label>
        </section>
      </main>
    );
  }
}

export default Login;
