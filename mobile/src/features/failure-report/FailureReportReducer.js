import * as types from '../../actions/types';

const INITIAL_STATE = {
  note: '',
  photo: null,
  anonymus: 0,
  status: '',
  loading: false,
  location: { lat: null, lon: null },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FR_PHOTO_CHANGED:
      return { ...state, photo: action.payload };
    case types.FR_NOTE_CHANGED:
      return { ...state, note: action.payload };
    case types.SLIDER_VALUE_CHANGED:
      return { ...state, anonymus: action.payload };
    case types.UPDATE_GPS_LOCATION:
      return { ...state, location: action.payload };
    case types.SEND_FAILURE_REPORT:
      return { ...state, status: '', loading: true };
    case types.SEND_FR_SUCCESS:
      return {
        ...state, ...INITIAL_STATE, status: 'OK', location: state.location,
      };
    case types.SET_LOADING_TRUE:
      return { ...state, loading: true };
    case types.SEND_FR_FAIL:
      return {
        ...state, status: 'ERROR', loading: false, location: state.location,
      };
    case types.RESET_FR_STATUS:
      return { ...state, status: '' };
    case types.INITIALIZE_FAILURE_REPORT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
