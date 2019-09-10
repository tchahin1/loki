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
  largeTariff, smallTariff, currentPhoto, note, currentPlace, username, token,
}) => (dispatch) => {
  dispatch({ type: types.SAVE_MEASUREMENT });

  fetch(`${api}/measurement/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      privateKey: token,
    },
    body: JSON.stringify({
      username,
      largeTariff,
      smallTariff,
      photo: currentPhoto.base64,
      note,
      measurementPlace: currentPlace,
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
