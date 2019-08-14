import * as types from '../../actions/types';
import { onSignIn } from '../../../Auth';
import Inputs from '../../assets/enum/LoginInputsEnum';
import api from '../../api/network.config';
import { Keyboard } from 'react-native';

export const usernameChanged = (text) => {
    return{
        type: types.USERNAME_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return{
        type: types.PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ username, password }) => {
    return (dispatch) => {
        dispatch({ type: types.LOGIN_USER });

        fetch(`${api}/auth`, {
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
};

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