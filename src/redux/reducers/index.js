import { combineReducers } from 'redux';
import userReducer from './user';
import walletReducer from './wallet';

const centralReducer = combineReducers({ user: userReducer, wallet: walletReducer });

export default centralReducer;

// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
