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

export const signupUsernameChanged = text => ({
  type: types.SIGNUP_USERNAME_CHANGED,
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
  username,
  password,
  email,
  confirmPass,
}) => (dispatch) => {
  dispatch({ type: types.REGISTER_USER });

  fetch(`${api}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      passwordRepeated: confirmPass,
    }),
  }).then((response) => {
    if (response.ok) {
      registerUserSuccess(dispatch, response);
    } else {
      registerUserFail(dispatch);
    }
  });
};
