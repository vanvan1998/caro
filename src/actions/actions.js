import * as types from '../constants/constants';

const axios = require('axios');

export const checkWinner = squares => {
  return {
    type: types.checkWinner,
    data: { squares }
  };
};

export const boardClick = (i, j) => {
  return {
    type: types.boardClick,
    data: { i, j }
  };
};

export const goToMoveClick = step => {
  return {
    type: types.goToMoveClick,
    data: { step }
  };
};

export const sortClick = () => {
  return {
    type: types.sortClick
  };
};

function OnclickLogin(email, password) {
  const res = axios
    .post('https://restful1612800.herokuapp.com/users/login', {
      email,
      password
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const login = (email, password, res) => {
  return {
    type: types.login,
    data: { email, password, res }
  };
};

export const loginRequest = (email, password) => {
  return dispatch => {
    return OnclickLogin(email, password).then(res => {
      dispatch(login(email, password, res));
    });
  };
};

function OnclickRegister(name, email, password) {
  const res = axios
    .post('https://restful1612800.herokuapp.com/users/register', {
      name,
      email,
      password
    })
    .catch(error => {
      return error;
    });
  return res;
}

export const register = (name, email, password, res) => {
  return {
    type: types.register,
    data: { name, email, password, res }
  };
};

export const registerRequest = (name, email, password) => {
  return dispatch => {
    return OnclickRegister(name, email, password).then(res => {
      dispatch(register(email, password, res));
    });
  };
};

export const LogOut = () => {
  return {
    type: types.logOut
  };
};
