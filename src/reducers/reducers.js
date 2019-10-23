// import { combineReducers } from 'redux';
import { combineReducers } from 'redux';
import GameReducer from './Game.Reducers';
import LoginReducer from './Login.Reducer';

const myReducer = combineReducers({
  GameReducer,
  LoginReducer
});
export default myReducer;
