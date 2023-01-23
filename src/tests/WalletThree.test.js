import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { captureWalletElements, captureWalletExpensesElements } from './helpers/captureElements';

import fetchMock from '../mock/fetchMock';
import { INITIAL_STATE, URL } from '../mock/values';
import { currenciesFullNames } from '../mock/mockGlobalState';

import Wallet from '../pages/Wallet';

describe('Sequência de testes relacionadas à exclusão de despesas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se ao clicar no botão deletar o elemento sai da tela', () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    
  });
});
