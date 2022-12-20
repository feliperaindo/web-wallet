import { ADD_CURRENCIES } from '../actions/actionsTypes';

const INITIAL_STATE = { currencies: [], expenses: [], editor: false, idToEdit: 0 };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCIES: return { ...state, currencies: [...action.payload] };
  default: return state;
  }
};

export default walletReducer;
