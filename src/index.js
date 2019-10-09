/* eslint-disable import/imports-first */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './index.css';
import { Provider } from 'react-redux';
import myReducer from './reducers/reducers';
import Game from './components/Game';
import * as serviceWorker from './serviceWorker';

const store = createStore(myReducer);
ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
