import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { captureLoginElements } from './helpers/captureElements';

import { LOGIN_TEST_VALUES, URL_IMG } from '../mock/values';
import { EMPTY_GLOBAL_STORE } from '../mock/mockGlobalState';

import App from '../App';

function logIn() {
  const inputs = captureLoginElements();
  act(() => {
    userEvent.type(inputs.EmailInput, LOGIN_TEST_VALUES.validEmail);
    userEvent.type(inputs.PasswordInput, LOGIN_TEST_VALUES.validPassword);
    userEvent.click(inputs.LoginButton);
  });
}

describe('Sequência de testes relacionada à renderização do `App.jsx` e página `Login.jsx`', () => {
  test('Verifica se a página é renderizada com a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  test('Verifica se a `store` é renderizada ao iniciar a aplicação', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    expect(store.getState()).toEqual(EMPTY_GLOBAL_STORE);
  });

  test('Verifica se os componentes da página html são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const inputs = captureLoginElements();

    expect(inputs.Footer).toBeInTheDocument();
    expect(inputs.EmailInput).toBeInTheDocument();
    expect(inputs.PasswordInput).toBeInTheDocument();
    expect(inputs.Img).toBeInTheDocument();
    expect(inputs.LoginButton).toBeInTheDocument();
    expect(inputs.Img).toHaveAttribute('src', URL_IMG);
    expect(inputs.LoginButton).toBeDisabled();
  });

  test('Verifica se os campos de `email` e `password` podem ser preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputs = captureLoginElements();

    act(() => {
      userEvent.type(inputs.EmailInput, LOGIN_TEST_VALUES.validEmail);
      userEvent.type(inputs.PasswordInput, LOGIN_TEST_VALUES.validPassword);
    });

    expect(inputs.EmailInput).toHaveValue(LOGIN_TEST_VALUES.validEmail);
    expect(inputs.PasswordInput).toHaveValue(LOGIN_TEST_VALUES.validPassword);
  });

  test('Verifica so o botão é habilitado apenas quando valores válidos são inseridos nos campos de input', () => {
    renderWithRouterAndRedux(<App />);

    const inputs = captureLoginElements();

    expect(inputs.LoginButton).toBeDisabled();

    act(() => {
      userEvent.type(inputs.EmailInput, LOGIN_TEST_VALUES.validEmail);
      userEvent.type(inputs.PasswordInput, LOGIN_TEST_VALUES.validPassword);
    });

    expect(inputs.LoginButton).toBeEnabled();

    act(() => {
      userEvent.clear(inputs.EmailInput);
      userEvent.clear(inputs.PasswordInput);
      userEvent.type(inputs.EmailInput, LOGIN_TEST_VALUES.invalidEmail);
      userEvent.type(inputs.PasswordInput, LOGIN_TEST_VALUES.invalidPassword);
    });

    expect(inputs.LoginButton).toBeDisabled();
  });

  test('Verifica se ao clicar no botão `Entrar` a aplicação redireciona o usuário para a página `/carteira`', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    logIn();

    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(LOGIN_TEST_VALUES.validEmail);
  });
});
