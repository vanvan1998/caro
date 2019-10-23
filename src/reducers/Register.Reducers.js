import * as types from '../constants/constants';

const initialState = {
  email: '',
  password: '',
  isRegister: false,
  name: ''
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.register: {
      console.log(action.data.email);
      console.log(action.data.password);
      console.log(action.data.res);
      const st = { ...state };
      st.email = action.data.email;
      st.password = action.data.password;
      console.log(st);
      try {
        st.name = action.data.res.data.name;
        st.isRegister = true;
      } catch (err) {
        st.isRegister = false;
      }
      return st;
    }
    default:
      return state;
  }
};

export default RegisterReducer;
