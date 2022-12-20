import { LOGIN } from '../actions/actionsTypes';

const INITIAL_STATE = { email: '' };

const userReducer = (state = INITIAL_STATE, { type, payload = '' }) => {
  switch (type) {
  case LOGIN: return { ...state, email: payload };
  default: return state;
  }
};

export default userReducer;
