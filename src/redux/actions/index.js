import { LOGIN, ADD_CURRENCIES, ADD_EXPENSE,
  ADD_NAME_CURRENCIES, REMOVE_EXPENSE,
  EDIT_EXPENSE, ENABLE_EDITOR, DISABLE_EDITOR, SAVE_ID_EDIT } from './actionsTypes';

export const login = (email) => ({ type: LOGIN, payload: email });

export const addCurrencies = (currencies) => (
  { type: ADD_CURRENCIES, payload: currencies });

export const addFullNameCurrencies = (currencies) => ({
  type: ADD_NAME_CURRENCIES, payload: currencies });

export const addExpense = (newExpense) => ({ type: ADD_EXPENSE, payload: newExpense });

export const removeExpense = (expense) => (
  { type: REMOVE_EXPENSE, payload: expense });

export const editExpense = (expense) => ({ type: EDIT_EXPENSE, payload: expense });

export const enableEditor = () => ({ type: ENABLE_EDITOR });

export const disableEditor = () => ({ type: DISABLE_EDITOR });

export const saveIdToEdit = (id) => ({ type: SAVE_ID_EDIT, payload: id });
