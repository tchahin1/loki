import * as types from '../../actions/types';
import api from '../../api/network.config';


export const largeTariffChanged = text => ({
  type: types.LARGE_TARIFF_CHANGED,
  payload: text,
});

export const smallTariffChanged = text => ({
  type: types.SMALL_TARIFF_CHANGED,
  payload: text,
});

export const photoChanged = photo => ({
  type: types.PHOTO_CHANGED,
  payload: photo,
});

export const placeChanged = place => ({
  type: types.PLACE_CHANGED,
  payload: place,
});

export const noteChanged = note => ({
  type: types.NOTE_CHANGED,
  payload: note,
});

export const updateGPSLocation = ({ lat, lon }) => (dispatch) => {
  dispatch({
    type: types.UPDATE_GPS_LOCATION,
    payload: { lat, lon },
  });
};

export const setLoading = () => ({
  type: types.SET_LOADING_TRUE,
});

const saveMeasurementSuccess = (dispatch) => {
  dispatch({ type: types.SAVE_MEASUREMENT_SUCCESS });
};

const saveMeasurementFailed = (dispatch, response) => {
  response.text().then((text) => {
    dispatch({ type: types.SAVE_MEASUREMENT_FAILED, payload: text });
  });
};

const resetNotification = (dispatch) => {
  dispatch({ type: types.RESET_NOTIFICATION });
};

export const saveMeasurement = ({
  largeTariff, smallTariff, currentPhoto, note, currentPlace, email, token, location,
}) => (dispatch) => {
  dispatch({ type: types.SAVE_MEASUREMENT });

  let latitude = null;
  let longitude = null;
  if (location !== null) {
    const { lat, lon } = location;
    latitude = lat;
    longitude = lon;
  }

  fetch(`${api}/measurement/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({
      email,
      largeTariff,
      smallTariff,
      photo: currentPhoto.base64,
      note,
      measurementPlace: currentPlace,
      lat: latitude,
      lon: longitude,
    }),
  }).then((response) => {
    if (response.ok) {
      saveMeasurementSuccess(dispatch);
      resetNotification(dispatch);
    } else {
      saveMeasurementFailed(dispatch, response);
    }
  });
};

export const clearInfoText = () => ({
  type: types.CLEAR_INFO_TEXT,
});

export const initializeElectricMeter = () => ({
  type: types.INITIALIZE_ELECTRIC_METER,
});

export const clearNote = () => ({
  type: types.CLEAR_NOTE,
});
