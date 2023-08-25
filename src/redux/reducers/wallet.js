import {
  ADD_CURRENCIES,
  ADD_EXPENSE,
  ADD_NAME_CURRENCIES,
  DISABLE_EDITOR,
  EDIT_EXPENSE,
  ENABLE_EDITOR,
  REMOVE_EXPENSE,
  SAVE_ID_EDIT,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  idToEdit: 0,
  editor: false,
  expenses: [],
  currencies: [],
  nameCurrencies: {},
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE: return { ...state, expenses: [...state.expenses, action.payload] };
  case EDIT_EXPENSE: return { ...state, expenses: action.payload };
  case SAVE_ID_EDIT: return { ...state, idToEdit: action.payload };
  case ENABLE_EDITOR: return { ...state, editor: true };
  case DISABLE_EDITOR: return { ...state, editor: false };
  case REMOVE_EXPENSE: return { ...state, expenses: action.payload };
  case ADD_CURRENCIES: return { ...state, currencies: [...action.payload] };
  case ADD_NAME_CURRENCIES: return { ...state, nameCurrencies: { ...action.payload } };
  default: return state;
  }
};

export default walletReducer;
