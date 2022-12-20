import { LOGIN, ADD_CURRENCIES } from './actionsTypes';

export const login = (email) => ({ type: LOGIN, payload: email });

export const addCurrencies = (currencies) => (
  { type: ADD_CURRENCIES, payload: currencies });
