import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { captureWalletElements, captureWalletExpensesElements } from './helpers/captureElements';
import expenseConstructor from './helpers/expenseConstructor';
import { fillInputs, fillCurrency } from './Wallet.test';

import fetchMock from '../mock/fetchMock';
import { INITIAL_STATE, URL } from '../mock/values';
import { currenciesFullNames } from '../mock/mockGlobalState';

import Wallet from '../pages/Wallet';
import { calculatorFunction, conversor } from '../services/Calculator';

async function addExpense(position) {
  const inputs = captureWalletElements();
  fillInputs(position, inputs);
  await fillCurrency(position, inputs);
  act(() => userEvent.click(inputs.ButtonAdd));
}

async function checkEmptyInputs() {
  const inputs = captureWalletElements();
  await waitFor(() => {
    expect(inputs.DescriptionInput).toHaveValue('');
    expect(inputs.PaymentInput).toHaveValue('Dinheiro');
    expect(inputs.TagInput).toHaveValue('Alimentação');
    expect(inputs.CurrencyInput).toHaveValue('USD');
  }, { timeout: 3000 });
}

function returnCaptureWalletExpensesElements(expense) {
  const { description, tag, method, value, currency, exchangeRates } = expense;

  return captureWalletExpensesElements(
    { expenseDescription: description,
      expenseTag: tag,
      expenseMethod: method,
      expenseValue: Number(value).toFixed(2),
      expenseCurrencyName: currenciesFullNames[currency],
      expenseCurrencyRate: Number(exchangeRates[currency].ask).toFixed(2),
      expenseCurrencyConvert: conversor(value, exchangeRates[currency].ask)
        .toFixed(2) },
  );
}

describe('Sequência de testes relacionadas à usabilidade das funções da página Wallet', () => {
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
    await addExpense('first');

    await waitFor(() => {
      const storeSaved = store.getState().wallet.expenses;
      expect(storeSaved).toHaveLength(1);
      expect(storeSaved).toEqual([expenseConstructor('first', 0)]);
    }, { timeout: 3000 });
  });

  test('Verifica se é possível adicionar mais de uma despesa no estado global', async () => {
    const expenses = [expenseConstructor('second', 0), expenseConstructor('third', 1)];

    const { store } = renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await addExpense('second');

    await checkEmptyInputs();

    await addExpense('third');

    await checkEmptyInputs();

    await waitFor(() => {
      const storeSaved = store.getState().wallet.expenses;
      expect(storeSaved).toHaveLength(2);
      expect(storeSaved).toEqual(expenses);
    }, { timeout: 3000 });
  });

  test('Verifica se é renderizada a nova despesa na tela e atualizado o valor total', async () => {
    const expense = expenseConstructor('fourth', 0);
    const { description, tag, method, value, currency, exchangeRates } = expense;

    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);

    await addExpense('fourth');

    await waitFor(() => {
      const inputs = returnCaptureWalletExpensesElements(expense);

      expect(inputs.totalExpenses).toHaveTextContent(calculatorFunction([expenseConstructor('fourth', 0)]));
      expect(inputs.tag).toHaveLength(2);
      expect(inputs.value).toHaveLength(1);
      expect(inputs.method).toHaveLength(2);
      expect(inputs.description).toHaveLength(1);
      expect(inputs.currencyRate).toHaveLength(1);
      expect(inputs.currencyName).toHaveLength(1);
      expect(inputs.tag[1]).toHaveTextContent(tag);
      expect(inputs.value[0]).toHaveTextContent(value);
      expect(inputs.method[1]).toHaveTextContent(method);
      expect(inputs.description[0]).toHaveTextContent(description);
      expect(inputs.currencyName[0]).toHaveTextContent(currenciesFullNames[currency]);
      expect(inputs.currencyRate[0])
        .toHaveTextContent(Number(exchangeRates[currency].ask)
          .toFixed(2));
      expect(inputs.currencyConvert).toHaveLength(2);
      expect(inputs.currencyConvert[1])
        .toHaveTextContent(conversor(value, exchangeRates[currency].ask)
          .toFixed(2));
    }, { timeout: 3000 });
  });

  test('Verifica se são renderizadas mais despesas após adiciona-lás', async () => {
    renderWithRouterAndRedux(<Wallet />, INITIAL_STATE);
  });
});
