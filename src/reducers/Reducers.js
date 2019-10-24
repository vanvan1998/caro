import { combineReducers } from 'redux';
import GameReducer from './Game.Reducers';
import LoginReducer from './Login.Reducers';
import RegisterReducer from './Register.Reducers';

const myReducer = combineReducers({
  GameReducer,
  LoginReducer,
  RegisterReducer
});
export default myReducer;
