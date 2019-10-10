import * as types from '../../actions/types';

const INITIAL_STATE = {
  LTData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  HTData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  years: [],
  selectedYear: 0,
  xCoordinatesData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  yearPickerData: [],
  dates: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONSUMPTION_YEAR_CHANGED:
      return { ...state, selectedYear: Number(action.payload) };
    case types.FETCH_CONSUMPTION_SUCCESS:
      return {
        ...state,
        LTData: action.payload.lowTariffData,
        HTData: action.payload.highTariffData,
        years: action.payload.years,
        xCoordinatesData: action.payload.xCoordinates,
        yearPickerData: action.payload.yearPickerData,
        dates: action.payload.dates,
      };
    case types.FETCH_CONSUMPTION_FAILED:
      return { ...state };
    default:
      return state;
  }
};
