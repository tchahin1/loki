import * as types from '../../actions/types';
import api from '../../api/network.config';

export const initializePlaceOfMeasurementModal = () => ({
  type: types.INITIALIZE_PLACE_MODAL,
});

export const placeNameChanged = text => ({
  type: types.PLACE_NAME_CHANGED,
  payload: text,
});

export const referenceChanged = text => ({
  type: types.REFERENCE_CHANGED,
  payload: text,
});

export const placeNumberChanged = text => ({
  type: types.PLACE_NUMBER_CHANGED,
  payload: text,
});

const savePlaceSuccess = (dispatch) => {
  dispatch({ type: types.SAVE_PLACE_SUCCESS });
};

const savePlaceFailed = (dispatch) => {
  dispatch({ type: types.SAVE_PLACE_FAILED });
};

export const savePlaceDetails = ({
  name, reference, number, token, email,
}) => (dispatch) => {
  dispatch({ type: 'nothing' });

  const num = Number(number);

  fetch(`${api}/place/save`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      privateKey: token,
    },
    body: JSON.stringify({
      name,
      reference,
      placeNumber: num,
      email,
    }),
  }).then((response) => {
    if (response.ok) {
      savePlaceSuccess(dispatch);
    } else {
      savePlaceFailed(dispatch);
    }
  });
};

const fetchPlacesSuccess = (dispatch, response) => {
  response.text().then((text) => {
    dispatch({ type: types.FETCH_PLACES_SUCCESS, payload: text });
  });
};

const fetchPlacesFailed = (dispatch) => {
  dispatch({ type: types.FETCH_PLACES_FAILED });
};

export const fetchMeasurementPlaces = ({ email, token }) => (dispatch) => {
  dispatch({ type: 'nothing' });

  fetch(`${api}/place/all?email=${email}`, {
    method: 'GET',
    headers: {
      privateKey: token,
    },
  }).then((response) => {
    if (response.ok) {
      fetchPlacesSuccess(dispatch, response);
    } else {
      fetchPlacesFailed(dispatch, response);
    }
  });
};
