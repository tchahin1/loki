import { Keyboard } from 'react-native';
import * as types from '../../actions/types';
import { onSignIn } from '../../../Auth';
import Inputs from '../../assets/enum/LoginInputsEnum';
import api from '../../api/network.config';

export const initializeLogin = () => ({
  type: types.INITIALIZE_LOGIN,
});

export const usernameChanged = text => ({
  type: types.USERNAME_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: types.PASSWORD_CHANGED,
  payload: text,
});

const loginUserSuccess = (dispatch, response) => {
  response.text().then((text) => {
    onSignIn(text).then(() => {
      dispatch({ type: types.LOGIN_USER_SUCCESS, payload: text });
    });
  });
};

const loginUserFail = (dispatch) => {
  const { ERRORS } = Inputs;

  dispatch({ type: types.LOGIN_USER_FAIL, payload: ERRORS.LOGIN_ERR });

  Keyboard.dismiss();
};

export const loginUser = ({ username, password }) => (dispatch) => {
  dispatch({ type: types.LOGIN_USER });

  fetch(`${api}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => {
    if (response.ok) {
      loginUserSuccess(dispatch, response);
    } else {
      loginUserFail(dispatch);
    }
  });
};
