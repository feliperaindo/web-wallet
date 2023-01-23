import { screen, act, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VALUES_TO_TEST } from '../../mock/values';
import { currenciesFullNames, INITIAL_STATE, WALLET_GLOBAL_STORE } from '../../mock/mockGlobalState';

import { captureWalletElements } from './captureElements';

import expenseConstructor from './expenseConstructor';

export const POSITIONS = ['first', 'second', 'third', 'fourth'];

export const EXPENSES = POSITIONS
  .map((position, index) => expenseConstructor(position, index));

export function fillInputs(position, inputs) {
  const { [position]: { CashValue,
    DescriptionValue, PaymentValue, TagValue } } = VALUES_TO_TEST;

  act(() => {
    fireEvent.change(inputs.ValueInput, { target: { value: CashValue } });
    userEvent.type(inputs.DescriptionInput, DescriptionValue);
    userEvent.selectOptions(inputs.PaymentInput, PaymentValue);
    userEvent.selectOptions(inputs.TagInput, TagValue);
  });
}

export async function fillCurrency(position, inputs) {
  const { [position]: { CurrencyValue } } = VALUES_TO_TEST;
  await waitFor(() => {
    userEvent.selectOptions(
      inputs.CurrencyInput,
      screen.getByRole('option', {
        name: `${CurrencyValue} - ${currenciesFullNames[CurrencyValue]}`,
      }),
    );
  });
}

export async function addExpense(position) {
  const inputs = captureWalletElements();
  fillInputs(position, inputs);
  await fillCurrency(position, inputs);
  act(() => userEvent.click(inputs.ButtonAdd));
}

export async function checkEmptyInputs() {
  const inputs = captureWalletElements();
  await waitFor(() => {
    expect(inputs.DescriptionInput).toHaveValue('');
    expect(inputs.PaymentInput).toHaveValue('Dinheiro');
    expect(inputs.TagInput).toHaveValue('Alimentação');
    expect(inputs.CurrencyInput).toHaveValue('USD');
  }, { timeout: 3000 });
}

export function fullGlobalStorage() {
  const state = { ...INITIAL_STATE, initialState: { ...WALLET_GLOBAL_STORE } };
  state.initialState.wallet.expenses = EXPENSES;
  return state;
}
