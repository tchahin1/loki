import * as types from '../../actions/types';

const INITIAL_STATE = {
  name: '',
  surname: '',
  password: '',
  error: '',
  isLoading: false,
  confirmPass: '',
  email: '',
  id: 0,
  status: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PROFILE_INITIALIZATION:
      return { ...state, password: '', confirmPass: '' };
    case types.PROFILE_NAME_CHANGED:
      return { ...state, name: action.payload };
    case types.PROFILE_SURNAME_CHANGED:
      return { ...state, surname: action.payload };
    case types.PROFILE_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case types.PROFILE_CONF_PASS_CHANGED:
      return { ...state, confirmPass: action.payload };
    case types.PROFILE_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case types.PROFILE_ID_CHANGED:
      return { ...state, id: action.payload };
    case types.EDIT_USER_SUCCESS:
      return { ...state, isLoading: false, status: 'OK' };
    case types.EDIT_USER_FAIL:
      return {
        ...state, ...INITIAL_STATE, isLoading: false, status: 'ERROR',
      };
    case types.RESET_PROFILE_STATUS:
      return { ...state, status: '' };
    case types.EDIT_USER:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    default:
      return state;
  }
};
