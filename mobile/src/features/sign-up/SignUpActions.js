import * as types from '../../actions/types';
import Inputs from '../../assets/enum/LoginInputsEnum';
import api from '../../api/network.config';
import { Keyboard } from 'react-native';

export const initializeRegistration = (successFlag) => {
    if(successFlag || successFlag === undefined) {
      return{
          type: types.SIGNUP_INITIALIZATION
      };
    }
    else return{
        type: 'nothing'
    };
};

export const signupUsernameChanged = (text) => {
    return{
        type: types.SIGNUP_USERNAME_CHANGED,
        payload: text
    };
};

export const signupEmailChanged = (text) => {
    return{
        type: types.SIGNUP_EMAIL_CHANGED,
        payload: text
    };
};

export const signupConfirmPasswordChanged = (text) => {
    return{
        type: types.SIGNUP_CONF_PASS_CHANGED,
        payload: text
    };
};

export const signupPasswordChanged = (text) => {
    return{
        type: types.SIGNUP_PASSWORD_CHANGED,
        payload: text
    };
};

export const registerUser = ({ username, password, email, confirmPass }) => {
    return (dispatch) => {
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
};

const registerUserSuccess = (dispatch, response) => {
    dispatch({ type: types.REGISTER_USER_SUCCESS});
};

const registerUserFail = (dispatch) => {
    const { ERRORS } = Inputs;

    dispatch({ type: types.REGISTER_USER_FAIL, payload: ERRORS.USER_EXISTS_ERR });

    Keyboard.dismiss();
};