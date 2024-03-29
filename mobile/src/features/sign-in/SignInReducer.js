import * as types from '../../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: '',
  error: '',
  isLoading: false,
  id: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case types.PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        id: state.email,
      };
    case types.LOGIN_USER_FAIL:
      return {
        ...state, error: action.payload, isLoading: false, password: '',
      };
    case types.LOGIN_USER:
      return { ...state, isLoading: true, error: '' };
    case types.SIGN_OUT_USER:
      return INITIAL_STATE;
    case types.INITIALIZE_LOGIN:
      return INITIAL_STATE;
    default:
      return state;
  }
};
