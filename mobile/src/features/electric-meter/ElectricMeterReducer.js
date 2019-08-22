import * as types from '../../actions/types';

const INITIAL_STATE = {
  largeTariff: '',
  smallTariff: '',
  photo: null,
  selectedPlace: '',
  note: '',
  infoText: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LARGE_TARIFF_CHANGED:
      return { ...state, largeTariff: action.payload };
    case types.SMALL_TARIFF_CHANGED:
      return { ...state, smallTariff: action.payload };
    case types.PHOTO_CHANGED:
      return { ...state, photo: action.payload };
    case types.NOTE_CHANGED:
      return { ...state, note: action.payload };
    case types.PLACE_CHANGED:
      console.log(action.payload);
      return { ...state, selectedPlace: action.payload };
    case types.SAVE_MEASUREMENT_SUCCESS:
      return { ...state, ...INITIAL_STATE, infoText: 'Brojilo uspješno očitano!' };
    case types.SAVE_MEASUREMENT_FAILED:
      return { ...state, infoText: action.payload };
    case types.CLEAR_INFO_TEXT:
      return { ...state, infoText: '' };
    case types.INITIALIZE_ELECTRIC_METER:
      return INITIAL_STATE;
    default:
      return state;
  }
};
