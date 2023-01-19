import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const TEST_ID_EMAIL = 'email-input';
const TEST_ID_PASSWORD = 'password-input';

const TEST_VALUES = { invalidEmail: 'email_invalido',
  invalidPassword: 12,
  validEmail: 'test@test.com',
  validPassword: 'qualquer senha' };

function logIn() {
  const captureEmailInput = screen.getByTestId(TEST_ID_EMAIL);
  const capturePasswordInput = screen.getByTestId(TEST_ID_PASSWORD);
  const captureLoginButton = screen.getByRole('button', { name: /entrar/i });

  act(() => {
    userEvent.type(captureEmailInput, TEST_VALUES.validEmail);
    userEvent.type(capturePasswordInput, TEST_VALUES.validPassword);
    userEvent.click(captureLoginButton);
  });
}

describe('Sequência de testes relacionada à renderização da página `App.jsx`', () => {
  test('Verifica se a página é renderizada com a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Verifica se a `store` é renderizada ao iniciar a aplicação', () => {
    const expectedStore = {
      user: { email: '' },
      wallet: { currencies: [],
        nameCurrencies: {},
        expenses: [],
        editor: false,
        idToEdit: 0 },
    };

    const { store } = renderWithRouterAndRedux(<App />);

    expect(store.getState()).toEqual(expectedStore);
  });

  test('Verifica se os componentes da página html são renderizados', () => {
    renderWithRouterAndRedux(<App />);

    const urlImg = 'https://pngimg.com/uploads/free/free_PNG90775.png';

    const captureFooter = screen.getByTestId('footer');
    const captureEmailInput = screen.getByTestId(TEST_ID_EMAIL);
    const capturePasswordInput = screen.getByTestId(TEST_ID_PASSWORD);
    const captureImg = screen.getByAltText(/logomarca/i);
    const captureLoginButton = screen.getByRole('button', { name: /entrar/i });

    expect(captureFooter).toBeInTheDocument();
    expect(captureEmailInput).toBeInTheDocument();
    expect(capturePasswordInput).toBeInTheDocument();
    expect(captureImg).toBeInTheDocument();
    expect(captureLoginButton).toBeInTheDocument();
    expect(captureImg).toHaveAttribute('src', urlImg);
    expect(captureLoginButton).toBeDisabled();
  });

  test('Verifica se os campos de `email` e `password` podem ser preenchidos', () => {
    renderWithRouterAndRedux(<App />);

    const captureEmailInput = screen.getByTestId(TEST_ID_EMAIL);
    const capturePasswordInput = screen.getByTestId(TEST_ID_PASSWORD);

    act(() => {
      userEvent.type(captureEmailInput, TEST_VALUES.validEmail);
      userEvent.type(capturePasswordInput, TEST_VALUES.validPassword);
    });

    expect(captureEmailInput).toHaveValue(TEST_VALUES.validEmail);
    expect(capturePasswordInput).toHaveValue(TEST_VALUES.validPassword);
  });

  test('Verifica so o botão é habilitado apenas quando valores válidos são inseridos nos campos de input', () => {
    renderWithRouterAndRedux(<App />);

    const captureEmailInput = screen.getByTestId(TEST_ID_EMAIL);
    const capturePasswordInput = screen.getByTestId(TEST_ID_PASSWORD);
    const captureLoginButton = screen.getByRole('button', { name: /entrar/i });

    expect(captureLoginButton).toBeDisabled();

    act(() => {
      userEvent.type(captureEmailInput, TEST_VALUES.validEmail);
      userEvent.type(capturePasswordInput, TEST_VALUES.validPassword);
    });

    expect(captureLoginButton).toBeEnabled();

    act(() => {
      userEvent.clear(captureEmailInput);
      userEvent.clear(capturePasswordInput);
      userEvent.type(captureEmailInput, TEST_VALUES.invalidEmail);
      userEvent.type(capturePasswordInput, TEST_VALUES.invalidPassword);
    });

    expect(captureLoginButton).toBeDisabled();
  });

  test('Verifica se ao clicar no botão `Entrar` a aplicação redireciona o usuário para a página `/carteira`', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    logIn();

    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(TEST_VALUES.validEmail);
  });
});
