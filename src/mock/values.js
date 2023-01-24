import mockData from './mockData';

export const URL = 'https://economia.awesomeapi.com.br/json/all';

export const URL_IMG = 'https://pngimg.com/uploads/free/free_PNG90775.png';

export const VALUES_TO_TEST = {
  first: {
    CashValue: 50.00,
    DescriptionValue: 'Paçoca doce',
    CurrencyValue: 'CHF',
    PaymentValue: 'Cartão de débito',
    TagValue: 'Alimentação',
  },
  second: {
    CashValue: 100.00,
    DescriptionValue: 'Xbox Game',
    CurrencyValue: 'USD',
    PaymentValue: 'Cartão de crédito',
    TagValue: 'Lazer',
  },
  third: {
    CashValue: 20.00,
    DescriptionValue: 'Teclado',
    CurrencyValue: 'DOGE',
    PaymentValue: 'Dinheiro',
    TagValue: 'Saúde',
  },
  fourth: {
    CashValue: 1000.00,
    DescriptionValue: 'Headphone',
    CurrencyValue: 'CAD',
    PaymentValue: 'Dinheiro',
    TagValue: 'Transporte',
  },
};

export const NEW_EXPENSE = {
  value: '10',
  description: 'Mouse',
  currency: 'DOGE',
  method: 'Cartão de crédito',
  tag: 'Trabalho',
  id: 2,
  exchangeRates: mockData,
};

export const WALLET_INPUTS_IDS_NAMES = {
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
  buttonAdd: /adicionar despesa/i,
  buttonEdit: /Editar despesa/i,
};

export const LOGIN_IDS_NAMES = {
  emailInput: 'email-input',
  passwordInput: 'password-input',
  footer: 'footer',
  altText: /logomarca/i,
  button: /entrar/i,
};

export const LOGIN_TEST_VALUES = {
  invalidEmail: 'email_invalido',
  invalidPassword: 12,
  validEmail: 'test@test.com',
  validPassword: 'qualquer senha',
};
