export const URL = 'https://economia.awesomeapi.com.br/json/all';

export const VALUES_TO_TEST = {
  first: {
    CashValue: 50,
    DescriptionValue: 'Paçoca doce',
    CurrencyValue: 'CHF',
    PaymentValue: 'Cartão de débito',
    TagValue: 'Alimentação',
  },
  second: {
    CashValue: 100,
    DescriptionValue: 'Xbox Game',
    CurrencyValue: 'USD',
    PaymentValue: 'Cartão de crédito',
    TagValue: 'Lazer',
  },
  third: {
    CashValue: 20,
    DescriptionValue: 'Teclado',
    CurrencyValue: 'DOGE',
    PaymentValue: 'Dinheiro',
    TagValue: 'Saúde',
  },
  fourth: {
    CashValue: 1000,
    DescriptionValue: 'Headphone',
    CurrencyValue: 'CAD',
    PaymentValue: 'Dinheiro',
    TagValue: 'Transporte',
  },
};

export const INITIAL_STATE = {
  initialEntries: ['/carteira'],
  initialState: { user: { email: 'email@email.com' } },
};

export const INPUTS_IDS_NAMES = {
  valueInput: 'value-input',
  descriptionInput: 'description-input',
  paymentInput: 'method-input',
  tagInput: 'tag-input',
  currencyInput: 'currency-input',
  email: 'email-field',
  currency: 'header-currency-field',
  cash: 'total-field',
  table: 'table',
  th: 'columnheader',
};
