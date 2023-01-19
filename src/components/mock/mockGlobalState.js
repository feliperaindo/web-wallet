import mockData from './mockData';
import { removeUSDT, getFullNameCurrencies } from '../../services/APIServices';

export const currenciesArray = Object.keys(removeUSDT(mockData));

export const currenciesFullNames = getFullNameCurrencies(mockData, currenciesArray);

export const expectedFullGlobalStore = {
  user: { email: 'email@email.com' },
  wallet: { currencies: currenciesArray,
    nameCurrencies: currenciesFullNames,
    expenses: [],
    editor: false,
    idToEdit: 0 },
};

export const expectedWalletEmptyGlobalStore = {
  user: { email: 'email@email.com' },
  wallet: { currencies: [],
    nameCurrencies: {},
    expenses: [],
    editor: false,
    idToEdit: 0 },
};

export const expectedLoginEmptyGlobalStore = {
  user: { email: '' },
  wallet: { currencies: [],
    nameCurrencies: {},
    expenses: [],
    editor: false,
    idToEdit: 0 },
};
