import { Keyboard } from 'react-native';
import * as types from '../../actions/types';
import Inputs from '../../assets/enum/LoginInputsEnum';
import api from '../../api/network.config';

export const initializeRegistration = (successFlag) => {
  if (successFlag || successFlag === undefined) {
    return {
      type: types.SIGNUP_INITIALIZATION,
    };
  }
  return {
    type: 'nothing',
  };
};

export const signupNameChanged = text => ({
  type: types.SIGNUP_NAME_CHANGED,
  payload: text,
});

export const signupSurnameChanged = text => ({
  type: types.SIGNUP_SURNAME_CHANGED,
  payload: text,
});

export const signupEmailChanged = text => ({
  type: types.SIGNUP_EMAIL_CHANGED,
  payload: text,
});

export const signupConfirmPasswordChanged = text => ({
  type: types.SIGNUP_CONF_PASS_CHANGED,
  payload: text,
});

export const signupPasswordChanged = text => ({
  type: types.SIGNUP_PASSWORD_CHANGED,
  payload: text,
});

const registerUserSuccess = (dispatch) => {
  dispatch({ type: types.REGISTER_USER_SUCCESS });
};

const registerUserFail = (dispatch) => {
  const { ERRORS } = Inputs;

  dispatch({ type: types.REGISTER_USER_FAIL, payload: ERRORS.USER_EXISTS_ERR });

  Keyboard.dismiss();
};

export const registerUser = ({
  name,
  surname,
  password,
  email,
}) => (dispatch) => {
  dispatch({ type: types.REGISTER_USER });

  fetch(`${api}/register`, {
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
    }),
  }).then((response) => {
    if (response.ok) {
      registerUserSuccess(dispatch);
    } else {
      registerUserFail(dispatch);
    }
  });
};
