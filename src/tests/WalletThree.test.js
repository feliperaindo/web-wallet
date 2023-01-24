import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { renderWithRouterAndRedux } from './helpers/renderWith';
import { captureExpensesElements, captureWalletElements } from './helpers/captureElements';
import { editExpenseToTest, EXPENSES, fullGlobalStorage } from './helpers/PagesInteractions';

import fetchMock from '../mock/fetchMock';
import { NEW_EXPENSE, VALUES_TO_TEST } from '../mock/values';
import { currenciesFullNames, WALLET_GLOBAL_STORE } from '../mock/mockGlobalState';

import { calculatorFunction, conversor } from '../services/Calculator';

import Wallet from '../pages/Wallet';

describe('Sequência de testes relacionadas à exclusão de despesas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se ao clicar no botão deletar a despesa é retirada do estado global da aplicação', () => {
    const globalStateWithoutElement = JSON.parse(JSON.stringify(WALLET_GLOBAL_STORE));
    globalStateWithoutElement.wallet.expenses = JSON.parse(
      JSON.stringify(EXPENSES),
    ).slice(0, EXPENSES.length - 1);

    const { store } = renderWithRouterAndRedux(<Wallet />, fullGlobalStorage());

    const inputs = captureExpensesElements(EXPENSES[3]);

    act(() => {
      userEvent.click(inputs.buttonDelete[3]);
    });

    const globalState = store.getState();

    expect(globalState).toEqual(globalStateWithoutElement);
  });

  test('Verifica se ao clicar no botão deletar o elemento sai da tela e os gastos totais são recalculados', () => {
    renderWithRouterAndRedux(<Wallet />, fullGlobalStorage());

    const inputs = captureExpensesElements(EXPENSES[2]);

    act(() => {
      userEvent.click(inputs.buttonDelete[2]);
    });

    expect(inputs.description[0]).not.toBeInTheDocument();
    expect(inputs.tag[1]).not.toBeInTheDocument();
    expect(inputs.value[0]).not.toBeInTheDocument();
    expect(inputs.currencyName[0]).not.toBeInTheDocument();
    expect(inputs.currencyRate[0]).not.toBeInTheDocument();
    expect(inputs.currencyConvert[0]).not.toBeInTheDocument();
    expect(inputs.method[1]).not.toBeInTheDocument();
    expect(inputs.buttonDelete[2]).not.toBeInTheDocument();
    expect(inputs.buttonEdit[2]).not.toBeInTheDocument();

    expect(inputs.totalExpenses)
      .toHaveTextContent(calculatorFunction([EXPENSES[0], EXPENSES[1], EXPENSES[3]]));
  });
});

describe('Sequência de testes acerca da funcionalidade de edição da aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(fetchMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Verifica se ao clicar no botão `editar` o estado global é alterado', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />, fullGlobalStorage());

    const inputs = captureExpensesElements(EXPENSES[1]);

    act(() => {
      userEvent.click(inputs.buttonEdit[1]);
    });

    const globalState = store.getState();

    expect(globalState.wallet.editor).toBeTruthy();
    expect(globalState.wallet.idToEdit).toBe(EXPENSES[1].id);
  });

  test('Verifica se após a edição de uma despesa ela é atualizada no estado global', () => {
    const globalStateWithEditElement = JSON.parse(JSON.stringify(WALLET_GLOBAL_STORE));

    const newArrayExpenses = [EXPENSES[0], EXPENSES[1], NEW_EXPENSE, EXPENSES[3]];

    globalStateWithEditElement.wallet.expenses = newArrayExpenses;
    globalStateWithEditElement.wallet.idToEdit = 2;

    const { store } = renderWithRouterAndRedux(<Wallet />, fullGlobalStorage());

    editExpenseToTest(2);

    const getStore = store.getState();

    expect(getStore).toEqual(globalStateWithEditElement);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('Verifica se ao clicar no botão `editar` a aplicação habilita o modo de edição na página', () => {
    const { first: { CashValue, DescriptionValue,
      PaymentValue, TagValue } } = VALUES_TO_TEST;

    renderWithRouterAndRedux(<Wallet />, fullGlobalStorage());

    const expensesInputs = captureExpensesElements(EXPENSES[0]);

    act(() => {
      userEvent.click(expensesInputs.buttonEdit[0]);
    });

    const walletInputs = captureWalletElements({ edit: true });

    expect(walletInputs.ValueInput).toHaveValue(CashValue);
    expect(walletInputs.DescriptionInput).toHaveValue(DescriptionValue);
    expect(walletInputs.PaymentInput).toHaveValue(PaymentValue);
    expect(walletInputs.TagInput).toHaveValue(TagValue);
    expect(walletInputs.ButtonAdd).toHaveTextContent(/Editar despesa/);
  });

  test('Verifica se ao terminar a edição da despesa a página é atualizada com as novas informações', () => {
    const { description, tag, method, value, currency, exchangeRates } = NEW_EXPENSE;

    renderWithRouterAndRedux(<Wallet />, fullGlobalStorage());

    editExpenseToTest(2);

    const expensesInputs = captureExpensesElements(NEW_EXPENSE);

    expect(expensesInputs.tag[1]).toHaveTextContent(tag);
    expect(expensesInputs.value[0]).toHaveTextContent(value);
    expect(expensesInputs.method[1]).toHaveTextContent(method);
    expect(expensesInputs.description[0]).toHaveTextContent(description);
    expect(expensesInputs.currencyRate[0])
      .toHaveTextContent(Number(exchangeRates[currency].ask).toFixed(2));
    expect(expensesInputs.currencyName[0])
      .toHaveTextContent(currenciesFullNames[currency]);
    expect(expensesInputs.currencyConvert[0])
      .toHaveTextContent(conversor(value, exchangeRates[currency].ask).toFixed(2));

    expect(expensesInputs.buttonDelete).toHaveLength(4);
    expect(expensesInputs.buttonEdit).toHaveLength(4);

    expect(expensesInputs.totalExpenses)
      .toHaveTextContent(calculatorFunction([
        EXPENSES[0], EXPENSES[1], NEW_EXPENSE, EXPENSES[3]]));
  });
});
