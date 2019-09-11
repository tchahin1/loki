import * as types from '../../actions/types';
import api from '../../api/network.config';

export const initializeFailureReport = () => ({
  type: types.INITIALIZE_FAILURE_REPORT,
});

export const resetStatus = () => ({
  type: types.RESET_FR_STATUS,
});

export const photoChanged = photo => ({
  type: types.FR_PHOTO_CHANGED,
  payload: photo,
});

export const noteChanged = note => ({
  type: types.FR_NOTE_CHANGED,
  payload: note,
});

export const sliderValueChanged = value => ({
  type: types.SLIDER_VALUE_CHANGED,
  payload: value,
});

export const updateGPSLocation = ({ lat, lon }) => (dispatch) => {
  dispatch({
    type: types.UPDATE_GPS_LOCATION,
    payload: { lat, lon },
  });
};

const sendFailureReportSuccess = (dispatch) => {
  dispatch({ type: types.SEND_FR_SUCCESS });
};

const sendFailureReportFail = (dispatch) => {
  dispatch({ type: types.SEND_FR_FAIL });
};

export const sendFailureReport = ({
  currentPhoto, failure, token, username, location,
}) => (dispatch) => {
  dispatch({ type: types.SEND_FAILURE_REPORT });

  let base64image = null;
  if (currentPhoto !== null) {
    base64image = currentPhoto.base64;
  }

  let latitude = null;
  let longitude = null;
  if (location !== null) {
    const { lat, lon } = location;
    latitude = lat;
    longitude = lon;
  }

  fetch(`${api}/failure/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      privateKey: token,
    },
    body: JSON.stringify({
      username,
      photo: base64image,
      description: failure,
      lat: latitude,
      lon: longitude,
    }),
  }).then((response) => {
    if (response.ok) {
      sendFailureReportSuccess(dispatch);
    } else {
      sendFailureReportFail(dispatch);
    }
  });
};
