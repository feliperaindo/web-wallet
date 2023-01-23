import { screen } from '@testing-library/react';

import { currenciesFullNames } from '../../mock/mockGlobalState';
import { WALLET_INPUTS_IDS_NAMES, LOGIN_IDS_NAMES } from '../../mock/values';

import { conversor } from '../../services/Calculator';

export function captureWalletElements() {
  return { ValueInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.valueInput),
    DescriptionInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.descriptionInput),
    CurrencyInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.currencyInput),
    PaymentInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.paymentInput),
    TagInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.tagInput),
    Email: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.email),
    CurrencyName: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.currency),
    CashValue: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.cash),
    Table: screen.getByRole(WALLET_INPUTS_IDS_NAMES.table),
    THs: screen.getAllByRole(WALLET_INPUTS_IDS_NAMES.th),
    ButtonAdd: screen.getByRole('button', { name: WALLET_INPUTS_IDS_NAMES.buttonAdd }),
  };
}

export function captureWalletExpensesElements({
  expenseDescription,
  expenseTag,
  expenseMethod,
  expenseValue,
  expenseCurrencyName,
  expenseCurrencyRate,
  expenseCurrencyConvert }) {
  return {
    description: screen.getAllByText(expenseDescription),
    tag: screen.getAllByText(expenseTag),
    method: screen.getAllByText(expenseMethod),
    value: screen.getAllByText(expenseValue),
    currencyName: screen.getAllByText(expenseCurrencyName),
    currencyRate: screen.getAllByText(expenseCurrencyRate),
    currencyConvert: screen.getAllByText(expenseCurrencyConvert),
    real: screen.getAllByText(/[$Real^]/),
    buttonDelete: screen.getAllByRole('button', { name: /deletar/i }),
    buttonEdit: screen.getAllByRole('button', { name: /editar/i }),
    totalExpenses: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.cash),
  };
}

export function captureLoginElements() {
  return {
    EmailInput: screen.getByTestId(LOGIN_IDS_NAMES.emailInput),
    PasswordInput: screen.getByTestId(LOGIN_IDS_NAMES.passwordInput),
    LoginButton: screen.getByRole('button', { name: LOGIN_IDS_NAMES.button }),
    Footer: screen.getByTestId(LOGIN_IDS_NAMES.footer),
    Img: screen.getByAltText(LOGIN_IDS_NAMES.altText),
  };
}

export function returnCaptureWalletExpensesElements(expense) {
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
