import { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <main>
        <section>
          <img src="" alt="" />
          <label htmlFor="email-input">
            <input
              type="email"
              name="emailInput"
              id="email-input"
              data-testid="email-input"
              placeholder="Insira seu email"
            />
          </label>
          <label htmlFor="input-password">
            <input
              type="password"
              name="inputPassword"
              id="input-password"
              data-testid="input-password"
              placeholder="Insira sua senha"
            />
            <button type="button" data-testid="login-button" disabled>Entrar</button>
          </label>
        </section>
      </main>
    );
  }
}

export default Login;
