import * as types from '../../actions/types';

const INITIAL_STATE = {
  largeTariff: '',
  smallTariff: '',
  photo: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LARGE_TARIFF_CHANGED:
      return { ...state, largeTariff: action.payload };
    case types.SMALL_TARIFF_CHANGED:
      return { ...state, smallTariff: action.payload };
    case types.PHOTO_CHANGED:
      return { ...state, photo: action.payload };
    default:
      return state;
  }
};
