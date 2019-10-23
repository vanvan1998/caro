import * as types from '../constants/constants';

const initialState = {
  email: '',
  password: '',
  isRegister: false,
  CheckLoadRegister: false,
  name: ''
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.register: {
      const st = { ...state };
      st.email = action.data.email;
      st.password = action.data.password;
      try {
        st.name = action.data.res.data.name;
        st.isRegister = true;
      } catch (err) {
        st.CheckLoadRegister = true;
      }
      return st;
    }
    default:
      return state;
  }
};

export default RegisterReducer;
