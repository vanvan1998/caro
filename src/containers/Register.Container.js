import { connect } from 'react-redux';
import * as actions from '../actions/Actions';
import Register from '../components/Register';

const mapStateToProps = state => {
  const RegisterState = state.RegisterReducer;
  return {
    email: RegisterState.email,
    password: RegisterState.password,
    isRegister: RegisterState.isRegister,
    name: RegisterState.name,
    CheckLoadRegister: RegisterState.CheckLoadRegister
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Register: (name, email, password) => {
      dispatch(actions.registerRequest(name, email, password));
    }
  };
};
const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
