import * as types from '../../actions/types';

const INITIAL_STATE = {
  LTData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  HTData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  years: [],
  selectedYear: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONSUMPTION_YEAR_CHANGED:
      return { ...state, selectedYear: action.payload };
    case types.FETCH_CONSUMPTION_SUCCESS:
      return {
        ...state,
        LTData: action.payload.lowTariffData,
        HTData: action.payload.highTariffData,
        years: action.payload.years,
      };
    case types.FETCH_CONSUMPTION_FAILED:
      return { ...state };
    default:
      return state;
  }
};
