import { Keyboard } from 'react-native';
import * as types from '../../actions/types';
import api from '../../api/network.config';

export const initializeMyProfile = () => (dispatch) => {
  dispatch({ type: types.PROFILE_INITIALIZATION });
};

export const profileNameChanged = text => ({
  type: types.PROFILE_NAME_CHANGED,
  payload: text,
});

export const profileSurnameChanged = text => ({
  type: types.PROFILE_SURNAME_CHANGED,
  payload: text,
});

export const profileEmailChanged = text => ({
  type: types.PROFILE_EMAIL_CHANGED,
  payload: text,
});

export const profileConfirmPasswordChanged = text => ({
  type: types.PROFILE_CONF_PASS_CHANGED,
  payload: text,
});

export const profilePasswordChanged = text => ({
  type: types.PROFILE_PASSWORD_CHANGED,
  payload: text,
});

const editUserSuccess = (dispatch) => {
  dispatch({ type: types.EDIT_USER_SUCCESS });
};

const editUserFail = (dispatch) => {
  dispatch({ type: types.EDIT_USER_FAIL });

  Keyboard.dismiss();
};

export const editUser = ({
  name,
  surname,
  password,
  email,
  confirmPass,
  id,
}) => (dispatch) => {
  dispatch({ type: types.EDIT_USER });

  fetch(`${api}/user/edit`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      surname,
      email,
      password,
      confirmPass,
      id,
    }),
  }).then((response) => {
    if (response.ok) {
      editUserSuccess(dispatch, response);
    } else {
      editUserFail(dispatch);
    }
  });
};

const fetchUserSuccess = (dispatch, response) => {
  response.text().then((text) => {
    const res = JSON.parse(text);
    dispatch({ type: types.PROFILE_EMAIL_CHANGED, payload: res.email });
    // dispatch({ type: types.PROFILE_NAME_CHANGED, payload: res.email });
    // dispatch({ type: types.PROFILE_SURNAME_CHANGED, payload: res.email });
    dispatch({ type: types.PROFILE_PASSWORD_CHANGED, payload: res.password });
    dispatch({ type: types.PROFILE_CONF_PASS_CHANGED, payload: res.password });
    dispatch({ type: types.PROFILE_ID_CHANGED, payload: res.id });
  });
};

const fetchUserFailed = (dispatch) => {
  dispatch({ type: 'nothing' });
};

export const fetchUserData = ({ email, token }) => (dispatch) => {
  dispatch({ type: 'nothing' });

  fetch(`${api}/user/data/?email=${email}`, {
    method: 'GET',
    headers: {
      privateKey: token,
    },
  }).then((response) => {
    if (response.ok) {
      fetchUserSuccess(dispatch, response);
    } else {
      fetchUserFailed(dispatch);
    }
  });
};
