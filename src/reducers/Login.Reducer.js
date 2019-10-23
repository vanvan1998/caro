import * as types from '../constants/constants';

// const axios = require('axios');

const initialState = {
  email: '',
  password: '',
  isLogin: false,
  token: '',
  username: ''
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.login: {
      const st = { ...state };
      st.email = action.data.email;
      st.password = action.data.password;
      try {
        st.token = action.data.res.data.token;
        st.username = action.data.res.data.user.name;
        console.log(st);
        st.isLogin = true;
      } catch (err) {
        st.token = 'err';
      }
      return st;
    }
    case types.logOut: {
      const st = { ...state };
      st.username = '';
      st.token = '';
      st.isLogin = false;
      st.email = '';
      st.password = '';
      return st;
    }
    default:
      return state;
  }
};

export default LoginReducer;
