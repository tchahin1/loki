import * as types from '../../actions/types';

const INITIAL_STATE = {
  name: '',
  legalName: '',
  surname: '',
  address: '',
  code: '',
  email: '',
  phone: '',
  request: '',
  status: '',
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.QAC_NAME_CHANGED:
      return { ...state, name: action.payload };
    case types.QAC_LEGAL_NAME_CHANGED:
      return { ...state, legalName: action.payload };
    case types.QAC_SURNAME_CHANGED:
      return { ...state, surname: action.payload };
    case types.QAC_ADDRESS_CHANGED:
      return { ...state, address: action.payload };
    case types.QAC_CODE_CHANGED:
      return { ...state, code: action.payload };
    case types.QAC_EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case types.QAC_PHONE_CHANGED:
      return { ...state, phone: action.payload };
    case types.QAC_REQUEST_CHANGED:
      return { ...state, request: action.payload };
    case types.SEND_QAC_SUCCESS:
      return {
        ...state, ...INITIAL_STATE, status: 'OK', error: '', loading: false,
      };
    case types.SEND_QAC:
      return {
        ...state, loading: true, error: '', status: '',
      };
    case types.SEND_QAC_FAIL:
      return {
        ...state, ...INITIAL_STATE, status: 'ERROR', error: action.payload, loading: false,
      };
    case types.INITIALIZE_QAC:
      return INITIAL_STATE;
    case types.RESET_QAC_STATUS:
      return { ...state, status: '' };
    default:
      return state;
  }
};
