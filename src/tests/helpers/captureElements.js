import { screen } from '@testing-library/react';
import { WALLET_INPUTS_IDS_NAMES, LOGIN_IDS_NAMES } from '../../components/mock/values';

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
    ButtonAdd: screen.getByRole('button', { name: /adicionar despesa/i }),
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
