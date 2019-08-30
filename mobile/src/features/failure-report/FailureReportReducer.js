import * as types from '../../actions/types';

const INITIAL_STATE = {
  note: '',
  photo: null,
  anonymus: 0,
  status: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FR_PHOTO_CHANGED:
      return { ...state, photo: action.payload };
    case types.FR_NOTE_CHANGED:
      return { ...state, note: action.payload };
    case types.SLIDER_VALUE_CHANGED:
      return { ...state, anonymus: action.payload };
    case types.SEND_FAILURE_REPORT:
      return { ...state, status: '' };
    case types.SEND_FR_SUCCESS:
      return { ...state, ...INITIAL_STATE, status: 'OK' };
    case types.SEND_FR_FAIL:
      return { ...state, status: 'ERROR' };
    case types.INITIALIZE_FAILURE_REPORT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
