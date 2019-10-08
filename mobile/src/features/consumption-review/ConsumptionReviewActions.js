import _ from 'lodash';
import * as types from '../../actions/types';
import api from '../../api/network.config';

let dataArray = [];
let yearsArray = [];
let highTariffData = [];
let lowTariffData = [];
let years = [];
let xCoordinates = [];

export const setLoading = () => ({
  type: types.SET_LOADING_TRUE,
});

const getTariffData = () => {
  highTariffData = new Array(dataArray.length);
  lowTariffData = new Array(dataArray.length);
  xCoordinates = new Array(dataArray.length);

  for (let i = 0; i < dataArray.length; i += 1) {
    highTariffData[dataArray[i].month - 1] = Number(dataArray[i].highTariff);
    lowTariffData[dataArray[i].month - 1] = Number(dataArray[i].lowTariff);
    xCoordinates[dataArray[i].month - 1] = dataArray[i].month + (dataArray[i].day / 30);
  }
  for (let i = 0; i < highTariffData.length; i += 1) {
    if (highTariffData[i] === undefined) {
      highTariffData[i] = 0;
      lowTariffData[i] = 0;
      xCoordinates[i] = i + 1;
    }
  }
};

const getYearsData = () => {
  for (let i = 0; i < yearsArray.length; i += 1) {
    years.push(Number(yearsArray[i].year));
  }
};

const resetData = () => {
  for (let i = 0; i < highTariffData.length; i += 1) {
    highTariffData[i] = 0;
    lowTariffData[i] = 0;
  }
  years = [];
};

const fetchConsumptionDataFailed = (dispatch, response) => {
  dispatch({ type: types.FETCH_CONSUMPTION_FAILED });

  console.log('failed', response);
};

const fetchConsumptionDataSuccess = (dispatch, response) => {
  response.text().then((text) => {
    resetData();
    const obj = JSON.parse(text);
    dataArray = _.map(obj.consumptions, val => ({ ...val }));
    yearsArray = _.map(obj.years, val => ({ ...val }));
    getTariffData();
    getYearsData();
    dispatch({
      type: types.FETCH_CONSUMPTION_SUCCESS,
      payload: {
        highTariffData, lowTariffData, years, xCoordinates,
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
