import { waitFor } from '@testing-library/react';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { returnCaptureWalletExpensesElements } from './helpers/captureElements';
import { addExpense, checkEmptyInputs, EXPENSES, POSITIONS } from './helpers/PagesInteractions';

import fetchMock from '../mock/fetchMock';
import { INITIAL_STATE, URL } from '../mock/values';
import { currenciesFullNames } from '../mock/mockGlobalState';

import { calculatorFunction, conversor } from '../services/Calculator';

import Wallet from '../pages/Wallet';

describe('Sequência de testes relacionadas à adição de novas despesas na página Wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se é feita uma nova requisição no momento que uma despesa é adicionada', async () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
    await addExpense('second');

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  test('Verifica se o estado é atualizado após adicionar uma despesa', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
    await addExpense(POSITIONS[0]);

    await waitFor(() => {
      const storeSaved = store.getState().wallet.expenses;
      expect(storeSaved).toHaveLength(1);
      expect(storeSaved[0]).toEqual(EXPENSES[0]);
    }, { timeout: 3000 });
  });

  test('Verifica se é possível adicionar mais de uma despesa no estado global', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await addExpense(POSITIONS[0]);

    await checkEmptyInputs();

    await addExpense(POSITIONS[1]);

    await checkEmptyInputs();

    await waitFor(() => {
      const storeSaved = store.getState().wallet.expenses;
      expect(storeSaved).toHaveLength(2);
      expect(storeSaved).toEqual([EXPENSES[0], EXPENSES[1]]);
    }, { timeout: 3000 });
  });

  test('Verifica se é renderizada a nova despesa na tela e atualizado o valor total', async () => {
    const { description, tag, method, value, currency, exchangeRates } = EXPENSES[3];

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await addExpense(POSITIONS[3]);

    await waitFor(() => {
      const inputs = returnCaptureWalletExpensesElements(EXPENSES[3]);

      expect(inputs.tag).toHaveLength(2);
      expect(inputs.value).toHaveLength(1);
      expect(inputs.method).toHaveLength(2);
      expect(inputs.description).toHaveLength(1);
      expect(inputs.currencyRate).toHaveLength(1);
      expect(inputs.currencyName).toHaveLength(1);
      expect(inputs.currencyConvert).toHaveLength(2);

      expect(inputs.tag[1]).toHaveTextContent(tag);
      expect(inputs.value[0]).toHaveTextContent(value);
      expect(inputs.method[1]).toHaveTextContent(method);
      expect(inputs.description[0]).toHaveTextContent(description);
      expect(inputs.currencyRate[0])
        .toHaveTextContent(Number(exchangeRates[currency].ask).toFixed(2));
      expect(inputs.currencyName[0]).toHaveTextContent(currenciesFullNames[currency]);
      expect(inputs.currencyConvert[1])
        .toHaveTextContent(conversor(value, exchangeRates[currency].ask).toFixed(2));

      expect(inputs.totalExpenses).toHaveTextContent(calculatorFunction([EXPENSES[3]]));

      expect(inputs.buttonDelete).toHaveLength(1);
      expect(inputs.buttonEdit).toHaveLength(1);
    }, { timeout: 3000 });
  });

  test('Verifica se são renderizadas mais despesas após adiciona-lás', async () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await addExpense(POSITIONS[1]);
    await checkEmptyInputs();
    await addExpense(POSITIONS[3]);
    await checkEmptyInputs();

    await waitFor(() => {
      const { description, tag, method, value, currency, exchangeRates } = EXPENSES[3];

      const inputsFirstExpense = returnCaptureWalletExpensesElements(EXPENSES[3]);

      expect(inputsFirstExpense.tag).toHaveLength(2);
      expect(inputsFirstExpense.value).toHaveLength(1);
      expect(inputsFirstExpense.method).toHaveLength(2);
      expect(inputsFirstExpense.description).toHaveLength(1);
      expect(inputsFirstExpense.currencyRate).toHaveLength(1);
      expect(inputsFirstExpense.currencyName).toHaveLength(1);
      expect(inputsFirstExpense.currencyConvert).toHaveLength(1);

      expect(inputsFirstExpense.tag[1]).toHaveTextContent(tag);
      expect(inputsFirstExpense.value[0]).toHaveTextContent(value);
      expect(inputsFirstExpense.method[1]).toHaveTextContent(method);
      expect(inputsFirstExpense.description[0]).toHaveTextContent(description);
      expect(inputsFirstExpense.currencyRate[0])
        .toHaveTextContent(Number(exchangeRates[currency].ask).toFixed(2));
      expect(inputsFirstExpense.currencyName[0])
        .toHaveTextContent(currenciesFullNames[currency]);
      expect(inputsFirstExpense.currencyConvert[0])
        .toHaveTextContent(conversor(value, exchangeRates[currency].ask).toFixed(2));
    }, { timeout: 3000 });

    await waitFor(() => {
      const { description, tag, method, value, currency, exchangeRates } = EXPENSES[1];

      const inputsSecondExpense = returnCaptureWalletExpensesElements(EXPENSES[1]);

      expect(inputsSecondExpense.tag).toHaveLength(2);
      expect(inputsSecondExpense.value).toHaveLength(1);
      expect(inputsSecondExpense.method).toHaveLength(2);
      expect(inputsSecondExpense.description).toHaveLength(1);
      expect(inputsSecondExpense.currencyRate).toHaveLength(1);
      expect(inputsSecondExpense.currencyName).toHaveLength(1);
      expect(inputsSecondExpense.currencyConvert).toHaveLength(1);

      expect(inputsSecondExpense.tag[1]).toHaveTextContent(tag);
      expect(inputsSecondExpense.value[0]).toHaveTextContent(value);
      expect(inputsSecondExpense.method[1]).toHaveTextContent(method);
      expect(inputsSecondExpense.description[0]).toHaveTextContent(description);
      expect(inputsSecondExpense.currencyRate[0])
        .toHaveTextContent(Number(exchangeRates[currency].ask).toFixed(2));
      expect(inputsSecondExpense.currencyName[0])
        .toHaveTextContent(currenciesFullNames[currency]);
      expect(inputsSecondExpense.currencyConvert[0])
        .toHaveTextContent(conversor(value, exchangeRates[currency].ask).toFixed(2));

      expect(inputsSecondExpense.totalExpenses)
        .toHaveTextContent(calculatorFunction([EXPENSES[1], EXPENSES[3]]));

      expect(inputsSecondExpense.buttonDelete).toHaveLength(2);
      expect(inputsSecondExpense.buttonEdit).toHaveLength(2);
    });
  });
});
