import { LOGIN, ADD_CURRENCIES, ADD_EXPENSE,
  ADD_NAME_CURRENCIES, REMOVE_EXPENSE } from './actionsTypes';

export const login = (email) => ({ type: LOGIN, payload: email });

export const addCurrencies = (currencies) => (
  { type: ADD_CURRENCIES, payload: currencies });

export const addFullNameCurrencies = (currencies) => (
  { type: ADD_NAME_CURRENCIES, payload: currencies });

export const addExpense = (newExpense) => ({ type: ADD_EXPENSE, payload: newExpense });

export const removeExpense = (expenses) => ({ type: REMOVE_EXPENSE, payload: expenses });
