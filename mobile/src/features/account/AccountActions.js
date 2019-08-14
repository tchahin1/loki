import * as types from '../../actions/types';

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: types.SIGN_OUT_USER });
    };
};