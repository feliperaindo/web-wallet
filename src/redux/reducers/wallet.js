import {
  ADD_CURRENCIES,
  ADD_EXPENSE,
  ADD_NAME_CURRENCIES,
  REMOVE_EXPENSE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  nameCurrencies: {},
  expenses: [],
  editor: false,
  idToEdit: 0 };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES: return { ...state, currencies: [...action.payload] };
  case ADD_EXPENSE: return { ...state, expenses: [...state.expenses, action.payload] };
  case ADD_NAME_CURRENCIES: return { ...state, nameCurrencies: { ...action.payload } };
  case REMOVE_EXPENSE: return { ...state, expenses: action.payload };
  default: return state;
  }
};

export default walletReducer;
