import mockData from './mockData';
import { removeUSDT, getFullNameCurrencies } from '../services/APIServices';

const EMAIL = 'email@email.com';

export const currenciesArray = Object.keys(removeUSDT(mockData));

export const currenciesFullNames = getFullNameCurrencies(mockData, currenciesArray);

export const WALLET_GLOBAL_STORE = {
  user: { email: EMAIL },
  wallet: { currencies: currenciesArray,
    nameCurrencies: currenciesFullNames,
    expenses: [],
    editor: false,
    idToEdit: 0 },
};

export const EMAIL_GLOBAL_STORE = {
  user: { email: EMAIL },
  wallet: { currencies: [],
    nameCurrencies: {},
    expenses: [],
    editor: false,
    idToEdit: 0 },
};

export const EMPTY_GLOBAL_STORE = {
  user: { email: '' },
  wallet: { currencies: [],
    nameCurrencies: {},
    expenses: [],
    editor: false,
    idToEdit: 0 },
};

export const INITIAL_STATE = {
  initialEntries: ['/carteira'],
  initialState: { user: { email: EMAIL } },
};
