import * as types from '../../actions/types';

const INITIAL_STATE = {
  placeName: '',
  reference: '',
  placeNumber: '',
  status: '',
  serverError: '',
  places: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PLACE_NAME_CHANGED:
      return { ...state, placeName: action.payload };
    case types.REFERENCE_CHANGED:
      return { ...state, reference: action.payload };
    case types.PLACE_NUMBER_CHANGED:
      return { ...state, placeNumber: action.payload };
    case types.SAVE_PLACE_SUCCESS:
      return {
        ...state, placeName: '', reference: '', placeNumber: '', status: 'OK',
      };
    case types.SAVE_PLACE_FAILED:
      return { ...state, serverError: 'Internal Server Error!' };
    case types.FETCH_PLACES_SUCCESS:
      return { ...state, places: JSON.parse(action.payload) };
    case types.FETCH_PLACES_FAILED:
      return { ...state };
    case types.INITIALIZE_PLACE_MODAL:
      return {
        ...state, placeName: '', reference: '', placeNumber: '', status: '',
      };
    default:
      return state;
  }
};
