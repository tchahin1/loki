/* eslint-disable import/prefer-default-export */
import * as types from '../../actions/types';

export const logoutUser = () => (dispatch) => {
  dispatch({ type: types.SIGN_OUT_USER });
};
