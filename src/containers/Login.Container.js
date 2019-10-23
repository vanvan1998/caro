import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Login from '../components/login';

const mapStateToProps = state => {
  const LoginState = state.LoginReducer;
  return {
    email: LoginState.email,
    password: LoginState.password,
    isLogin: LoginState.isLogin,
    token: LoginState.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Login: (email, password) => {
      dispatch(actions.loginRequest(email, password));
    }
  };
};
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
