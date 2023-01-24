import { screen, waitFor } from '@testing-library/react';

import { renderWithRouterAndRedux } from './helpers/renderWith';

import App from '../App';

describe('Sequência de testes relacionadas à página `Not Found`', () => {
  test('Verifica se ao inserir uma URL não existente a aplicação redireciona o usuário para a página `Not Found`', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/xablau');

    expect(history.location.pathname).toBe('/xablau');

    await waitFor(() => {
      const captureNotFound = screen.getByText(/not found page/i);

      expect(captureNotFound).toBeInTheDocument();
    });
  });
});
