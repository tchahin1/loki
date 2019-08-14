import * as types from '../../actions/types';

const INITIAL_STATE = {
  username: '',
  password: '',
  error: '',
  isLoading: false,
  confirmPass: '',
  email: '',
  success: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SIGNUP_INITIALIZATION:
      return INITIAL_STATE;
    case types.SIGNUP_USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case types.SIGNUP_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case types.SIGNUP_CONF_PASS_CHANGED:
      return { ...state, confirmPass: action.payload };
    case types.SIGNUP_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, success: true };
    case types.REGISTER_USER_FAIL:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case types.REGISTER_USER:
      return {
        ...state,
        isLoading: true,
        error: '',
        success: false,
      };
    default:
      return state;
  }
};
