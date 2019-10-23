import _ from 'lodash';
import * as types from '../../actions/types';
import api from '../../api/network.config';

let dataArray = [];
let yearsArray = [];
let highTariffData = [];
let lowTariffData = [];
let years = [];
let yearPickerData = [];
let xCoordinates = [];
let months = [];
let dates = [];
let selectedYear = 0;

export const setLoading = () => ({
  type: types.SET_LOADING_TRUE,
});

export const initializeConsumptionReview = () => {
  dataArray = [];
  yearsArray = [];
  highTariffData = [];
  lowTariffData = [];
  years = [];
  yearPickerData = [];
  xCoordinates = [];
  months = [];
  dates = [];
  selectedYear = 0;
  return {
    type: types.FETCH_CONSUMPTION_SUCCESS,
    payload: {
      highTariffData, lowTariffData, years, xCoordinates, yearPickerData, dates,
    },
  };
};

const resetData = () => {
  for (let i = 0; i < highTariffData.length; i += 1) {
    highTariffData[i] = 0;
    lowTariffData[i] = 0;
    xCoordinates[i] = i + 1;
  }
  years = [];
  yearPickerData = [];
};

const sortArrays = () => {
  for (let i = 0; i < xCoordinates.length - 1; i += 1) {
    let min = xCoordinates[i];
    let minIndex = i;
    for (let j = i + 1; j < xCoordinates.length; j += 1) {
      if (xCoordinates[j] < min) {
        min = xCoordinates[j];
        minIndex = j;
      }
    }
    let tmp = xCoordinates[i];
    xCoordinates[i] = min;
    xCoordinates[minIndex] = tmp;

    tmp = highTariffData[i];
    highTariffData[i] = highTariffData[minIndex];
    highTariffData[minIndex] = tmp;

    tmp = lowTariffData[i];
    lowTariffData[i] = lowTariffData[minIndex];
    lowTariffData[minIndex] = tmp;

    tmp = months[i];
    months[i] = months[minIndex];
    months[minIndex] = tmp;
  }
};

const getTariffData = () => {
  highTariffData = [];
  lowTariffData = [];
  xCoordinates = [];
  months = [];

  for (let i = 0; i < dataArray.length; i += 1) {
    if (dataArray[i].month !== undefined) {
      highTariffData.push(Number(dataArray[i].highTariff));
      lowTariffData.push(Number(dataArray[i].lowTariff));
      xCoordinates.push(dataArray[i].month + (dataArray[i].day / 30.5));
      months.push(dataArray[i].month);
    }
  }

  for (let i = 1; i <= 12; i += 1) {
    let exists = false;
    for (let j = 0; j < months.length; j += 1) {
      if (i === months[j]) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      highTariffData.push(0);
      lowTariffData.push(0);
      xCoordinates.push(i);
      months.push(i);
    }
  }

  sortArrays();
};

const getYearsData = () => {
  if (yearsArray.length === 0) {
    years.push(Number(new Date().getFullYear()));
  } else {
    for (let i = 0; i < yearsArray.length; i += 1) {
      if (i === 0 && Number(yearsArray[0].year) !== 2019) {
        years.push(2019);
      }
      years.push(Number(yearsArray[i].year));
    }

    if (years.length >= 3) {
      for (let i = 2; i < years.length; i += 1) {
        yearPickerData.push(years[i]);
      }
    }
  }
};

const findIndexOfData = (month) => {
  let result = -1;
  for (let i = 0; i < dataArray.length; i += 1) {
    if (dataArray[i].month === month) {
      result = i;
      break;
    }
  }
  return result;
};

const getDates = () => {
  dates = [];

  for (let i = 0; i < months.length; i += 1) {
    const index = findIndexOfData(months[i]);
    if (index !== -1) {
      const date = `${dataArray[index].day}.${months[i]}.${selectedYear}.`;
      dates.push(date);
      dataArray.splice(index, 1);
    } else {
      const date = `1.${months[i]}.${selectedYear}.`;
      dates.push(date);
    }
  }
};

const fetchConsumptionDataFailed = (dispatch) => {
  dispatch({ type: types.FETCH_CONSUMPTION_FAILED });
};

const fetchConsumptionDataSuccess = (dispatch, response) => {
  response.text().then((text) => {
    resetData();
    const obj = JSON.parse(text);
    dataArray = _.map(obj.consumptions, val => ({ ...val }));
    yearsArray = _.map(obj.years, val => ({ ...val }));
    getTariffData();
    getYearsData();
    getDates();
    dispatch({
      type: types.FETCH_CONSUMPTION_SUCCESS,
      payload: {
        highTariffData, lowTariffData, years, xCoordinates, yearPickerData, dates,
      },
    });
  });

  // console.log('success', response);
};

export const fetchConsumptionData = ({
  email, token, placeId, year,
}) => (dispatch) => {
  dispatch({
    type: types.CONSUMPTION_YEAR_CHANGED,
    payload: year,
  });

  selectedYear = year;

  fetch(`${api}/consumption/all_by_year?email=${email}&year=${year}&placeId=${placeId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
  }).then((response) => {
    if (response.ok) {
      fetchConsumptionDataSuccess(dispatch, response);
    } else {
      fetchConsumptionDataFailed(dispatch, response);
    }
  });
};
