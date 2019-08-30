import * as types from '../../actions/types';
import api from '../../api/network.config';

export const initializeFailureReport = () => ({
  type: types.INITIALIZE_FAILURE_REPORT,
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

const sendFailureReportSuccess = (dispatch) => {
  dispatch({ type: types.SEND_FR_SUCCESS });
};

const sendFailureReportFail = (dispatch) => {
  dispatch({ type: types.SEND_FR_FAIL });
};

export const sendFailureReport = ({
  currentPhoto, failure, token, username,
}) => (dispatch) => {
  dispatch({ type: types.SEND_FAILURE_REPORT });

  fetch(`${api}/failure/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      privateKey: token,
    },
    body: JSON.stringify({
      username,
      photo: currentPhoto.base64,
      description: failure,
    }),
  }).then((response) => {
    if (response.ok) {
      sendFailureReportSuccess(dispatch);
    } else {
      sendFailureReportFail(dispatch);
    }
  });
};
