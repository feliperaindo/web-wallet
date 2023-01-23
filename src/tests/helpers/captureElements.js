import { screen } from '@testing-library/react';

import { currenciesFullNames } from '../../mock/mockGlobalState';
import { WALLET_INPUTS_IDS_NAMES, LOGIN_IDS_NAMES } from '../../mock/values';

import { conversor } from '../../services/Calculator';

export function captureWalletElements({ edit } = { edit: false }) {
  function buttonRole() {
    return (edit)
      ? screen.getByRole('button', { name: WALLET_INPUTS_IDS_NAMES.buttonEdit })
      : screen.getByRole('button', { name: WALLET_INPUTS_IDS_NAMES.buttonAdd });
  }

  return {
    ValueInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.valueInput),
    DescriptionInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.descriptionInput),
    CurrencyInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.currencyInput),
    PaymentInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.paymentInput),
    TagInput: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.tagInput),
    Email: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.email),
    CurrencyName: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.currency),
    CashValue: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.cash),
    Table: screen.getByRole(WALLET_INPUTS_IDS_NAMES.table),
    THs: screen.getAllByRole(WALLET_INPUTS_IDS_NAMES.th),
    ButtonAdd: buttonRole(),
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

export function captureExpensesElements(expense) {
  const { description, tag, method, value, currency, exchangeRates } = expense;

  return {
    tag: screen.getAllByText(tag),
    value: screen.getAllByText(Number(value).toFixed(2)),
    method: screen.getAllByText(method),
    description: screen.getAllByText(description),
    currencyRate: screen.getAllByText(Number(exchangeRates[currency].ask).toFixed(2)),
    currencyName: screen.getAllByText(currenciesFullNames[currency]),
    currencyConvert: screen.getAllByText(conversor(value, exchangeRates[currency].ask)
      .toFixed(2)),
    buttonDelete: screen.getAllByTestId(/delete-btn/),
    buttonEdit: screen.getAllByTestId(/edit-btn/),
    totalExpenses: screen.getByTestId(WALLET_INPUTS_IDS_NAMES.cash),
  };
}
